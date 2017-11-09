import React from 'react';
import axios from 'axios';
import clientAuth from '../clientAuth.js'

class UserRevs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			books: []
	}
}
	componentDidMount() {
		// console.log(this.props)
		axios({method: 'get', url: `/api/books`})
		.then(res => res.data)
		.then(books => {
			this.setState({
				books: books.filter(book => book.critic === this.props.userId)
			})
		})
	}
	render(){
		return (
			<div>
				<h1>Your Book Reviews</h1>
				<h2>User name: {this.props.name}</h2>
				<ul>
				{this.state.books.map((book,i) => {
					return (
						<li key={book._id}>
						<strong>Title:</strong> {book.title} <strong>Author:</strong> {book.author}
						</li>
					)
				})}
				</ul>
			</div>
		)
	}

	}


export default UserRevs