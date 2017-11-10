import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

// const Home = (props) => {
// 	return (
// 		<div className='Home'>
// 			<h1>Book List Here</h1>
// 		</div>
// 	)
// }

class ListRevs extends React.Component{
	state = {
		books: [],
		popUp: false
	}

	toggleRev() {
		this.setState({popUp: !this.state.popUp})
	}
	componentDidMount() {
    axios({method: 'get', url: '/api/books'})
    .then(res => this.setState({books: res.data}))
  }
	render() {
		return (
			<div>
				<h1>Book Reviews</h1>
				<ul>
				{this.state.books.map((book,i) => {
					return (
						<Link to={`/rev/${book._id}`} onClick={this.toggleRev.bind(this)}>
						<li key={book._id}>
						<strong>Title:</strong> {book.title} <strong>Author:</strong> {book.author}
						</li> </Link>
					)
				})}
				</ul>
			</div>
		)
	}
}
export default ListRevs