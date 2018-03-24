var robot = require('robotjs');
var promise = require('bluebird');
var prettyMs = require('pretty-ms');

var util = require('./util');
var log = require('./log');

var start = function(optConfig) {
    
    return new promise(function(resolve) {
        log.writeLine('     === Available modes ===');
        log.writeLine('     |    1. craft (c)      |');
        log.writeLine('     |    2. desynth (d)    |');
        log.writeLine('     |    3. massbuy (m)    |');
        log.writeLine('     =======================');
        log.writeEmptyLine();
        
        util.promptForString('Run in which mode?').then(function(mode) {
            var job;
            switch(mode) {
                case 'd':
                case 'desynth':
                    job = require('./desynth');
                    break;
                case 'm':
                case 'massbuy':
                    job = require('./massbuy');
                    break;
                case 'c':
                case 'craft':
                default:
                    job = require('./craft');
                    break;
            }
            log.writeLine('     -> running in ' + job.getName() + ' mode.');
            log.writeEmptyLine();
            
            var initPromise = new promise(function(resolve) {
                if(!optConfig) {
                    job.init().then(function(commandLineConfig) {
                        resolve(commandLineConfig);
                    });
                } else {
                    resolve(optConfig);
                }
            });
            
            initPromise.then(function(config) {
                log.write('Got it. Starting in ');
                util.startCountdown(3000, function() {
                    log.writeLine('');
                    job.start(config).then(function() {
                        log.writeLine('Finished! \\o/');
                        resolve();
                    });
                });
            });
            
        });
    });
};



// expose public methods
exports.start = start;
