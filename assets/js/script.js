// Need a function with the current date at the top
var getCurrentDate = function() {
    var cDay = currentDate.getDate();
    var cMonth = currentDate.getMonth();
    var cYear = currentDate.getFullYear();

}



// function for the color coding of the timeblocks
// if its the current hour set it to present css style
// if its before the current hour it is the past css style
// if its after the current hour make it future css style
// anything else make white
var getTimeBlocks = function() {
    var hour9Block = document.getElementById("hour9Block");
    var hour10Block = document.getElementById("hour10Block");
    var hour11Block = document.getElementById("hour11Block");
    var hour12Block = document.getElementById("hour12Block");
    var hour1Block = document.getElementById("hour1Block");
    var hour2Block = document.getElementById("hour2Block");
    var hour3Block = document.getElementById("hour3Block");
    var hour4Block = document.getElementById("hour4Block");
    var hour5Block = document.getElementById("hour5Block");


}

var setBlockColors = function(blockTime) {
    var currentHour = newDate().toLocalString('en-us', {hour: 'numeric', hour12: true});
    if (blockTime < currentHour) {
        return "past"
    } else if (blockTime == currentHour) {
        return "present"
    } else {
        return "future"
    }
}

// edit task function


// save task function
// local storage needs to save events in scheduler on screen after refresh
