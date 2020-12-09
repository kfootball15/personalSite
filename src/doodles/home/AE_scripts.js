// Night Lights

/**
 * To apply
 * Select a Layer
 * Open a group
 * Open its transform and alt + click the opacity clock thingy
 * Paste in the below expression 
 * Right click Opacity and select "Copy Only Expression"
 * Select all other groups by draggin a selection box around them
 * Paste (cmd + v) --> should apply expression to correct property for all selected layers
 * 
 * To render for body movin
 *      Copy the layer to save yourself some time in case you have to change the expression
 *      Select all of the Opacity layers Right click and select keyframe assistant > click "Convert expression to Keyframes"
 *      
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



/**
 * Reduce Keyframes (JF)
 *      Hits a keyframe, deletes all equivalent keyframes until it hits a keyframe with a different value, repeats
 * This is a script that has to be copy pasted into this Directory as an extend script file:
 *      C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\Scripts
 * Just copy an exist script - open the copy in VScode, and replace contents with the script below
 * Then restart After Effects adn the script should be available in file > scripts
 * 
 * To use:
 *      Select the Layer property you want to reduce (can select as many layers as you want)
 *      Run the script (file > scripts > Reduce Keyframes (JF) )
 *      Wait :)
 *      Afterwards, you may have to select all keyframes and select "Toggle Hold" if you want keyframes to change one frame to the next instead of transitioning over many keyframes
 */
var activeItem = app.project.activeItem;

if (activeItem != null && activeItem instanceof CompItem) {
	var selectedProps = activeItem.selectedProperties;
	var y;
	
	app.beginUndoGroup("Remove Duplicate Keys");
	for (var x = 0; x < selectedProps.length; x++) {

		if (selectedProps[x].numKeys > 1) {		
			y = 1;
			while (y < selectedProps[x].numKeys) {
				if (selectedProps[x].keyValue(y).toString() == selectedProps[x].keyValue(y+1).toString()) {
					selectedProps[x].removeKey(y+1);
				} else {	
					y ++;
				}
			}
		}
	}
	app.endUndoGroup();
}