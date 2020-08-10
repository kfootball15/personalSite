import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import base from "./assets/base.svg";
import { useEventListener } from '../../helpers';
import { hideElement, showElement, setCursor, appendAnimation } from "../../services/svgEdit.js";
import character from './assets/character.json';
// import snow from './assets/snow.json';

function DoodleDisplay () {
    const classes = useStyles();
    const svgRef = useRef(null);
    const [svgElem, setSvgElem] = useState(null);
    const [svgReady, setSvgReady] = useState(false);
    const [svgInitialized, setSvgInitialized] = useState(false);
    const [doodle, setDoodleState] = useState({
        lightsOn: false,
        inkOn: false,
        rainEffectOn: false,
        characterOn: false,
    });

    const toggleInk = useCallback( () => {
        console.log("toggleInk", doodle.inkOn)
        let elements = ['m_desk_ink', 'm_chair_ink', 'm_character_ink', 'm_wall_ink'];
        doodle.inkOn ? showElement(elements, svgElem) : hideElement(elements, svgElem);
        setDoodleState(prevState => ({ ...prevState, inkOn: !doodle.inkOn }));
    }, [doodle.inkOn, svgElem])

    const toggleLights = useCallback( () => {
        let elements = ['m_desk_lamp_on', 'm_lamp_lamp_on', 'm_chair_lamp_on', 'm_wall_lamp_on', 'm_character_torso_lamp_on', 'm_character_arm_right_lamp_on'];
        doodle.lightsOn ? showElement(elements, svgElem) : hideElement(elements, svgElem);
        setDoodleState({ ...doodle, lightsOn: !doodle.lightsOn });
    }, [doodle, svgElem])

    const toggleRainEffect = useCallback( () => {
        console.log("toggleRainEffect", doodle.rainEffectOn)
        let elements = ['m_rain-effect_color', 'm_rain-effect_ink'];
        doodle.rainEffectOn ? showElement(elements, svgElem) : hideElement(elements, svgElem);
        setDoodleState(prevState => ({ ...prevState, rainEffectOn: !doodle.rainEffectOn }))
    }, [doodle.rainEffectOn, svgElem])

    const toggleCharacter = useCallback( () => {
        console.log("toggleCharacter", doodle.characterOn)
        let elements = ['m_character_color', 'm_character_ink', 'm_character_lamp_on'];
        doodle.characterOn ? showElement(elements, svgElem) : hideElement(elements, svgElem);
        setDoodleState(prevState => ({ ...prevState, characterOn: !doodle.characterOn }))
    }, [doodle.characterOn, svgElem])

    const initInitialSvgState = useCallback( () => {
        toggleRainEffect();
        toggleLights();
        toggleCharacter();
        setCursor(['m_lamp_lamp_off', 'm_lamp_lamp_on'], svgElem);
        setSvgReady(true);
        // lottie.play()
    }, [svgElem, toggleCharacter, toggleLights, toggleRainEffect]);

    useEffect(() => {
        window.onload = () => { // You must wait for window to load to ensure that the svg elements have been rendered
            let a = svgRef.current; // Get the Object by ref
            let svgElement = a.contentDocument; // Get the SVG document inside the Object tag
            appendAnimation(character, svgElement.getElementById('m_desk_ink')); // store the return value to play/pause with lottie
            // appendAnimation(snow, svgElement.getElementById('m_wall_ink'));
            setSvgElem(svgElement);
            setSvgInitialized(true);
        };
    }, [])

    useEffect(() => {
        if (svgInitialized && !svgReady) initInitialSvgState();
    }, [svgInitialized, svgReady, initInitialSvgState])

    /** Append event listeners - @TODO this currently throws some errors until svgElem is initialized*/
    useEventListener('click', toggleLights, svgElem && svgElem.getElementById('m_lamp_lamp_off'));
    useEventListener('click', toggleLights, svgElem && svgElem.getElementById('m_lamp_lamp_on'));

    return (
        <div className="doodle-wrapper" >
            {
                !svgReady && <div>LOADING</div>
            }
            {/* NOTE: For better performance consider svg-url-loader for svgs instead of url-loader BUT had trouble with manipulation there*/}
            {/* <object ref={svgRef} id="temp" data={`data:image/svg+xml;charset=UTF-8,${base}`} type="image/svg+xml"></object> */}
            {/* { state.svgReady && <object ref={svgRef} id="temp" data={`${base}`} type="image/svg+xml"></object> } */}
            <object
                ref={svgRef}
                className={ `${
                    classes.doodle
                } ${
                    classes.animatedFade
                } ${
                    svgReady
                        ? classes.show
                        : classes.hide
                }` }
                id="temp"
                data={`${base}`}
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Doodle
            </object>

            <div className={classes.testButtons}>

                <button onClick={ () => {
                    toggleLights();
                }}>Toggle Lights</button>

                <button onClick={ () => {
                    toggleRainEffect();
                }}>Toggle Rain</button>
                
                <button onClick={ () => {
                    toggleInk();
                }}>Toggle Ink</button>
                
                <button onClick={ () => {
                    toggleCharacter();
                }}>Toggle Character</button>

            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    doodle: {
        transition: theme.transitions.create(['opacity']),
    },
    animatedFade: {
        '-webkit-transition': 'opacity 2s', /* Safari */
        transition: 'opacity 2s'
    },
    show: {
        opacity: 100,
        filter: 'alpha(opacity=100)'
    },
    hide: {
        opacity: 0,
        filter: 'alpha(opacity=0)'
    },
    testButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        '& button': {
            color: '#fff',
            background: 'rgb(83, 83, 83)',
            borderRadius: 50,
            height: 100,
            width: 100,
        }
    }
}))

export default DoodleDisplay;