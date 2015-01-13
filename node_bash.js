var exec = require('child_process').exec,
    child;

child = exec('casperjs casper_script.js',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});