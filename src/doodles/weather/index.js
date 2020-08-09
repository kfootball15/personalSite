import React, { Component } from 'react';
import base from "./assets/base.svg";
import { deconstruct } from "../../services/svgDeconstructor.js";
import { hideElement, showElement, setCursor, setEvent, appendAnimation } from "../../services/svgEdit.js";
import character from './assets/character.json';

class DoodleDisplay extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.state = {
            svgReady: false,
            svgObj: {},
            svgElem: null,
            lightsOn: false,
            inkOn: false,
            rainEffectOn: false,
            characterOn: false, 
        };

        /* Must bind our library methods to our class so that we can access 'this' object inside the library */
        this.showElement = showElement.bind(this);
        this.hideElement = hideElement.bind(this);
        this.setCursor = setCursor.bind(this); 
        this.setEvent = setEvent.bind(this); 
        this.appendAnimation = appendAnimation.bind(this); 
    }
    componentDidMount () {
        // let node = this; //capture DoodleDisplay component instance
        window.onload = () => { // You must wait for window to load to ensure that the svg elements have been rendered
            let a = this.svgRef.current; // Get the Object by ref
            let svgElem = a.contentDocument; // Get the SVG document inside the Object tag
            let characterAnimation = this.appendAnimation(character, svgElem.getElementById('m_desk_ink'));
            // let snowAnimation = this.appendAnimation(snow, svgElem.getElementById('m_wall_ink'));
            let svgObj = deconstruct(svgElem, 'm_'); // return an object with the layers broken out and camel cased
            this.setState( () => ({
                svgObj,
                svgElem
            }), () => {
                this.initInitialSvgState()
            });
        };
    }
    initInitialSvgState = () => {
        this.toggleRainEffect();
        this.toggleLights();
        this.toggleCharacter();
        // this.toggleInk();
        this.setEvent(['mLampLampOff', 'mLampLampOn'], this.toggleLights);
        this.setCursor(['mLampLampOff', 'mLampLampOn']);
        this.setState(state => ({ svgReady: true }));
        // lottie.play()
    }
    toggleInk = () => {
        let elements = ['mDeskInk', 'mChairInk', 'mCharacterInk', 'mWallInk'];
        this.state.inkOn ? this.showElement(elements) : this.hideElement(elements);
        this.setState(state => ({ inkOn: !state.inkOn }));
    }
    toggleLights = () => {
        let elements = ['mDeskLampOn', 'mLampLampOn', 'mChairLampOn', 'mWallLampOn', 'mCharacterTorsoLampOn', 'mCharacterArmRightLampOn'];
        this.state.lightsOn ? this.showElement(elements) : this.hideElement(elements);
        this.setState(state => ({ lightsOn: !state.lightsOn }));
    }
    toggleRainEffect = () => {
        let elements = ['mRainEffectColor', 'mRainEffectInk'];
        this.state.rainEffectOn ? this.showElement(elements) : this.hideElement(elements);
        this.setState(state => ({ rainEffectOn: !state.rainEffectOn }))
    }
    toggleCharacter = () => {
        let elements = ['mCharacterColor', 'mCharacterInk', 'mCharacterLampOn'];
        this.state.characterOn ? this.showElement(elements) : this.hideElement(elements);
        this.setState(state => ({ characterOn: !state.characterOn }))
    }
    render () {
        return (
            <div className="doodle-wrapper" >
                {/* NOTE: For better performance consider svg-url-loader for svgs instead of url-loader BUT had trouble with manipulation there*/}
                {/* <object ref={this.svgRef} id="temp" data={`data:image/svg+xml;charset=UTF-8,${base}`} type="image/svg+xml"></object> */}
                {/* { this.state.svgReady && <object ref={this.svgRef} id="temp" data={`${base}`} type="image/svg+xml"></object> } */}
                <object 
                    ref={this.svgRef} 
                    className={ "doodle--animated-fade doodle" + (this.state.svgReady ? " doodle--show" : " doodle--hide") } 
                    id="temp" 
                    data={`${base}`} 
                    type="image/svg+xml"></object>

                <div className="testButtons">

                    <button onClick={ () => {
                        this.toggleLights();
                    }}>Toggle Lights</button>

                    <button onClick={ () => {
                        this.toggleRainEffect();
                    }}>Toggle Rain</button>
                    
                    <button onClick={ () => {
                        this.toggleInk();
                    }}>Toggle Ink</button>
                    
                    <button onClick={ () => {
                        this.toggleCharacter();
                    }}>Toggle Character</button>

                </div>
            </div>
        )
    }
}

export default DoodleDisplay;