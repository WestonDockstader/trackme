let mongoose = require('mongoose')
let Schema = mongoose.Schema
let schemaName = 'note'

let note = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  parentId: { type: String, required: true }
})

module.exports = mongoose.model(schemaName, note)