import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './views/styles.css'

class ListRevs extends React.Component{
	state = {
		books: [],
	}

	componentDidMount() {
    axios({method: 'get', url: '/api/books'})
    .then(res => {
		this.setState({books: res.data})
		// console.log(res.data)
	})
  }
	render() {
		return (
			<div>
				<h1>Book Reviews</h1>
				
				{this.state.books.map((book,i) => {
					
					return (
						<div key={book._id} className="container">
						<div className="row">
						<div className="column">
						{/* book description block */}
						<div key={book._id} className='container'>
						<div className="row">
						<div className='column'><img src={book.image} /></div>
						<div className='column column-25'>
						<div className="row"><strong>Title: </strong>{book.title}</div>
						<div className="row"><strong>Author: </strong>{book.author}</div>
						<div><strong>Review:</strong> {book.review}</div>
						<div><strong>Review By:</strong> {book.critic ? book.critic.name : null}</div>
						</div>
						<div className="column column-60"></div>
						</div>
						</div>
						{/* end of book description block */}
						
						</div></div></div>
					)
					
				})}
				
			</div>
		)
	}
}
export default ListRevs