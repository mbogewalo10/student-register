
import React, { Component } from 'react'

export class Profilecard extends Component {

    render() {
        return (
            <div class="card-container">
            <img className="round " src={"https://studentregisterapp.herokuapp.com/" + this.props.studentimage} alt="img" />
            <h5>{this.props.firstname} {this.props.lastname} </h5>
            <h6>{this.props.school}</h6>
            <p>{this.props.title}  </p>
            <div class="buttons">
                <button class="primary">
                    {this.props.contact}
                </button>
            </div>
        </div>
                 
        )
    }
}

export default Profilecard;