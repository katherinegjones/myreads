import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'
//import Book from './Book'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    this.updateBooks()
  }

  updateBooks = () => {
    BooksAPI.getAll()
      .then((results) => (
        this.setState(() => (
          {
          books: results.map((result) => {
            const obj = {}
            obj.bookId = result.id;
            obj.author = [...result.authors];
            obj.title = result.title;
            obj.shelf = result.shelf;
            obj.image = result.imageLinks !== undefined ? result.imageLinks.thumbnail : null
            return obj;
        })
      }))
      ))
  } 
  removeBook = (title) => {// remove book from UI only
    this.setState((curState) =>(
      {
        books: curState.books.filter((bk) => {
          return bk.title !== title
        })
      }
    ))
  }

  getBook = (book) => {
    BooksAPI.get(book)
  }

  moveBook = (book, shlf) => {
    /*
    this.setState((curState) =>({ //Found method for deep update here : https://stackoverflow.com/a/43639228
      books: curState.books.map((bk) => bk.id === book.id ? {...bk, shelf: {shlf}} : bk)
    }))*/
    BooksAPI.update(book, shlf)
      .then(results=>console.log(results))
      .then(() => this.updateBooks())
  }

  render() {
    BooksAPI.search('to')
      .then((results) => console.log(results  ))
    return (
      <div className="app">
        <Route exact path='/' render={() => (

          <BookShelves className='bookshelves-page'
            books={this.state.books}
            updateShelf={this.moveBook}
            remove={this.removeBook}
        
          />
    )
    }/>
        <Route path='/search' render ={({history}) =>
          <SearchBooks className='search-books-page'
              books={this.state.books} 
              updateShelf={this.moveBook}
              remove={this.removeBook}
              onNavigate={()=> {
                history.push('/')
              }}
            />
    }/>
    
        
      </div>
    )
  }
}

export default BooksApp
