const
    mongoose = require('mongoose'),
    bookSchema = new mongoose.Schema({
        Title: { type: String, required: true, unique: true },
        Author: { type: String, required: true },
        Review: { type: String, required: true },
        Rating: { type: Number},
        Critic: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
    
