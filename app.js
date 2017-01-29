var ar = require('./public/js/autoRecorder');
var log = require('./public/js/log');
var argv = require('minimist')(process.argv.slice(2));

var config;
if(argv.config) {
    config = require(argv.config);
}

ar.start(config).then(function() {
    log.writeLine('Ending process.');
    process.exit();
});
