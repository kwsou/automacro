var log = require('./log');
var q = require('q');
var prompt = require('prompt');

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
    var deferred = q.defer();
    
    var schema = {
        properties: {
            'enter in a string': {
                type: 'string',
                required: true
            }
        }
    }
    _prompt(schema, promptQuestion, ' ', _forwardValue).then(function(convertedVal) {
        deferred.resolve(convertedVal);
    });
    
    return deferred.promise;
};

var promptForNumber = function(promptQuestion) {
    var deferred = q.defer();
    
    var schema = {
        properties: {
            'enter in a number': {
                type: 'number',
                required: true
            }
        }
    }
    _prompt(schema, promptQuestion, ' ', Number).then(function(convertedVal) {
        deferred.resolve(convertedVal);
    });
    
    return deferred.promise;
};

var promptForBoolean = function(promptQuestion) {
    var deferred = q.defer();
    
    var schema = {
        properties: {
            'enter in true or false': {
                type: 'boolean',
                required: true
            }
        }
    }
    _prompt(schema, promptQuestion, ' ', _forwardValue).then(function(convertedVal) {
        deferred.resolve(convertedVal);
    });
    
    return deferred.promise;
};

var _forwardValue = function(val) {
    return val;
};

var _prompt = function(schema, message, delimiter, convertFn) {
    var deferred = q.defer();
    
    prompt.start();
    prompt.message = message;
    prompt.delimiter = delimiter;
    prompt.get(schema, function(err, result) {
        deferred.resolve(convertFn(result[Object.keys(result)[0]]));
    })
    
    return deferred.promise;
};

// expose public methods
exports.startCountdown = startCountdown;
exports.promptForString = promptForString;
exports.promptForNumber = promptForNumber;
exports.promptForBoolean = promptForBoolean;
