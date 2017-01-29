var robot = require('robotjs');
var q = require('q');
var prettyMs = require('pretty-ms');

var util = require('./util');
var log = require('./log');

var start = function(optConfig) {
    var deferred = q.defer();
    
    var initDeferred = q.defer();
    if(!optConfig) {
        _init().then(function(commandLineConfig) {
            initDeferred.resolve(commandLineConfig);
        });
    } else {
        initDeferred.resolve(optConfig);
    }
    
    initDeferred.promise.then(function(config) {
        log.write('Got it. Starting in ');
        util.startCountdown(3000, function() {
            log.writeLine('');
            _start(config).then(function() {
                log.writeLine('Finished! \\o/');
                deferred.resolve();
            });
        });
    });
    
    return deferred.promise;
};

var _init = function() {
    var config = {};
    
    var initDeferred = q.defer();
    getMousePosition('1. Provide the coordinates of the "Synthesize" button in the craft window').then(function(initiateCraftPos) {
        config.initiateCraft = initiateCraftPos;
        log.writeLine('');
        util.promptForNumber('2. How many macroes required?').then(function(numMacroes) {
            var getMacroesDeferred = q.defer();
            var currMacro = 0;
            config.macroes = [];
            
            var getNextMacroInfo = function() {
                currMacro++;
                if(currMacro <= numMacroes) {
                    util.promptForString('2.' + currMacro + 'a Enter macro hotkey:').then(function(hotkey) {
                        util.promptForNumber('2.' + currMacro + 'b Enter macro duration in seconds:').then(function(duration) {
                            config.macroes.push({ key: hotkey, duration: duration * 1000 });
                            getNextMacroInfo();
                        });
                    });
                } else {
                    getMacroesDeferred.resolve();
                }
            };
            
            getNextMacroInfo();
            getMacroesDeferred.promise.then(function() {
                log.writeLine('');
                util.promptForBoolean('3. Is this a collectable synth?').then(function(isCollectable) {
                    var getCollectableDeferred = q.defer();
                    config.isCollectable = isCollectable;
                    if(isCollectable) {
                        getMousePosition('3.5 Provide the coordinates of the "Yes" button in the finish collectable window').then(function(confirmCollectablePos) {
                            config.confirmCollectable = confirmCollectablePos;
                            getCollectableDeferred.resolve();
                        });
                    } else {
                        getCollectableDeferred.resolve();
                    }
                    
                    getCollectableDeferred.promise.then(function() {
                        log.writeLine('');
                        util.promptForNumber('4. Enter the total craft time desired in minutes (0 for infin.):').then(function(totalDuration) {
                            config.totalDuration = totalDuration * 1000 * 60;
                            log.writeLine('');
                            util.promptForNumber('5. Enter the total synths desired (0 for infin.):').then(function(totalSynths) {
                                config.totalSynths = totalSynths;
                                log.writeLine('');
                                initDeferred.resolve(config);
                            });
                        });
                    });
                });
            });
        });
    });
    
    return initDeferred.promise;
};

var _start = function(config) {
    robot.setMouseDelay(250);
    
    var totalTimeElapsed = 0;
    var totalSynthsMade = 0;
    var deferred = q.defer();
    var nextSynth = function() {
        var timeAvailable = config.totalDuration == 0 || totalTimeElapsed < config.totalDuration;
        var synthAvailable = config.totalSynths == 0 || totalSynthsMade < config.totalSynths;
        
        if(timeAvailable && synthAvailable) {
            log.writeLine(' --> Starting synth #' + (totalSynthsMade + 1) + ' [Elapsed Time: ' + prettyMs(totalTimeElapsed) + ']');
            initiateCraft(config).then(function() {
                performCraft(config).then(function() {
                    var verifyCollectableDeferred = q.defer();
                    if(config.isCollectable) {
                        confirmCollectable(config).then(function() {
                            verifyCollectableDeferred.resolve();
                        });
                    } else {
                        verifyCollectableDeferred.resolve();
                    }
                    
                    verifyCollectableDeferred.promise.then(function() {
                        totalSynthsMade++;
                        nextSynth();
                    });
                });
            });
        } else {
            deferred.resolve();
        }
    };
    
    // set a periodic timer
    var pollInterval = 1000;
    setInterval(function() {
        totalTimeElapsed += pollInterval;
    }, pollInterval);
    
    nextSynth();
    return deferred.promise;
};

var initiateCraft = function(config) {
    var deferred = q.defer();
    
    robot.moveMouse(config.initiateCraft.x, config.initiateCraft.y);
    robot.mouseClick('left', true);
    
    setTimeout(function() {
        deferred.resolve();
    }, 1250);
    
    return deferred.promise;
};

var performCraft = function(config) {
    var deferred = q.defer();
    var macroes = JSON.parse(JSON.stringify(config.macroes));
    
    var performNextMacro = function() {
        if(macroes.length > 0) {
            var currMacro = macroes.shift();
            robot.typeString(currMacro.key);
            setTimeout(function() {
                performNextMacro();
            }, currMacro.duration);
        } else {
            setTimeout(function() {
                deferred.resolve();
            }, config.isCollectable ? 1000 : 1500);
        }
    };
    performNextMacro();
    
    return deferred.promise;
};

var confirmCollectable = function(config) {
    var deferred = q.defer();
    robot.moveMouse(config.confirmCollectable.x, config.confirmCollectable.y);
    robot.mouseClick('left', true);
    
    setTimeout(function() {
        deferred.resolve();
    }, 2000);
    
    return deferred.promise;
};

var getMousePosition = function(intentDescription) {
    var deferred = q.defer();
    
    log.writeLine(intentDescription);
    var attempt = function() {
        _getMousePosition().then(function(tentativePosition) {
            util.promptForBoolean('Is (' + tentativePosition.x + ',' + tentativePosition.y + ') correct?').then(function(isCorrectPosition) {
                if(isCorrectPosition) {
                    deferred.resolve(tentativePosition);
                } else {
                    attempt();
                }
            });
        });
    };
    attempt();
    
    return deferred.promise;
};

var _getMousePosition = function() {
    var deferred = q.defer();
    
    log.write('Getting mouse position in: ');
    util.startCountdown(3000, function() {
        var mousePos = robot.getMousePos();
        deferred.resolve(mousePos);
    });
    
    return deferred.promise;
}

var _moveMouseTo = function(position) {
    robot.moveMouseSmooth(position.x, position.y);
};

// expose public methods
exports.start = start;
