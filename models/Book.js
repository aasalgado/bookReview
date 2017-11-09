const
    mongoose = require('mongoose'),
    bookSchema = new mongoose.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        review: { type: String, required: true },
        rating: { type: Number},
        critic: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
    
