import React, { Component } from 'react';
import Book from './Book'
import { PropTypes } from 'prop-types'

/*
* @description - single Bookshelf component to show books belonging to this shelf
* @constructor
*/
class BookShelf extends Component {
    static propTypes = {
        shelfBooks: PropTypes.array,
        shelfName: PropTypes.string,
        removeBook: PropTypes.func,
        moveBook: PropTypes.func
    }

    /*
    * @description - render shelf component containing Book components
    * @returns - HTML elements and Book components
    */
    render(){
        const { shelfBooks, shelfName, removeBook, moveBook } = this.props
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelfBooks.map((book, index) => (
                            <li key={index}>
                                <Book
                                    id={book.bookId}
                                    author = {[...book.author]}
                                    title = {book.title}
                                    image = {book.image}
                                    curShelf = {book.shelf}
                                    removeBook={removeBook}
                                    moveBook={moveBook}
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