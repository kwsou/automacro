var robot = require('robotjs');
var promise = require('bluebird');
var prettyMs = require('pretty-ms');

var util = require('./util');
var log = require('./log');

var craftJob = function() {
    var getName = function() {
        return 'craft';
    }
    
    var init = function() {
        return new promise(function(resolve) {
            var config = {};

            util.getMousePosition('1. Provide the coordinates of the "Synthesize" button in the craft window').then(function(initiateCraftPos) {
                config.initiateCraft = initiateCraftPos;
                log.writeEmptyLine();
                util.promptForNumber('2. How many macroes required?').then(function(numMacroes) {
                    var getMacroesPromise = new promise(function(resolve) {
                        config.macroes = [];

                        var getNextMacroInfo = function(currMacro) {
                          currMacro++;
                          if(currMacro <= numMacroes) {
                              util.promptForString('2.' + currMacro + 'a Enter macro hotkey:').then(function(hotkey) {
                                  util.promptForNumber('2.' + currMacro + 'b Enter macro duration in seconds:').then(function(duration) {
                                      config.macroes.push({ key: hotkey, duration: duration * 1000 });
                                      getNextMacroInfo(currMacro);
                                  });
                              });
                          } else {
                              resolve();
                          }
                        };

                        getNextMacroInfo(0);
                    });
                  
                    getMacroesPromise.then(function() {
                        log.writeEmptyLine();
                        util.promptForBoolean('3. Is this a collectable synth?').then(function(isCollectable) {
                            var getCollectablePromise = new promise(function(resolve) {
                                config.isCollectable = isCollectable;
                                if(isCollectable) {
                                    util.getMousePosition('3.5 Provide the coordinates of the "Yes" button in the finish collectable window').then(function(confirmCollectablePos) {
                                        config.confirmCollectable = confirmCollectablePos;
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            });

                            getCollectablePromise.then(function() {
                                log.writeEmptyLine();
                                util.promptForNumber('4. Enter the total craft time desired in minutes (0 for infin.):').then(function(totalDuration) {
                                    config.totalDuration = totalDuration * 1000 * 60;
                                    log.writeEmptyLine();
                                    util.promptForNumber('5. Enter the total synths desired (0 for infin.):').then(function(totalSynths) {
                                        config.totalSynths = totalSynths;
                                        log.writeEmptyLine();
                                        resolve(config);
                                    }); // 5.
                                }); // 4.
                            }); // getCollectablePromise
                        }); // 3.
                    }); // getMacroesPromise
                }); // 2.
            }); // 1.
        });
    };
    
    var start = function(config) {
        return new promise(function(resolve) {
            var totalTimeElapsed = 0;
            var totalSynthsMade = 0;
            var nextSynth = function() {
                var timeAvailable = config.totalDuration == 0 || totalTimeElapsed < config.totalDuration;
                var synthAvailable = config.totalSynths == 0 || totalSynthsMade < config.totalSynths;

                if(timeAvailable && synthAvailable) {
                    log.writeLine(' --> Starting synth #' + (totalSynthsMade + 1) + ' [Elapsed Time: ' + prettyMs(totalTimeElapsed) + ']');
                    initiateCraft(config).then(function() {
                        performCraft(config).then(function() {
                            var verifyCollectablePromise = new promise(function(resolve) {
                                if(config.isCollectable) {
                                    confirmCollectable(config).then(function() {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            });

                            verifyCollectablePromise.then(function() {
                                totalSynthsMade++;
                                nextSynth();
                            });
                        });
                    });
                } else {
                    resolve();
                }
            };

            // set a periodic timer
            var pollInterval = 1000;
            setInterval(function() {
              totalTimeElapsed += pollInterval;
            }, pollInterval);

            nextSynth();
        });
    };
  
    var initiateCraft = function(config) {
        return new promise(function(resolve) {
          util.swapFocusedWindow(function() {
              return new promise(function(resolve) {
                  // get previous mouse position so that we can move cursor back after
                  var prevMousePosition = robot.getMousePos();
                  robot.setMouseDelay(250);
                  robot.moveMouse(config.initiateCraft.x, config.initiateCraft.y);
                  robot.mouseClick('left', true);
                  robot.setMouseDelay(10);
                  robot.moveMouse(prevMousePosition.x, prevMousePosition.y);
                  resolve();
              });
          }).then(function() {
              setTimeout(function() {
                  resolve();
              }, 1500);
          });
        });
    };
  
    var performCraft = function(config) {
        return new promise(function(resolve) {
            // deep copy
            var macroes = JSON.parse(JSON.stringify(config.macroes));

            var performNextMacro = function() {
              if(macroes.length > 0) {
                  var currMacro = macroes.shift();
                  util.swapFocusedWindow(function() {
                      return new promise(function(resolve) {
                          
                          robot.typeString(currMacro.key);
                          resolve();
                      });
                  }).then(function() {
                      setTimeout(function() {
                          performNextMacro();
                      }, currMacro.duration);
                  });
              } else {
                  setTimeout(function() {
                      resolve();
                  }, config.isCollectable ? 1500 : 3000);
              }
            };
            performNextMacro();
        });
    };
  
    var confirmCollectable = function(config) {
        return new promise(function(resolve) {
            util.swapFocusedWindow(function() {
                return new promise(function(resolve) {
                    robot.moveMouse(config.confirmCollectable.x, config.confirmCollectable.y);
                    robot.mouseClick('left', true);
                    resolve();
                });
            }).then(function() {
                setTimeout(function() {
                    resolve();
                }, 3000);
            });
        });
    };
    
    return {
        getName: getName,
        init: init,
        start: start
    };
    
}();

module.exports = craftJob;
