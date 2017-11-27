# BookRevs
--
The goal for this project was to create an app that lets users write reviews about books they have read and read book reviews from other users.
![Imgur](https://i.imgur.com/bm4z0Uf.png)

## Technologies Used
- HTML
- CSS
- Milligram
- Axios
- React Router
- ReactJS
- NodeJS/Express
- Google Books API

## How it works
The user can signUp/LoggIn, go to Your-Reviews page and search for a book that they have read by typing the title of the book in the search box, then click Search Book.
In the top right corner the book cover should appear along with the details of the book. The user can then type in the comments of the book in the text box below, then click Add Book Review to List. The book will appear on the users book review list and also appear in the home page with all the other users reviews.

## User Stories
- As a user, I want to search for a book and have the details automatically populate.
- As a user, I want to type in my book review and see it in the global book review list.
- As a user, I do not want another user to edit or delete any of my book reviews.
- As a user, I like to delete a book review.
- As a user, I want a simple interface that is clear to use and easy to navigate.
- As a user, I would like my information to be secure. 
- As a user, I would like to save my login so I don't have to constantly be logging in.

## MVP
- Implement two models: User & Book
- Include sign up / log in functionality with encrypted passwords as well as validation for duplicate usernames or email addresses.
- Implement complete RESTful routes for the User & Book model.
- Users can search for details of a book and save their comment about a book.
- Users can view other users book review

## Unsolved Problems & Future Features
- Currently, users cannot view multiple reviews for a single book.
- Implement a filter so users can easily find a specific book.
- 