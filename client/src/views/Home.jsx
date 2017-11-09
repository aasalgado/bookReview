import React from 'react';
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
		books: []
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
						<li key={book._id}>
						{book.title}
						</li>
					)
				})}
				</ul>
			</div>
		)
	}
}
export default ListRevs