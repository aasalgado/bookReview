import React from 'react';
import axios from 'axios'

class UserRevs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			books: []
		}
	}
	componentDidMount() {
		// console.log(this.props)
		axios({method: 'get', url: '/api/books'})
		.then(res => res.data)
		.then(books => {
			this.setState({
				books: books.filter(book => book.critic === this.props.userId)
			})
		})
	}
	onFormSubmit(evt) {
    evt.preventDefault()
    console.log(this.refs.berryType.value)
    axios({
      url: '/api/berries',
      method: 'post',
      data: {type: this.refs.berryType.value}
    }).then(res => {
      console.log(res.data)
      this.setState({
        berries: [
          ...this.state.berries,
          res.data
        ]
      })
    })
  }
	deleteThis(_id) {
		axios({
		  url: '/api/books/' + _id,
			method: 'delete'})
			.then(res => res.data)
			.then(data => {
		  if(data.success) {
				this.setState({
					...this.state,
					books: this.state.books.filter(book => book._id !== _id)
				})
			} 
	  })
	}
	render(){
		console.log(this.state)
		const books = this.state.books
		// console.log(books)
		return (
			<div>
				<h1>Your Book Reviews</h1>
				<h2>User name: {this.props.name}</h2>
				<form onSubmit={this.onFormSubmit.bind(this)}>
          <input type = "text" ref="bookReview"/>
          <button>Add Book</button>
          </form>
				<ul>
				{books.map((book,i) => {
					return (
						<li key={book._id}>
						<strong>Title:</strong> {book.title} <strong>Author:</strong> {book.author}
						<button onClick={this.deleteThis.bind(this, book._id)}>Delete</button>
						<button>Add Review</button>
						</li>
					)
				})}
				</ul>
			</div>
		)
	}

	}


export default UserRevs