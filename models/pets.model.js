const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la mascota es obligatorio"]
  },
  image: {
    type: String,
  },
  class: {
    type: String,
  },
  age: {
    type: String,
    required: [true, "La edad de la mascota es obligatoria"]
  },
  sex: {
    type: String,
    required: [true, "El sexo de la mascota es obligatorio"]
  },
  breed: {
    type: String,
    required: [true, "La raza de la mascota es obligatorio"]
  },
  energyLevel: {
    type: String,
    required: [true, "El nivel de energía de la mascota es obligatorio"]
  },
  healthStatus: {
    type: String,
  },
  isAdopted: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, "La descripción de la mascota es obligatoria"]
  },
  protSociety: {
    type: Schema.Types.ObjectId,
    ref: 'ProtSociety'
  }
})

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet