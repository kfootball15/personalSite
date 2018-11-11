const hideElement = function (toHide) {
    if(toHide.constructor === Array){
        toHide.forEach(function(element){
            _hideElements(element.childNodes)
        })
    } else {
        _hideElements(toHide.childNodes)
    }
}

const showElement = function (toHide) {
    if(toHide.constructor === Array){
        toHide.forEach(function(element){
            _showElements(element.childNodes)
        })
    } else {
        _showElements(toHide.childNodes)
    }
}

const setCursor = function (elements, cursor) {
    elements.forEach(element => {
        element.setAttribute("cursor", cursor);
    })
}

//-- Helper Functions --\\

function _hideElements (elements) {
    for (var i = 0; i < elements.length; i++){
        let x = elements[i].style;
        if (x) x["fill-opacity"]="0";
    }
}

function _showElements (elements) {
    for (var i = 0; i < elements.length; i++){
        let x = elements[i].style;
        if (x) x["fill-opacity"]="1";
    }
}

export { hideElement, showElement, setCursor };