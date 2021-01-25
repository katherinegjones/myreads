import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

/*
* @description - Selection component containing drop-down menu
* @constructor
*/
class Selection extends Component {
    static propTypes = {
        thisShelf: PropTypes.string
    }

    /*
    * @description - call book update/remove function when selection is changed
    * @param {event} event - selection/onchange event
    */
    handleSelect = (event) => {
        this.props.bookUpdate(event.target.value)
    }

    /*
    * @description - render selection/dropdown element
    * @returns - html dropdown element
    */
    render() {
        const {  thisShelf } = this.props

        return(
            <div className="book-shelf-changer">
            <select value={thisShelf} onChange={this.handleSelect}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        )
    }
}

export default Selection