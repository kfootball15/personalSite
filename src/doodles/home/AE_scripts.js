// Night Lights

/**
 * To apply
 * Select a Layer
 * Open a group
 * Open its transform and alt + click the opacity clock thingy
 * Paste in the below expression 
 * Clck Opacity
 * Richt click Opacity and select "Copy Only Expression"
 * Select all other groups by draggin a selection box
 * Paste
 * 
 * To render for body movin
 * Copy the layer to save yourself sometime in case you have to change the expression
 * Select all of the Opacity layers and click Covert expression to Keyframes or whatever
 */
seedRandom(index,true);
var curr;
var night = thisComp.marker.key('night').time;
var timeOn = thisComp.marker.key('lights on').time;
var timeOff = thisComp.marker.key('lights off').time;

if (time <= night) {
    curr = time > random(timeOn, night)
		? 100 : 0
} else {
    // throw new Error ("Random: " + value)
    if (value) {
        curr = time > random(night, timeOff)
            ? 0 : 100
    } else {
        curr = 0;
    }
}

curr;