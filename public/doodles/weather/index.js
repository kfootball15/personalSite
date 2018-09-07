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
                {/* <img src={`${this.props.doodle}`} /> */}
               {/* This is how we might be able to inject SVG data directly onto the page for manipulation */}
                <img src={`data:image/svg+xml;${this.props.doodle}`} alt="Flag" />
                <div className="testButtons">
                    <button>Night</button>
                </div>
            </div>
        )
    }
}

export default connect()(DoodleDisplay);