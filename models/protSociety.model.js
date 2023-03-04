const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const protSocietySchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la protectora es obligatorio"]
  },
  image: {
    type: String
  },
  location: {
    type: String,
    required: [true, "La localización de la protectora es obligatoria"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "La dirección de email es obligatoria",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Por favor, introduce un e-mail válido"]
  },
  phone: {
    type: String,
  },
  website: {
    type: String
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minLength: [8, "La contraseña debe contener al menos 8 caracteres"]
  }
})

protSocietySchema.pre('save', function (next) {
  const protSociety = this;
  if (protSociety.isModified('password')) {
    bcrypt
      .hash(protSociety.password, 10)
      .then((encryptedPassword) => {
        this.password = encryptedPassword
        next()
      })
      .catch(next)
  } else {
    next()
  }
})

const ProtSociety = mongoose.model('ProtSociety', protSocietySchema)
module.exports = ProtSociety