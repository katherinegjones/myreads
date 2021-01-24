import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {
    render(){
        const { shelfBooks, shelfName } = this.props
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelfBooks.map((book, index) => (
                            <li key={index}>
                                <Book
                                    author = {book.author}
                                    title = {book.title}
                                    image = {book.image}
                                ></Book>
                            </li>
                        ))}
                      
                    </ol>
                  </div>
                </div>
        )
    }
}

export default BookShelf