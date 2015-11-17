/*
  Boot the local scsynth server,
  holding it as a spawned child process.

  next step: osc message to the server
*/

// In your project you will import it like this:
// var sc = require('supercolliderjs');

// From within this example folder I will import it using a relative path:
var sc = require('../index.js');

sc.server.boot().then(function(s) {
  s.oscOnce(['/status.reply']).then(function(e) {
    console.log('osconce reply', e);
  });
  s.sendMsg('/notify', [1]);
  s.sendMsg('/status', []);
  s.sendMsg('/dumpOSC', []);
}, console.error).done();