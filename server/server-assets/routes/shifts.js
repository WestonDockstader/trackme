let router = require('express').Router()
let Shifts = require('../models/shift')

// this path is for getting all shifts for a user or a specific shift by adding an id
router.get('/api/shifts/:id?', (req, res) => {
  if (req.params.id) {
    Shifts.findById(req.params.id)
      .then(shift => {
        return res.status(200).send(shift)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  }
  // @ts-ignore
  Shifts.find({ author: req.session.uid })
    .then(shifts => {
      res.status(200).send(shifts)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// This path is for creating a shift
router.post('/api/shifts', (req, res) => {
  // @ts-ignore
  req.body.author = req.session.uid
  Shifts.create(req.body)
    .then(newShift => {
      res.status(200).send(newShift)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// This path is for editing a shift
router.put('/api/shifts/:id', (req, res) => {
  Shifts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(shift => {
      res.status(200).send({ message: "Shift Updated" })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// This path is for Deleting a shift
router.delete('/api/shifts/:id', (req, res) => {
  Shifts.findByIdAndRemove(req.params.id)
    .then(shift => {
      res.status(200).send({ message: 'Shift Deleted' })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = { router }