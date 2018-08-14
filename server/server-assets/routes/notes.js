var router = require('express').Router()
var Notes = require('../models/note')

// Get note by id or get all notes
router.get('/api/notes/:id?', (req, res) => {
  if (req.params.id) {
    Notes.findById(req.params.id)
      .then(note => {
        return res.status(200).send(note)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  }
  // @ts-ignore
  Notes.find({ author: req.session.uid })
    .then(notes => {
      res.status(200).send(notes)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Create note
router.post('/api/notes', (req, res) => {
  // @ts-ignore
  req.body.author = req.session.uid
  Notes.create(req.body)
    .then(newComment => {
      res.status(200).send(newComment)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Edit note
router.put('/api/notes/:id', (req, res) => {
  Notes.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(note => {
      res.status(200).send({ message: 'successfully updated', note })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Delete note
router.delete('/api/notes/:id', (req, res) => {
  Notes.findByIdAndRemove(req.params.id)
    .then(note => {
      res.status(200).send({ message: 'successfully deleted' })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = { router }