import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./assets/baseDrawing.svg";

console.log("run");

class DoodleDisplay extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="doodle" >
                <img src={`${this.props.doodle}`} />
                <div className="testButtons">
                    <button>Night</button>
                </div>
            </div>
        )
    }
}

export default connect()(DoodleDisplay);