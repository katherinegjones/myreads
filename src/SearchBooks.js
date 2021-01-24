import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        query: '',
        results: []
    }

    searchResults = (q) => BooksAPI.search(q)
        .then((search_results)=> 
            this.setState(() =>(
                {
                    results: search_results
                }
            ))
        ) 
    render() {
        const { books } = this.props
        const { query, results } = this.state
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event)=>this.searchResults(event.target.value)}
                    />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {results.map((result) => (
                      <Book
                        title = {result.title}
                        author = {result.author}
                        image = {result.image}
                        curShelf = {books.find((book) => book.title === result.title).curShelf}
                      ></Book>
                  ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks