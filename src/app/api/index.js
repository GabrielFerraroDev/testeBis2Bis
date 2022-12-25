const express = require('express')
const bodyParser = require('body-parser')
const router = require('../routes/universities')

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/universities', router)

app.listen(3000, () => {
  console.log('API listening on port 3000')
})
