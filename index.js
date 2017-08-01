const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 3000))

app.use(express.static(__dirname + '/WebSide'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/WebSide/index.html')
})

app.listen(app.get('port'), function () {
  console.log('App listening on port 3000!')
})
