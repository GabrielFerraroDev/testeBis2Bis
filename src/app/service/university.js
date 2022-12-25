const { UniversityModel: University } = require('../schema')

const getUniversities = (req, res) => {
  const filter = req.query
  return University.find(filter)
    .then((universities) => res.send(universities))
    .catch((err) => res.status(500).send(err))
}

const getUniversityById = (req, res) => {
  const id = req.params.id
  return University.findById(id)
    .then((university) => res.send(university))
    .catch((err) => res.status(500).send(err))
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
        return res.send({ error: 'University already exists' })
      }

      return University.create(universityData)
        .then((createdUniversity) => res.send(createdUniversity))
        .catch((createErr) => res.status(500).send(createErr))
    })
    .catch((findErr) => res.status(500).send(findErr))
}

const updateUniversity = (req, res) => {
  const id = req.params.id
  const universityData = req.body
  return University.findByIdAndUpdate(id, universityData, { new: true })
    .then((updatedUniversity) => res.send(updatedUniversity))
    .catch((err) => res.status(500).send(err))
}
const deleteUniversity = (req, res) => {
  const id = req.params.id
  return University.findByIdAndDelete(id)
    .then((deletedUniversity) => res.send(deletedUniversity))
    .catch((err) => res.status(500).send(err))
}

module.exports = {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
}
