const Book = require('../models/Book.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	index: (req, res) => {
		Book.find({}, (err, books) => {
			res.json(books)
		})
	},

	show: (req, res) => {
		console.log("a candy")
		console.log(req.user.name)
		Candy.findById(req.params.id, (err, candy) => {
			res.json(candy)
		})
	},

	create: (req, res) => {
        console.log("creating a candy")
        var candy = new Candy(req.body) // candy will have name and type
        candy.user = req.user
		candy.save((err, candy) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Candy created.", candy })
        })
        // another way 
        // var candyParams = req.body // {type: "Chocolate", name: "Hersey's"}
        // candyParams.user = req.user // {type: "Chocolate", name: "Hersey's", user: 123129312}
        // Candy.create(candyParams, (err, candy) => {
        //     res.json(....)
        // })
	},

	update: (req, res) => {
		Candy.findById(req.params.id, (err, candy) => {
            // check if this candy is the req.user's candy
            // if it isn't, return json failed
			Object.assign(candy, req.body)
			candy.save((err, updatedCandy) => {
				res.json({success: true, message: "Candy updated.", candy: candy})
			})
		})
	},

	destroy: (req, res) => {
		Candy.findByIdAndRemove(req.params.id, (err, candy) => {
            
			res.json({success: true, message: "Candy deleted.", candy})
		})
	}
}