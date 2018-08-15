let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemName = 'shift'

let noteSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
})

let shift = new Schema({
  date: { type: Date, required: true },
  start: { type: Number, required: true },
  end: { type: Number },
  breaks: { type: Array },
  title: { type: String },
  notes: [noteSchema],
  parentId: { type: String, required: true },
  author: { type: ObjectId, ref: 'User', required: true }
})

shift.pre('save', function (next) {
  this.markModified('songs')
  next()
})

module.exports = mongoose.model(schemName, shift)
