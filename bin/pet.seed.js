require('../config/db.config')

const mongoose = require('mongoose')
const Pet = require('../models/pets.model')
const ProtSociety = require('../models/protSociety.model')

const pets = [
  {
    name: 'Rosita',
    image: 'https://scontent-mad1-2.xx.fbcdn.net/v/t39.30808-6/313207524_4056052674620544_7781234170601587946_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0debeb&_nc_ohc=M7z1ilzvxkQAX_mvgxG&_nc_ht=scontent-mad1-2.xx&oh=00_AfD32ALLWcNr93vPVgB7AnyCk8Wj9TJxMqfIP3qlpwqrKA&oe=63F1C49C',
    class: 'Perro',
    age: '6 años',
    sex: 'Hembra',
    breed: 'Pastor alemán',
    energyLevel: 'medio',
    healthStatus: 'sin problemas de salud',
    isAdopted: false,
    description: 'Rosita fue rescatada de la calle después de estar viviendo durante 3 años en una obra. Vivir en el refugio es un poco complicado para ella; no le gusta estar encerrada. Pero intenta adaptarse a cualquier situación y ya va cogiendo confianza. Aún es una perrita joven, activa, de unos 5 años. Le encanta salir de su jaula para jugar y tener compañía. ¿La ayudamos a encontrar una familia?',
    protSociety: null,
  },
  {
    name: 'Keyla',
    image: 'https://scontent-mad1-2.xx.fbcdn.net/v/t39.30808-6/305063927_3996644003894745_4313823228212034408_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0debeb&_nc_ohc=PXUGeYJlkBYAX_d4woq&_nc_ht=scontent-mad1-2.xx&oh=00_AfBPZ0JqPTj_GNRQM7waptAUQ4WgcAfy65ZDet_EkgtX4A&oe=63F1897C',
    class: 'Perro',
    age: '4 años',
    sex: 'Hembra',
    breed: 'Común',
    energyLevel: 'alto',
    healthStatus: 'sin problemas de salud',
    isAdopted: false,
    description: 'Keyla es una perrita juguetona, muy buena y sociable con otros animales. Simplemente quiere jugar con sus compañeros, nunca se había divertido tanto. Le encanta cuando le abrimos la puerta de su jaula, se siente libre y un poco más acompañada. Ahora espera encontrar una familia dispuesta a darle la oportunidad que nunca ha tenido. ¿La ayudamos a encontrar un hogar?',
    protSociety: null,
  }
]

const protSocieties = [
  {
    name: 'Noa-Llutxent',
    image: 'https://scontent-mad1-2.xx.fbcdn.net/v/t1.18169-9/18056706_2256704837888679_2638329434592159193_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=V4Q3SSu0uFMAX8fq70A&tn=O121nQHpLMqQyntp&_nc_ht=scontent-mad1-2.xx&oh=00_AfB6sGbB9nNw4V8mL6bLBgNajp0RKeDR4J0wbWF_4XANxw&oe=64137378',
    location: 'Llutxent',
    email: 'associacio_noa@hotmail.com',
    website: 'https://www.facebook.com/Novaoportunitatanimal/?locale=es_ES',
    password: '123456789'
  }
]

// ProtSociety.create(protSocieties)
//   .then((protSocieties) =>
//     Pet.create(pets))
//   .catch((err) => console.error(`An error has occurred ${err}`))
//   .finally(() => mongoose.connection.close())

// Pet.create(pets)
//   .then((pets) => console.log(pets))
//   .catch((err) => console.error(`An error has occurred ${err}`))
//   .finally(() => mongoose.connection.close())


ProtSociety.create(protSocieties)
  .then((protSocieties) => {
    protSocieties.forEach((protSociety) => {
      Pet.create(pets)
        .then((pets) => {
          pets.forEach((pet) => {
            pet.protSociety = protSociety.id
          })
        })
    })
  })
  .catch((err) => console.error(`An error has occurred ${err}`))
  .finally(() => mongoose.connection.close())
