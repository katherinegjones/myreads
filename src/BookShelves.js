import React, { Component } from 'react';
import BookShelf from './BookShelf'

class BookShelves extends Component {
    state = {
        shelves: ['Currently Reading', 'Want To Read', 'Read']
    }
    render() {
        const { shelves } = this.state
        const { books } = this.props
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
                        shelfBooks = {books.filter((book) => book.shelf.toLowerCase() === curShelf.replace(/ +/g, "").toLowerCase())}
                    ></BookShelf>
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )
    }
}

export default BookShelves