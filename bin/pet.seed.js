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
    energyLevel: 'Media',
    healthStatus: 'sin problemas de salud',
    isAdopted: false,
    description: 'Rosita fue rescatada de la calle después de estar viviendo durante 3 años en una obra. Vivir en el refugio es un poco complicado para ella; no le gusta estar encerrada. Pero intenta adaptarse a cualquier situación y ya va cogiendo confianza. Aún es una perrita joven, activa, de unos 5 años. Le encanta salir de su jaula para jugar y tener compañía. ¿La ayudamos a encontrar una familia?',
    protSociety: 'Noa-Llutxent',
  },
  {
    name: 'Keyla',
    image: 'https://scontent-mad2-1.xx.fbcdn.net/v/t39.30808-6/329176822_3428817610726994_5221076751388215718_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0debeb&_nc_ohc=YPMba0XMX7cAX-bExZ-&_nc_oc=AQmIO09wlCZ11kwMt25TXOEn1kcA7CHfwoXAeUhF3jpWXtwiVLXfShipPY4-j5zpZT1rQzlXx9KgP9dimR2-w8-I&_nc_ht=scontent-mad2-1.xx&oh=00_AfAlr-EJk8ElCpt3CrcguYMkfG2zpj0OauRwOhGS4Ozyow&oe=6406FF75',
    class: 'Perro',
    age: '4 años',
    sex: 'Hembra',
    breed: 'Común',
    energyLevel: 'Alta',
    healthStatus: 'sin problemas de salud',
    isAdopted: false,
    description: 'Keyla es una perrita juguetona, muy buena y sociable con otros animales. Simplemente quiere jugar con sus compañeros, nunca se había divertido tanto. Le encanta cuando le abrimos la puerta de su jaula, se siente libre y un poco más acompañada. Ahora espera encontrar una familia dispuesta a darle la oportunidad que nunca ha tenido. ¿La ayudamos a encontrar un hogar?',
    protSociety: 'Noa-Llutxent',
  },
  {
    name: 'Max',
    image: 'https://t2.ea.ltmcdn.com/es/posts/1/6/2/10_curiosidades_del_golden_retriever_21261_600_square.jpg',
    class: 'Perro',
    age: '2 años',
    sex: 'Macho',
    breed: 'Golden Retriever',
    energyLevel: 'Media',
    healthStatus: 'Vacunado y desparasitado',
    isAdopted: false,
    description: 'Max es un perro amigable con una cola que no para de moverse y un amor por el juego de buscar. Es un perro de raza Golden Retriever de 2 años de edad que está ansioso por encontrar una nueva familia para llamar suya.',
    protSociety: null,
  },
  {
    name: 'Luna',
    image: 'https://www.elmueble.com/medio/2023/03/02/perro-de-raza-beagle_67c65dda_230302133829_900x900.jpg',
    class: 'Perro',
    age: '2 años',
    sex: 'Hembra',
    breed: 'Beagle',
    energyLevel: 'Alta',
    healthStatus: 'Vacunado y desparasitado',
    isAdopted: false,
    description: 'Luna es una perrita dulce que ama los abrazos y dar besos. Tiene 2 años de edad y es una Beagle que espera encontrar una familia amorosa que la consienta con atención.',
    protSociety: null,

  },
  {
    name: 'Rocky',
    image: 'https://www.terranea.es/assets/images/razas/pastor_aleman2.jpg',
    class: 'Perro',
    age: '4 años',
    sex: 'Macho',
    breed: 'Pastor Alemán',
    energyLevel: 'Alta',
    healthStatus: 'Vacunado y desparasitado',
    isAdopted: false,
    description: 'Rocky es un perro Pastor Alemán muy guapo y está ansioso por complacer a su familia adoptiva. Fue abandonado hace ya dos años y es puro amor',
    protSociety: null,
  },
  {
    name: 'Simba',
    image: 'https://imagenes.muyinteresante.es/files/vertical_composte_image/uploads/2022/10/12/6345f0b76a23a.jpeg',
    class: 'Gato',
    age: '1 año',
    sex: 'Macho',
    breed: 'Siamés',
    energyLevel: 'Alta',
    healthStatus: 'Vacunado y desparasitado',
    isAdopted: false,
    description: 'Simba es un gato joven y enérgico que necesita mucho espacio y actividad física. Le encanta jugar con juguetes y corretear por la casa. También le encanta que le rasquen la barriga y le den mimos. Es muy sociable y se lleva bien con otros gatos y personas. Es ideal para una familia activa que esté dispuesta a jugar con él y darle mucho amor y atención.',
    protSociety: null,
  },
  {
    name: 'Lia',
    image: 'https://st4.depositphotos.com/9807116/27059/i/600/depositphotos_270596946-stock-photo-beautiful-young-green-eyes-mixed.jpg',
    class: 'Gato',
    age: '6 años',
    sex: 'Hembra',
    breed: 'Mixta',
    energyLevel: 'Baja',
    healthStatus: 'No tiene problemas de salud conocidos.',
    isAdopted: false,
    description: 'Lia es una gata tranquila y amorosa que busca un hogar para ser acurrucada y mimada. Le encanta dormir en su cama y tomar el sol en la ventana. Es muy buena compañía para los días lluviosos y para ver películas en casa. Es muy cariñosa y se lleva bien con otros gatos.',
    protSociety: null,
  },
  {
    name: 'Rob',
    image: 'https://images.hola.com/imagenes/mascotas/20190904148207/dermatitis-atopica-enfermedad-tipica-golden-retriever-gt/0-713-393/portada-golden-retriever-t.jpg',
    class: 'Perro',
    age: '3 años',
    sex: 'Macho',
    breed: 'Golden Retriever',
    energyLevel: 'Media',
    healthStatus: 'No tiene problemas de salud conocidos.',
    isAdopted: false,
    description: 'Rob es un perro amable y cariñoso que siempre está dispuesto a hacer nuevos amigos. Le encanta jugar con pelotas y correr en el parque. También es un perro muy inteligente y sabe varios trucos. Rob es ideal para una familia que esté buscando un perro fiel y le guste salir a caminar con su mascota. Se lleva bien con otros perros y niños.',
    protSociety: null,
  },
  {
    name: 'Kiwi',
    image: 'https://scontent-mad2-1.cdninstagram.com/v/t51.2885-15/295841245_1090802178523372_1043809500392244737_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=-Bnh5OtsQ6cAX8NTVo_&edm=AGenrX8BAAAA&ccb=7-5&oh=00_AfDXGwAnJnjncmy0Z_bgSKesqHnpXBE2Iv6_8PqGz0Kzog&oe=64153EB7&_nc_sid=5eceaa',
    class: 'Perro',
    age: '1 año',
    sex: 'Macho',
    breed: 'Podenco',
    energyLevel: 'Media',
    healthStatus: 'No tiene problemas de salud conocidos.',
    isAdopted: false,
    description: 'Kiwi es un perro jugueton y activo que necesita mucho ejercicio y espacio para correr. Le encanta jugar con juguetes y buscar cosas. También es muy amable y le encanta recibir mimos y caricias. Kiwi es ideal para una familia activa que esté buscando un perro divertido y amoroso. Se lleva bien con otros perros y niños, pero puede ser un poco tímida al principio.',
    protSociety: null,
  },
  {
    name: 'Chip',
    image: 'https://misanimales.com/wp-content/uploads/2021/02/ardilla-coreana-posa.jpg',
    class: 'Ardilla',
    age: '1 año',
    sex: 'Macho',
    breed: 'Coreana',
    energyLevel: 'Alta',
    healthStatus: 'En buen estado de salud.',
    isAdopted: false,
    description: 'Chip es una ardilla muy activa y curiosa que busca un hogar donde pueda explorar y jugar. Le encanta subir y bajar de los árboles y correr por el suelo. Es muy inteligente y puede aprender trucos fácilmente. Chip necesita un hogar con jaula espaciosa y rica en estímulos, con suficiente espacio para trepar y jugar. Es muy sociable y le encanta estar con personas y otros animales.',
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
  },
  {
    name: 'ALBA',
    image: 'https://scontent-mad2-1.xx.fbcdn.net/v/t1.6435-9/204885677_162230935939291_4851567212930924189_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=31hakhiJIl0AX8gI4dT&_nc_ht=scontent-mad2-1.xx&oh=00_AfDzyWy9L7DyZk0m62l4cXTbehsd-Y0kABEJIIuVJzN5nw&oe=6437CB76',
    location: 'Madrid',
    email: 'colabora@albaonline.org',
    website: 'https://albaonline.org/',
    password: '987654321'
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