let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemName = 'period'

let period = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  author: { type: ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model(schemName, period)