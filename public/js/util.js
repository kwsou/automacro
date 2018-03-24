var log = require('./log');
var robot = require('robotjs');
var promise = require('bluebird');
var prompt = require('prompt');
var winctl = require('winctl');

var swapFocusedWindow = function(onSwapCallback, onSwapCallbackArgs) {
    return new promise(function(resolve) {
        var prevActiveProcess = winctl.GetActiveWindow().getPid();
        var filterPrevActiveProcess = function(win) { return win.getPid() == prevActiveProcess; };
        var filterFFXIVProcess = function(win) { return win.getClassName() == 'FFXIVGAME'; };
        
        // switch to the ffxiv game before doing any actions, then swap back
        // to the previously focused process
        winctl.FindWindows(filterFFXIVProcess).then(function(ffxivWindows) {
            if(ffxivWindows.length > 0) {
                ffxivWindows[0].setForegroundWindow();
            }
            onSwapCallback(onSwapCallbackArgs).then(function(payload) {
                winctl.FindWindows(filterPrevActiveProcess).then(function(prevActiveWindows) {
                    if(prevActiveWindows.length > 0) {
                        prevActiveWindows[0].setForegroundWindow();
                    }
                    resolve(payload);
                });
            });
        });
    });
};

var getMousePosition = function(intentDescription) {
    return new promise(function(resolve) {
        log.writeLine(intentDescription);
        var attempt = function() {
            _getMousePosition().then(function(tentativePosition) {
                promptForBoolean('Is (' + tentativePosition.x + ',' + tentativePosition.y + ') correct?').then(function(isCorrectPosition) {
                    if(isCorrectPosition) {
                        resolve(tentativePosition);
                    } else {
                        attempt();
                    }
                });
            });
        };
        attempt();
    });
};

var _getMousePosition = function() {
    return new promise(function(resolve) {
        log.write('Getting mouse position in: ');
        startCountdown(3000, function() {
            var mousePos = robot.getMousePos();
            resolve(mousePos);
        });
    });
}

var startCountdown = function(duration, callback, callbackArgs) {
    _cd(duration, 1000, callback, callbackArgs);
};

var _cd = function(duration, interval, callback, callbackArgs) {
    if(duration <= 0) {
        callback(callbackArgs);
    } else {
        log.write(duration/1000 + '.. ');
        setTimeout(function() {
            var remainingDuration = duration - interval;
            _cd(remainingDuration, remainingDuration < interval ? remainingDuration : interval, callback, callbackArgs);
        }, interval);
    }
};

var promptForString = function(promptQuestion) {
    return _prompt({
        properties: {
            'enter in a string': {
                type: 'string',
                required: true
            }
        }
    }, promptQuestion, ' ', _forwardValue);
};

var promptForNumber = function(promptQuestion) {
    return _prompt({
        properties: {
            'enter in a number': {
                type: 'number',
                required: true
            }
        }
    }, promptQuestion, ' ', Number);
};

var promptForBoolean = function(promptQuestion) {
    return _prompt({
        properties: {
            'enter in true or false': {
                type: 'boolean',
                required: true
            }
        }
    }, promptQuestion, ' ', _forwardValue);
};

var _forwardValue = function(val) {
    return val;
};

var _prompt = function(schema, message, delimiter, convertFn) {
    return new promise(function(resolve) {
        prompt.start();
        prompt.message = message;
        prompt.delimiter = delimiter;
        prompt.get(schema, function(err, result) {
            resolve(convertFn(result[Object.keys(result)[0]]));
        })
    });
};

// expose public methods
exports.swapFocusedWindow = swapFocusedWindow;
exports.getMousePosition = getMousePosition;
exports.startCountdown = startCountdown;
exports.promptForString = promptForString;
exports.promptForNumber = promptForNumber;
exports.promptForBoolean = promptForBoolean;
