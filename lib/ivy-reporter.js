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
        console.log('ERROR: %s', error.message);
      });
    }
  });
}
