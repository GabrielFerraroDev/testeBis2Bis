const mongoose = require('mongoose')

const createMongoConnection = () => {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}_test`
    )
  } else {
    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  }

  console.log('Conectado!')

  return mongoose
}

module.exports = {
  createMongoConnection,
}
