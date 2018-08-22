let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemName = 'Shifts'

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
  parentId: { type: ObjectId, ref: 'PayPeriod', required: true }
})

shift.pre('save', function (next) {
  this.markModified('shifts')
  next()
})

module.exports = mongoose.model(schemName, shift)