require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const router = require('../routes/universities')
const { createMongoConnection } = require('../database')
createMongoConnection()
const app = express()

app.disable('etag')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(router)
app.listen(3000, () => {
  console.log('API listening on port 3000')
})

module.exports = app
