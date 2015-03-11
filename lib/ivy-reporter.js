module.exports = IvyReporter;

function IvyReporter(runner) {
  var errors = [];

  runner.on('fail', function(test, error) {
    errors.push(error);
  });

  runner.on('end', function(){
    if (!errors.length) {
      console.log('OK');
    } else {
      errors.forEach(function (error) {
        var message = error.message || ''
          , stack = error.stack || message
          , index = stack.indexOf(message) + message.length
          , message = stack.slice(0, index);

        console.log('ERROR: %s', message);
      });
    }
  });
}
