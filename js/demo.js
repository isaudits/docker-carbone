const fs = require('fs');
const carbone = require('carbone');

// Data to inject
var data = {
  firstname : 'John',
  lastname : 'Doe'
};

// Generate a report using the sample template provided by carbone module
// This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
// Of course, you can create your own templates!
carbone.render('./node_modules/carbone/examples/simple.odt', data, function(err, result){
  if (err) {
    return console.log(err);
  }
  // write the result
  fs.writeFileSync('result.odt', result);
});