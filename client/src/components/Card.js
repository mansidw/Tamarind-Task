import "../assets/css/Gallery.css"
import React from 'react'

class Card extends React.Component {
    render() {
      return(
          <div className="card">
            <img src={this.props.url} />
            <div className="card-body">
              <h2>{this.props.name}</h2>
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              <h5>{this.props.author}</h5> */}
            </div>
          </div>
      )
    }
  }

  export default Card