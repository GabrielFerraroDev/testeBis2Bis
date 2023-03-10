const request = require('supertest')
const app = require('../app/api')
const mongoose = require('mongoose')

const { UniversityModel: University } = require('../app/schema')

const clearDatabase = async () => {
  await University.deleteMany({})
}

describe('My tests', () => {
  describe('POST /universities', () => {
    it('should create a new university', async () => {
      const universityData = {
        country: 'brazil',
        state_province: 'BR',
        name: 'Mackenzie',
      }
      const res = await request(app).post('/universities').send(universityData)
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('country', 'brazil')
      expect(res.body).toHaveProperty('name', 'Mackenzie')
    })

    it('should return an error if the university already exists', async () => {
      const universityData = {
        country: 'brazil',
        state_province: 'BR',
        name: 'Mackenzie',
      }
      await request(app).post('/universities').send(universityData)
      const res = await request(app).post('/universities').send(universityData)
      expect(res.statusCode).toEqual(400)
      expect(res.body).toEqual({ error: 'Universidade já existe!' })
    })
  })

  describe('GET /universities', () => {
    it('should return a list of universities', async () => {
      const res = await request(app).get('/universities')
      expect(res.statusCode).toEqual(200)
    })

    it('should return a list of universities filtered by country', async () => {
      const res = await request(app).get('/universities?country=brazil')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            country: 'brazil',
          }),
        ])
      )
    })
  })

  describe('GET /universities/:id', () => {
    it('should return a single university', async () => {
      const university = await University.findOne()
      const res = await request(app).get(`/universities/${university._id}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: university._id.toString(),
        })
      )
    })

    it('should return a 404 error if the university is not found', async () => {
      const res = await request(app).get('/universities/abcdefgheras')
      expect(res.statusCode).toEqual(404)
    })
  })

  describe('PUT /universities/:id', () => {
    it('should update an existing university', async () => {
      const university = await University.findOne()
      const updateData = {
        name: 'Updated University Name',
      }
      const res = await request(app)
        .put(`/universities/${university._id}`)
        .send(updateData)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(
        expect.objectContaining({
          name: 'Updated University Name',
        })
      )
    })

    it('should return a 404 error if the university is not found', async () => {
      const updateData = {
        name: 'Updated University Name',
      }
      const res = await request(app)
        .put('/universities/adsasadsdasadsdasdasdasda')
        .send(updateData)
      expect(res.statusCode).toEqual(404)
    })
  })

  describe('DELETE /universities/:id', () => {
    it('should delete an existing university', async () => {
      const university = await University.findOne()
      const res = await request(app).delete(`/universities/${university._id}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: university._id.toString(),
        })
      )
    })

    it('should return a 404 error if the university is not found', async () => {
      const res = await request(app).delete('/universities/abcdefgherass')
      expect(res.statusCode).toEqual(404)
    })
  })
  afterAll(async () => {
    await clearDatabase()
    await mongoose.connection.close()
  })
})
