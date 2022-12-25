const mongoose = require('mongoose')

const createMongoConnection = () => {
  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)

  console.log('Conectado!')

  return mongoose
}

module.exports = {
  createMongoConnection,
}
