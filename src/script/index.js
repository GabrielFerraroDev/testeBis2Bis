require('dotenv').config()
const axios = require('axios')
const { universityModel: modelUniversity } = require('../app/schema/')
const { createMongoConnection } = require('../app/database')
const { dtUniversity } = require('../app/data-transformation/university')
const { sleep } = require('../app/utils')

const script = async () => {
  try {
    await createMongoConnection()
    const countries = [
      'argentina',
      'brasil',
      'chile',
      'colombia',
      'paraguai',
      'peru',
      'suriname',
      'uruguay',
    ]
    const arrayUniversities = []

    await Promise.all(
      countries.map(async (country) => {
        const { data: resAxios } = await axios.get(
          `http://universities.hipolabs.com/search?country=${country}`
        )
        arrayUniversities.push(resAxios)
      })
    )

    const flatArrayUniversities = await Promise.all(
      arrayUniversities
        .flatMap((x) => x)
        .map((university) => {
          return dtUniversity(university)
        })
    )

    const chunkSize = 100
    const chunks = []

    while (flatArrayUniversities.length > 0) {
      chunks.push(flatArrayUniversities.splice(0, chunkSize))
    }
    await Promise.all(
      chunks.map(async (chunk, index) => {
        console.log(`Andamento ${index}/${chunks.length - 1}`)

        const res = await modelUniversity.insertMany(chunk)
        console.log(res)
      })
    )
    console.log('Finalizado!')
  } catch (err) {
    console.log(' Erro na execuçao do script', err)
  }
}
script()
