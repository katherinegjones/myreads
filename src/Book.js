import React, { Component } from 'react'
import Selection from './Selection'

class Book extends Component {
    
    render() {
        const { author, title, image, curShelf } = this.props 
        return(
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
            <Selection thisShelf={curShelf}/>
          </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
      )
    }
}

export default Book