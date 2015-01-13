/*   

1) install devs
before run this file, install dependencies with: 

npm install


2) run with
run this project with:

node spooky_server.js 

*/

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}



var _script = function(spooky){
	
}


var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }
        spooky.start('https://www.google.co.uk', function() {
		    this.emit('print_bash', this.getTitle())
		});
        
        spooky.run()
    });





spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});

spooky.on('print_bash', function (log) {
        console.log(log);
});

