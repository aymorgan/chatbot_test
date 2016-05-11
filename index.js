var express = require('express')
var bodyParser = require('bodyParser')
var request = require('request')
var app = require('app')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
  res.send('Hello world, I am a chat bot')
})

// for Facebook Verification
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_tocken'] === 'my_voice_is_the_password_verify_me') {
    res.send('Error, wrong token')
  }
})

// Spin up a server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
