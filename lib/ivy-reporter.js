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
          , index = stack.search(/^.*?Error: /m)
          , message = stack.slice(index, stack.indexOf("\n", index))

        console.log('ERROR: %s', message);

        if (index > 0) {
          var snippetIndex = stack.indexOf("\n") + 1 // skip file reference
            , snippet = stack.slice(snippetIndex, stack.indexOf(message) - 1)

          if (snippet.trim()) {
            console.log(snippet.trimRight().replace(/^/gm, 'SNIPPET: '));
          }
        }
      });
    }
  });
}
