let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemName = 'period'

let noteSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
})

let shiftSchema = new Schema({
  date: { type: Date, required: true },
  start: { type: Number, required: true },
  end: { type: Number },
  breaks: { type: Array },
  title: { type: String },
  notes: [noteSchema],
  parentId: { type: String, required: true },
})

let period = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  shifts: [shiftSchema],
  author: { type: ObjectId, ref: 'User', required: true }
})

period.pre('save', function (next) {
  this.markModified('songs')
  next()
})

module.exports = mongoose.model(schemName, period)
