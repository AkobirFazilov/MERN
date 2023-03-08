const { Schema, model } = require('mongoose')

const schema = new Schema({
    nikname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})

module.exports = model('User', schema)