const { Request, Response, Router } = require('express')
const universities = require('../service/university')

const router = Router()

router
  .get('/universities', universities.getUniversities)
  .get('/universities/:id', universities.getUniversityById)
  .post('/universities', universities.createUniversity)
  .put('/universities/:id', universities.updateUniversity)
  .delete('/universities/:id', universities.deleteUniversity)

module.exports = router
