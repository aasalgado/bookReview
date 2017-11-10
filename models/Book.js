const
    mongoose = require('mongoose'),
    bookSchema = new mongoose.Schema({
        title: { type: String, required: true },
        subtitle: { type: String},
        author: { type: String, required: true },
        review: { type: String, required: true },
        rating: { type: Number},
        image: { type: String},
        pages: { type: Number},
        critic: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    }, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
    
