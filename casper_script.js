var casper = require('casper').create();

casper.start('https://www.google.co.uk', function() {
    casper.echo(casper.getTitle())
});

casper.run()