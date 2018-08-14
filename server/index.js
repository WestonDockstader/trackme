var express = require('express')
var bp = require('body-parser')
var app = express()
var server = require('http').createServer(app)
var cors = require('cors')
var port = process.env.PORT || 3000


var whitelist = ['http://localhost:8080']; // after heroku is ready add to whitelist
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions))

require('./server-assets/db/mlab-config')

app.use(express.static(__dirname + '/../www/dist'))

app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./server-assets/auth/routes')
app.use(auth.session)
app.use(auth.router)

app.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

let payperiods = require('./server-assets/routes/payperiods')
let shifts = require('./server-assets/routes/shifts')
let notes = require('./server-assets/routes/notes')

app.use(payperiods.router)
app.use(shifts.router)
app.use(notes.router)

app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})

app.listen(port, () => {
  console.log('server running on port', port)
})
