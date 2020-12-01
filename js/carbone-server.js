const carbone = require('carbone');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

app.get('/', function(request, response) {
  
  var html = `
    <html>
        <body>
            <form method="post" action="http://localhost:3000">
                Template: <input type="text" name="template" value="./node_modules/carbone/examples/simple.odt"/><br>
                JSON: <input type="textarea" name="json" rows="5" cols="50" wrap="soft" value='{"firstname":"John","lastname":"Doe"}'/><br>
                <input type="submit" value="Submit" />
            </form>
        </body>
    </html>`
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(html)
})

app.post('/', function(request, response) {
  
  template = request.body.template
  filename = template.replace(/^.*[\\\/]/, '')
  data = JSON.parse(request.body.json)
  options = {convertTo : 'pdf'}

  carbone.render(template, data, options, function(err, result){
    if (err) {
      return console.log(err);
    }

    response.setHeader('Content-Length', result.length)
    response.setHeader('Content-Type', 'application/octet-stream')
    response.setHeader('Content-disposition', 'attachment;filename=' + filename)
    response.send(result)

  });
})

