var mongoose = require('mongoose')
var connectionString = 'mongodb://masterUser:guest1@ds113522.mlab.com:13522/trackme'
var connection = mongoose.connection

mongoose.connect(connectionString)

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})

connection.once('open', () => {
  console.log('Connected to DB')
})