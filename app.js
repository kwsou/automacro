var ar = require('./public/js/autoRecorder');
var log = require('./public/js/log');
var argv = require('minimist')(process.argv.slice(2));
var player = require('play-sound')(opts = {});
var notifier = require('node-notifier');

var config;
if(argv.config) {
    config = require(argv.config);
}

ar.start(config).then(function() {
    notifier.notify({
      'title': 'Automacro',
      'message': 'Just finished all crafts'
    });
    
    player.play('./public/media/tuturu.mp3', function(err) {
        notifier.notify({
            'title': 'Automacro',
            'message': 'Just finished all crafts'
        }, function(err, resp) { 
            log.writeLine('Ending process.');
            process.exit();
        });
    });
});
