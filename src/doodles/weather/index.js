import React, { Component } from 'react';
import { connect } from 'react-redux';
import baseDrawing from "./assets/baseDrawing.svg";

console.log("run", baseDrawing);

class DoodleDisplay extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="doodle" >
                {/* <img src={`${this.props.doodle}`} /> */}
               {/* This is how we might be able to inject SVG data directly onto the page for manipulation 
                        NOTE: For better performance consider svg-url-loader for svgs instead of url-loader
                    */}
                <img src={`data:image/svg+xml;${baseDrawing}`} alt="Flag" />
                <div className="testButtons">
                    <button>Night</button>
                </div>
            </div>
        )
    }
}

export default connect()(DoodleDisplay);