var ar = require('./public/js/autoRecorder');
var log = require('./public/js/log');

ar.start().then(function() {
    log.writeLine('Ending process.');
    process.exit();
});

// ar.test();
