import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'
/*
* @description - bookshelves component representing main page
* @component
*/
class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array,
        updateShelf: PropTypes.func,
        remove: PropTypes.func

    }
    state = {
        shelves: ['Currently Reading', 'Want To Read', 'Read']
    }
    /*
    * @description - render the elements for main bookshelves page
    * @return html elements
    */
    render() {
        const { shelves } = this.state
        const { books, updateShelf, remove } = this.props
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((curShelf, index) => (
                    <BookShelf
                        key = {index}
                        shelfName = {curShelf}
                        removeBook={remove}
                        moveBook={updateShelf}
                        shelfBooks = {books.filter((book) => book.shelf.toLowerCase() === curShelf.replace(/ +/g, "").toLowerCase())}
                        
                    ></BookShelf>
                ))}
              </div>
            </div>
              <Link
                className='open-search'
                to='/search'
              ><button>Add a book</button></Link>

          </div>
        )
    }
}

export default BookShelves