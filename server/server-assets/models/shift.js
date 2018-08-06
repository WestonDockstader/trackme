let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemName = 'shift'

let shift = new Schema({
  date: { type: Date, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  author: { type: ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model(schemName, shift)