import React, { Component } from 'react'
//import { update } from './BooksAPI'
import Selection from './Selection'
import { PropTypes } from 'prop-types'

/*
* @description - single Book Component containing book information to display
* @constructor
*/
class Book extends Component {
    static propTypes = {
        author: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        curShelf: PropTypes.string
    }
    
    /*
    * @description - function to pass into Selection component; calls book update/removal method from main App
    * @param {string} value - value of option selected
    */
    handleChange = (value) => {
            if (value!=='none'){
                this.props.moveBook({id: `${this.props.id}`}, value)
            }
            else {this.props.removeBook(this.props.title)}
    }
    
    /*
    * @description - render this Book element
    * @returns - html elements plus Selection component
    */
    render() {
        const { author, title, image, curShelf } = this.props 
        return(
            <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
                <Selection 
                    thisShelf={curShelf}
                    bookUpdate={this.handleChange} 
                />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author.join(', ')}</div>
        </div>
      )
    }
}

export default Book