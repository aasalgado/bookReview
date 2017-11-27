const Book = require('../models/Book.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	index: (req, res) => {
		Book.find({}).populate('critic').exec((err, books) => {
			res.json(books)
		})
	},

	show: (req, res) => {
		console.log("a book review")
		console.log(req.user.title)
		Book.findById(req.params.id, (err, book) => {
			res.json(book)
		})
	},

	create: (req, res) => {
        console.log("create review")
		var book = new Book(req.body) // book will have title, author, review, rating & critic
		console.log(book)
        book.user = req.user
		book.save((err, book) => {
			if(err) {
                console.log(err)
                return res.json({success: false, code: err.code})
            }
			res.json({success: true, message: "Book Review created.", book })
        })
        // another way 
        // var candyParams = req.body // {type: "Chocolate", name: "Hersey's"}
        // candyParams.user = req.user // {type: "Chocolate", name: "Hersey's", user: 123129312}
        // Candy.create(candyParams, (err, candy) => {
        //     res.json(....)
        // })
	},

	update: (req, res) => {
		Book.findById(req.params.id, (err, book) => {
            // check if this book review is the req.user's book review
            // if it isn't, return json failed
			Object.assign(book, req.body)
			book.save((err, updatedBookReview) => {
				res.json({success: true, message: "Book Review Updated.", book: book})
			})
		})
	},

	destroy: (req, res) => {
		Book.findByIdAndRemove(req.params.id, (err, book) => {
			res.json({success: true, message: "Book Review Deleted."})
		})
	}
}