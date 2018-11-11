import React, { Component } from 'react';
import { connect } from 'react-redux';
import base from "./assets/base.svg";
import { deconstruct } from "../../services/svgDeconstructor.js";
import { hideElement, showElement, setCursor } from "../../services/svgEdit.js";

class DoodleDisplay extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.state = { 
            svgReady: false,
            svgObj: {},
            svgElem: null,
            lightsOn: false,
            rainEffectOn: false 
        };
        this.initInitialSvgState = this.initInitialSvgState.bind(this);
        this.toggleLights = this.toggleLights.bind(this);
        this.toggleRainEffect = this.toggleRainEffect.bind(this);
        this.setEvent = this.setEvent.bind(this); 
        this.setCursor = setCursor.bind(this); //bound from my service, not really necessary... 
    }
    componentDidMount (){
        // let node = this; //capture DoodleDisplay component instance
        window.onload = () => { // You must wait for window to load to ensure that the svg elements have been rendered
            var a = this.svgRef.current; // Get the Object by ref
            var svgElem = a.contentDocument; // Get the SVG document inside the Object tag
            var svgObj = deconstruct(svgElem, 'm_'); // return an object with the layers broken out and camel cased
            this.setState(state => ({
                svgObj,
                svgElem
            }), () => {
                console.log("Your svg Object:", this, this.state.svgObj)
                this.initInitialSvgState()
            });
        };
    }
    initInitialSvgState () {
        this.toggleRainEffect();
        this.toggleLights();
        this.setEvent([this.state.svgObj.mLampLampOff, this.state.svgObj.mLampLampOn], this.toggleLights)
        this.setCursor([this.state.svgObj.mLampLampOff, this.state.svgObj.mLampLampOn], 'pointer')
        this.setState(state => ({ svgReady: true }))
    }
    setEvent (elements, event) {
        // TODO: See if there is a way to get this function into the svgEdit service so that it can be reused easily
        elements.forEach(function(element){
            element.addEventListener("click", event);
        })
    }
    toggleLights () {
        let elements = [this.state.svgObj.mDeskLampOn, this.state.svgObj.mLampLampOn, this.state.svgObj.mCharacterLampOn];
        this.state.lightsOn ? showElement(elements) : hideElement(elements);
        this.setState(state => ({ lightsOn: !state.lightsOn }))
    }
    toggleRainEffect () {
        let elements = [this.state.svgObj.mRainEffectColor, this.state.svgObj.mRainEffectInk];
        this.state.rainEffectOn ? showElement(elements) : hideElement(elements);
        this.setState(state => ({ rainEffectOn: !state.rainEffectOn }))
    }
    render () {
        return (
            <div className="doodle-wrapper" >
                {/* NOTE: For better performance consider svg-url-loader for svgs instead of url-loader BUT had trouble with manipulation there*/}
                {/* <object ref={this.svgRef} id="temp" data={`data:image/svg+xml;charset=UTF-8,${base}`} type="image/svg+xml"></object> */}
                {/* { this.state.svgReady && <object ref={this.svgRef} id="temp" data={`${base}`} type="image/svg+xml"></object> } */}
                <object ref={this.svgRef} className={ "doodle--animated-fade doodle" + (this.state.svgReady ? " doodle--show" : " doodle--hide") } id="temp" data={`${base}`} type="image/svg+xml"></object>
                
                <div className="testButtons">

                    <button onClick={ () => {
                        this.toggleLights();
                    }}>Toggle Lights</button>

                    <button onClick={ () => {
                        this.toggleRainEffect();
                    }}>Toggle Rain</button>

                </div>
            </div>
        )
    }
}

export default connect()(DoodleDisplay);