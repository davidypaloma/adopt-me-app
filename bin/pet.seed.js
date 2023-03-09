require('../config/db.config')

const mongoose = require('mongoose')
const Pet = require('../models/pets.model')
const ProtSociety = require('../models/protSociety.model')

const pets = [
  {
    name: 'Rosita',
    image: 'https://scontent-mad2-1.xx.fbcdn.net/v/t39.30808-6/328527251_3098342133645647_292619384186447311_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0debeb&_nc_ohc=sSy8HjZzTWcAX9W5K64&_nc_oc=AQm0VaN4TblKaOaHRtA_6GsnJY3gCIq2Zyrr8ajLiL57SFKEIQHCd5AX63vqnRO39sdE7eHChJK63zSXy_w0rpoO&_nc_ht=scontent-mad2-1.xx&oh=00_AfA6JIrCYhuEa1xDdgDKclthI3PGTWqKz62YQR_mtlr-Fg&oe=64075F25',
    class: 'Perro',
    age: '6 años',
    sex: 'Hembra',
    breed: 'Pastor alemán',
    energyLevel: 'media',
    healthStatus: 'sin problemas de salud',
    isAdopted: false,
    description: 'Rosita fue rescatada de la calle después de estar viviendo durante 3 años en una obra. Vivir en el refugio es un poco complicado para ella; no le gusta estar encerrada. Pero intenta adaptarse a cualquier situación y ya va cogiendo confianza. Aún es una perrita joven, activa, de unos 5 años. Le encanta salir de su jaula para jugar y tener compañía. ¿La ayudamos a encontrar una familia?',
    protSociety: null,
  },
  {
    name: 'Keyla',
    image: 'https://scontent-mad2-1.xx.fbcdn.net/v/t39.30808-6/329176822_3428817610726994_5221076751388215718_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0debeb&_nc_ohc=YPMba0XMX7cAX-bExZ-&_nc_oc=AQmIO09wlCZ11kwMt25TXOEn1kcA7CHfwoXAeUhF3jpWXtwiVLXfShipPY4-j5zpZT1rQzlXx9KgP9dimR2-w8-I&_nc_ht=scontent-mad2-1.xx&oh=00_AfAlr-EJk8ElCpt3CrcguYMkfG2zpj0OauRwOhGS4Ozyow&oe=6406FF75',
    class: 'Perro',
    age: '4 años',
    sex: 'Hembra',
    breed: 'Común',
    energyLevel: 'alta',
    healthStatus: 'sin problemas de salud',
    isAdopted: false,
    description: 'Keyla es una perrita juguetona, muy buena y sociable con otros animales. Simplemente quiere jugar con sus compañeros, nunca se había divertido tanto. Le encanta cuando le abrimos la puerta de su jaula, se siente libre y un poco más acompañada. Ahora espera encontrar una familia dispuesta a darle la oportunidad que nunca ha tenido. ¿La ayudamos a encontrar un hogar?',
    protSociety: null,
  }
]

const protSocieties = [
  {
    name: 'Noa-Llutxent',
    image: 'https://scontent-mad2-1.xx.fbcdn.net/v/t1.18169-9/18056706_2256704837888679_2638329434592159193_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jtpVPu6j3hQAX9Fumqj&_nc_ht=scontent-mad2-1.xx&oh=00_AfB1gY2BWBevfcE5u6pwFXBlM2YByIa9SDWzifPWqEJ7Fw&oe=6429DCF8',
    location: 'Llutxent',
    email: 'associacio_noa@hotmail.com',
    website: 'https://www.facebook.com/Novaoportunitatanimal/?locale=es_ES',
    password: '123456789'
  }
]

Pet.deleteMany()
  .then(() => ProtSociety.deleteMany())
  .then(() => ProtSociety.create(protSocieties))
  .then((protSocieties) => {
    protSocieties.forEach((protSociety) => {
      pets.forEach((pet) => {
        pet.protSociety = protSociety.id
      })
      Pet.create(pets)
        .then((pets) => {
          console.log("pets created");
        })
    })
  })
  .catch((error) => console.error(`An error has occurred ${error}`))
  // .finally(() => mongoose.connection.close())