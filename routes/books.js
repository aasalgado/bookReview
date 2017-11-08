const
express = require('express'),
booksRouter = new express.Router(),
booksCtrl = require('../controllers/books.js'),
verifyToken = require('../serverAuth.js').verifyToken

booksRouter.use(verifyToken)

booksRouter.route('/')
.get(booksCtrl.index)
.post(booksCtrl.create)

booksRouter.route('/:id')
.get(booksCtrl.show)
.patch(booksCtrl.update)
.delete(booksCtrl.destroy)

module.exports = booksRouter