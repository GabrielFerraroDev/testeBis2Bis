const { universityModel: University } = require('../schema')

const getUniversities = (filter) => {
  return University.find(filter)
}

const getUniversityById = (id) => {
  return University.findById(id)
}

const createUniversity = (universityData) => {
  return University.findOne({
    country: universityData.country,
    state_province: universityData.state_province,
    name: universityData.name,
  }).then((university) => {
    if (university) {
      return { error: 'University already exists' }
    }

    return University.create(universityData)
  })
}

// Função para atualizar uma universidade
const updateUniversity = (id, universityData) => {
  return University.findByIdAndUpdate(id, universityData, { new: true })
}

// Função para remover uma universidade
const deleteUniversity = (id) => {
  return University.findByIdAndDelete(id)
}

module.exports = {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
}
