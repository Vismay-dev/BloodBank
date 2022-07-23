const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type:  Number,
      required: true
    },
    bloodtype: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required:true
    },
    stock: {
      type: Object,
      required:false
    }
  }, { timestamps: true })

const Donor = mongoose.model('Donor', donorSchema)
module.exports = Donor