import lottie from "lottie-web/build/player/lottie.js";

const hideElement = function (elements, svgElem) {
    if(elements.constructor === Array){
        elements.forEach( elementName => {
            const element = svgElem.getElementById(elementName);
            element
                ? _hideElements(element.childNodes)
                : _throwLayerError(elementName);
        })
    } else {
        const element = svgElem.getElementById(elements);
        element
            ? _hideElements(element.childNodes)
            : _throwLayerError(elements);
    }
};

const showElement = function (elements, svgElem) {
    if(elements.constructor === Array){
        elements.forEach( elementName => {
            const element = svgElem.getElementById(elementName);
            element
                ? _showElements(element.childNodes)
                : _throwLayerError(elementName);
        })
    } else {
        const element = svgElem.getElementById(elements);
        element ?
            _showElements(element.childNodes) :
            _throwLayerError(elements);
    }
};

const transitionFill = function (elements, svgElem, color, duration=1, ease=0, transitionTimingFunction='ease-in') {
    if(elements.constructor === Array){
        elements.forEach( elementName => {
            const element = svgElem.getElementById(elementName);
            element
                ? _transitionFill(element.childNodes, color, duration, ease, transitionTimingFunction)
                : _throwLayerError(elementName);
        })
    } else {
        const element = svgElem.getElementById(elements);
        element
            ? _transitionFill(element.childNodes, color, duration, ease, transitionTimingFunction)
            : _throwLayerError(elements);
    }
};

const fillElement = function (elements, svgElem, color) {
    if(elements.constructor === Array){
        elements.forEach( elementName => {
            const element = svgElem.getElementById(elementName);
            element
                ? _fillElements(element.childNodes, color)
                : _throwLayerError(elementName);
        })
    } else {
        const element = svgElem.getElementById(elements);
        element
            ? _fillElements(element.childNodes, color)
            : _throwLayerError(elements);
    }
};

const setCursor = function (elements, svgElem, cursor="pointer") {
    if (elements.constructor === Array){
        elements.forEach( elementName => {
            const element = svgElem.getElementById(elementName);
            element
                ? element.setAttribute("cursor", cursor)
                : _throwLayerError(elementName);
        })
    } else {
        const element = svgElem.getElementById(elements);
        element
            ? element.setAttribute("cursor", cursor)
            : _throwLayerError(elements);
    }
};

// Adds click 'event' to the 'elements' passed in
// const setEvent = function (elements, svgRef, event) {
//     // let a = svgRef.current; // Get the Object by ref
//     let svgElem = svgRef.contentDocument;
//     if (elements.constructor === Array){
//         elements.forEach(element => {
//             svgElem.getElementById(element) ?
//                 svgElem.getElementById(element).addEventListener("click", event) :
//                 _throwLayerError(element);
//         });
//     } else {
//         svgElem.getElementById(elements) ?
//             svgElem.getElementById(elements).addEventListener("click", event) :
//             _throwLayerError(elements);
//     }
// }

const appendAnimation = function (animationData=null, elem, autoplay=true, loop=true) {
    console.log("elem", animationData)
    return lottie.loadAnimation({
        container: elem,
        renderer: 'svg',
        loop,
        autoplay,
        animationData
    });
};

//-- Helper Functions --\\

function _hideElements (elements) {
    for (var i = 0; i < elements.length; i++){
        let x = elements[i].style;
        // if (x) x["fill-opacity"]="0";
        if (x) x["visibility"]="hidden";
    }
};

function _showElements (elements) {
    for (var i = 0; i < elements.length; i++){
        let x = elements[i].style;
        // if (x) x["fill-opacity"]="1";
        if (x) x["visibility"]="visible";
    }
};

function _fillElements (elements, color) {
    for (var i = 0; i < elements.length; i++){
        if (elements[i].tagName === 'g') {
            _fillElements(elements[i].childNodes, color)
        } else {
            let x = elements[i].style;
            if (x) x["fill"] = color;
        }
    }
};

function _transitionFill (elements, color, duration, ease, transitionTimingFunction) {
    for (var i = 0; i < elements.length; i++){
        if (elements[i].tagName === 'g') {
            _transitionFill(elements[i].childNodes, color, duration, ease, transitionTimingFunction);
        } else {
            let x = elements[i].style;
            if (x) {
                x["transition"] = `fill ${duration}s ${transitionTimingFunction} ${ease}s`;
                _fillElements(elements, color)
            }
        }
    }
};

function _throwLayerError (element) {
    console.error("You are missing this element: ", element)
};

export { hideElement, showElement, fillElement, transitionFill, setCursor, appendAnimation };