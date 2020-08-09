import lottie from "lottie-web/build/player/lottie.js";

const hideElement = function (elements) {
    if(elements.constructor === Array){
        elements.forEach(element => {
            this.state.svgObj[element] ? 
                _hideElements(this.state.svgObj[element].childNodes) : 
                _throwLayerError(element);
            
        })
    } else {
        this.state.svgObj[elements] ? 
            _hideElements(this.state.svgObj[elements].childNodes) :
            _throwLayerError(elements);
    }
}

const showElement = function (elements) {
    if(elements.constructor === Array){
        elements.forEach(element => {
            this.state.svgObj[element] ? 
                _showElements(this.state.svgObj[element].childNodes) :
                _throwLayerError(element);
        })
    } else {
        this.state.svgObj[elements] ? 
            _showElements(this.state.svgObj[elements].childNodes) :
            _throwLayerError(elements);
    }
}

const setCursor = function (elements, cursor="pointer") {
    if (elements.constructor === Array){
        elements.forEach(element => {
            this.state.svgObj[element] ? 
                this.state.svgObj[element].setAttribute("cursor", cursor) :
                _throwLayerError(element);
        })
    } else {
        this.state.svgObj[elements] ? 
            this.state.svgObj[elements].setAttribute("cursor", cursor) :
            _throwLayerError(elements);
    }
}

// Adds click 'event' to the 'elements' passed in
const setEvent = function (elements, event) {
    if (elements.constructor === Array){
        elements.forEach(element => {
            this.state.svgObj[element] ? 
                this.state.svgObj[element].addEventListener("click", event) :
                _throwLayerError(element);
        });
    } else {
        this.state.svgObj[elements] ? 
            this.state.svgObj[elements].addEventListener("click", event) :
            _throwLayerError(elements);
    }
}

const appendAnimation = function (animationData, elem, autoplay=true, loop=true) {
    return lottie.loadAnimation({
        container: elem,
        renderer: 'svg',
        loop,
        autoplay,
        animationData
    });
}

//-- Helper Functions --\\

function _hideElements (elements) {
    for (var i = 0; i < elements.length; i++){
        let x = elements[i].style;
        // if (x) x["fill-opacity"]="0";
        if (x) x["visibility"]="hidden";
    }
}

function _showElements (elements) {
    for (var i = 0; i < elements.length; i++){
        let x = elements[i].style;
        // if (x) x["fill-opacity"]="1";
        if (x) x["visibility"]="visible";
    }
}

function _throwLayerError (element) {
    console.error("You are missing this element: ", element)
}

export { hideElement, showElement, setCursor, setEvent, appendAnimation };