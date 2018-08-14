var router = require('express').Router()
var Periods = require('../models/period')

// Get payperiod by id
router.get('/api/periods/:id', (req, res) => {
  Periods.find({ author: req.session.uid })
    .then(periods => {
      res.status(200).send(periods)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Create payperiod
router.post('/api/periods', (req, res) => {
  req.body.author = req.session.uid
  console.log(req.body)
  Periods.create(req.body)
    .then(newComment => {
      res.status(200).send(newComment)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Edit payperiod
router.put('/api/periods/:id', (req, res) => {
  Periods.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(period => {
      res.status(200).send({ message: 'successfully updated', period })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Delete payperiod
router.delete('/api/periods/:id', (req, res) => {
  Periods.findByIdAndRemove(req.params.id)
    .then(period => {
      res.status(200).send({ message: 'successfully deleted' })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = { router }