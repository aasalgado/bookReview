import React from 'react';
import axios from 'axios'

class UserRevs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
			searchResult: null,
			addedBook: false,
			fields: {
				review: '',
				searchItem: ''
			}
		}
	}

	componentDidMount() {
		axios({method: 'get', url: '/api/books'})
		.then(res => res.data)
		.then(books => {
			console.log(books)
			this.setState({
				books: books.filter(book => {
					if (book.critic) {
						if (book.critic._id === this.props.userId) {
							return book
						}
					} 
				})
			})
		})
	}

	parseSearch(str) {
		str = str.toLowerCase();
		str = str.replace(/\s{2,}/g,' ').trim();
		str = str.replace(/\s/g, '+')
		return str
	}

	searchBook() {
		var searchTerm = this.state.fields.searchItem
		searchTerm = this.parseSearch(searchTerm)
		//console.log(searchTerm)
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=5&key=AIzaSyBATfwtxXzErz-zBze_CQwXeAGb6CgD8_c`)
		.then(res => {
			const data = res.data.items[0].volumeInfo
			console.log(data.title)
			console.log(data.subtitle)
			console.log(data.authors[0])
			console.log(data.imageLinks.thumbnail)
			console.log('Number of Pages: ' + data.pageCount)
			console.log(res.data)
			this.setState({
				searchResult: {
					title: data.title,
					subtitle: data.subtitle,
					author: data.authors[0],
					image: data.imageLinks.thumbnail,
					pages: data.pageCount
				}
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
	addBook() {
		var newBook = {
			// ...this.state.fields.review,
			...this.state.searchResult,
			review: this.state.fields.review,
			critic: this.props.userId
		}
		console.log("---------------- new book ----------")
		console.log(newBook)
		console.log("---------------- ----------")
		axios({ method: 'post', url: '/api/books', data: newBook })
		.then((res)=> {
			console.log(res.data)
			this.state.books.unshift(res.data.book)
			this.setState({
				...this.state,
				books: this.state.books
	
			})
		})
		
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}
	render(){
		console.log(this.state)
		// const books = this.state.books
		// console.log(books)
		return (
			<div className='container'>
				<div className='row'>
				<div className='column'>
						{/* <h2>User name: {this.props.name}</h2> */}
						<h3>Add a Review</h3>
						<div className='row'>
							<input type = "text" value={this.state.fields.searchItem}  onChange={this.onInputChange.bind(this)} name="searchItem" placeholder='Title of Book' />
							<button onClick={this.searchBook.bind(this)}>Search Book</button>
						</div>
						
							
						
						{
							this.state.addedBook
							? (
								<div>
									<ul>
									<img src={this.state.searchResult.image} alt={this.state.searchResult.image}/>
									{this.state.searchResult.title}
									{this.state.searchResult.author}
									<button>Add Review</button>
									</ul>
								</div>
							)
							: null
						}
				</div>
				<div className='column'>
					{
						this.state.searchResult
						? (
							<div className='container'>
								<div className='row'>
									<div className='column column-25'>
									<img src={this.state.searchResult.image} alt={this.state.searchResult.image}/>
									</div>
									<div className='column'>
									<div className='row'><strong>{this.state.searchResult.title}</strong></div>
									<div className='row'>{this.state.searchResult.subtitle}</div>
									<div className='row'>{this.state.searchResult.author}</div>
									<div className='row'>{this.state.searchResult.pages} Pages</div>
									</div>
								</div>
								<textarea value={this.state.fields.review} onChange={this.onInputChange.bind(this)} name="review" rows="4" columns="20" placeholder="Type in your review here."/>
								<button onClick={this.addBook.bind(this)}>Add Book Review to List</button>
							</div>
						)
						: <div className='column-offset-100'>Click Search Book Button to see book details</div>
					}
				</div>
				</div>
				<div className='row'>
					<ul>
					
							{this.state.books.map((book,i) => {
								return (
									
									
									<div key={book._id} className='container'>
									<div className='row'>
									<div className='column column-25'><img src={book.image} /></div>
									<dl className='column column-50'>
									<dt><strong>Title:</strong> {book.title}</dt> <dd><strong>Author:</strong> {book.author}</dd> <dd><strong>Review:</strong> {book.review}</dd>
									</dl>
									<button onClick={this.deleteThis.bind(this, book._id)}>Delete</button>
									</div>
									</div>
								
								)
							})}
						</ul>
					</div>
			</div>
		)
	}

	}


export default UserRevs