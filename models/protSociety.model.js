const mongoose = require('mongoose')

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
        required: 'La dirección de email es obligatoria',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un e-mail válido']
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
        minLength: [8, "La contraseña debe contener más de 8 caracteres"]
    }
})

const ProtSociety = mongoose.model('Drone', protSocietySchema)
module.exports = ProtSociety