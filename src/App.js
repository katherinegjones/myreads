import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'

/*
* @description: represents entire application
* @constructor
*/
class BooksApp extends React.Component {
  state = {
    books: []
  }

  /*
  * @description: calls book update function when component loads
  */
  componentDidMount() {
    this.updateBooks()
  }
  /*
  * @description: calls getAll from API
  * @returns: {array} book objects populated from results of api call
  */

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
  
  /*
  * @description: removes selected book from books array
  * @param {string} title - title of selected book
  */
  removeBook = (title) => {// remove book from UI only
    this.setState((curState) =>(
      {
        books: curState.books.filter((bk) => {
          return bk.title !== title
        })
      }
    ))
  }


/*
* @description: update book array
* @param {object} book - object containing at very minimum the book 'id'
* @param {shlf} string - new shelf to place book on
*/
  moveBook = (book, shlf) => {
    BooksAPI.update(book, shlf)
      .then(results=>console.log(results))
      .then(() => this.updateBooks())
  }

  /*
  * @description: render both main app components: shelf page and search page
  * @returns {component} route components containing app components
  */
  render() {
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
