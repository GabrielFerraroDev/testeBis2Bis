const { UniversityModel: University } = require('../schema')

const getUniversities = (req, res) => {
  const { country, page } = req.query
  const filter = {}
  if (country) filter.country = country
  const options = {
    limit: 20,
    skip: (page - 1) * 20,
  }
  University.find(filter, {}, options)
    .then((universities) => res.send(universities))
    .catch((err) => res.status(500).json(err))
}

const getUniversityById = (req, res) => {
  const id = req.params.id

  return University.findById(id)
    .then((university) =>
      university ? res.send(university) : res.status(404).send('Not Found')
    )
    .catch((err) => {
      console.log(err)
      if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ID`
        return res.status(404).send(message)
      }
      res.status(500).json(err)
    })
}

const createUniversity = (req, res) => {
  const universityData = req.body
  return University.findOne({
    country: universityData.country,
    state_province: universityData.state_province,
    name: universityData.name,
  })
    .then((university) => {
      if (university) {
        return res.status(400).json({ error: 'Universidade já existe!' })
      }

      return University.create(universityData)
        .then((createdUniversity) => res.status(201).json(createdUniversity))
        .catch((err) => {
          if (err.name === 'CastError') {
            const message = `Resource not found. Invalid ID`
            return res.status(404).send(message)
          }
          res.status(500).json(err)
        })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ID`
        return res.status(404).send(message)
      }
      res.status(500).json(err)
    })
}

const updateUniversity = (req, res) => {
  const id = req.params.id
  const universityData = req.body
  return University.findByIdAndUpdate(id, universityData, { new: true })
    .then((updatedUniversity) =>
      updatedUniversity ? res.send(updatedUniversity) : res.status(404)
    )
    .catch((err) => {
      if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ID`
        return res.status(404).send(message)
      }
      res.status(500).json(err)
    })
}
const deleteUniversity = (req, res) => {
  const id = req.params.id
  return University.findByIdAndDelete(id)
    .then((deletedUniversity) =>
      deletedUniversity ? res.send(deletedUniversity) : res.status(404)
    )
    .catch((err) => {
      if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ID`
        return res.status(404).send(message)
      }
      res.status(500).json(err)
    })
}

module.exports = {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
}
