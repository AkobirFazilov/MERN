const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    ganre: {
        type: Schema.Types.ObjectId,
        ref: 'Ganre'
    },
    description: { type: String, required: true },
    link: { type: String, required: true },
    imageLink: { type: String, required: true }
})

module.exports = model('Book', schema)