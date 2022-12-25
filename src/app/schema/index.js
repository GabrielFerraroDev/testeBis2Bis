const Schema = require('mongoose').Schema
const mongoose = require('mongoose')

const universitySchema = require('./university')

module.exports = {
  universityModel: mongoose.model('Universities', new Schema(universitySchema)),
}
