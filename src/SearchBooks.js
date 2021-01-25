import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types'

class SearchBooks extends Component {
    state = {
        query: '',
        results: []
    }

    static propTypes = {
        books: PropTypes.array,
        updateShelf: PropTypes.func,
        remove: PropTypes.func

    }

    handleChange = (query) => {
        this.setState(() => ({
            query,
        }))

        setTimeout(() => {
            this.searchResults()
        }, 500)
    }
    //found method for handling input in the accepted answer here: https://knowledge.udacity.com/questions/293047
    searchResults = () => {
        const query = this.state.query

        query === ''
            ? this.setState(() => ({results: []}))
            : BooksAPI.search(query)
        .then((results)=> {
            if (results.length > 0 && !results.error){
                this.setState(() => ({
                    results
                }))
            }
            else this.setState(() => ({results: []}))
        }
        )
            } 
    render() {
        const { books, updateShelf, remove } = this.props
        const { query, results } = this.state
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event)=>this.handleChange(event.target.value)}
                    />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                    {results.map((result, index) => (
                        <Book
                                key={index}
                                id={result.id}
                                title = {result.title}
                                author = {[result.authors]}
                                image = {result.imageLinks !== undefined ? result.imageLinks.thumbnail : null}
                                curShelf = {books.find((book) => book.title === result.title) ? books.find((book) => book.title === result.title).shelf : 'none'}
                                moveBook = {updateShelf}
                                remove = {remove}
                        />
                  ))}
                  
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks