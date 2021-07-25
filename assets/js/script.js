// Need a function with the current date at the top
var currentDate = document.getElementById("currentDay");

var getCurrentDate = function(){
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    currentDate.innerHTML = currentDay;

};




 
window.addEventListener("load", function(){
    var container = document.getElementById("timeBlockContainer");
    var timesAvailable = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    for (i = 0; i < timesAvailable.length; i++) {
        container.appendChild(buildTimeBlock(timesAvailable[i]));
    }

    getCurrentDate();
});
 
 
 
 
 
// function for the color coding of the timeblocks
// if its the current hour set it to present css style
// if its before the current hour it is the past css style
// if its after the current hour make it future css style
// anything else make white
var buildTimeBlock = function(timeSlot){
    var nr = document.createElement('div');
    nr.classList.add("row");
    var col1 = document.createElement('div');
    col1.classList.add("col-1");
    var col2 = document.createElement('div');
    col2.classList.add("col-10");
    if (setBlockColors(timeSlot) == "past"){
        col2.classList.add("past");
    } else if (setBlockColors(timeSlot) == "present") {
        col2.classList.add("present");
    } else {
        col2.classList.add("future");
    }
    var col3 = document.createElement('div');
    col3.classList.add("col-1");
    var nBtn = document.createElement("button");
    nBtn.id = "btn" + timeSlot;
    nBtn.classList.add("saveBtn");
    nBtn.textContent = "Save";
    nBtn.addEventListener("click", function(){
        var eventElement = {
            eventTime: timeSlot,
            eventTitle: nTxt.value
        };
        saveEvent(eventElement);
    });
    col3.appendChild(nBtn);
    var nTxt = document.createElement("input");
    
    nTxt.type="text";
    nTxt.id="txt" + timeSlot;
    currentEventData = getEvent(timeSlot);
    if (currentEventData != null){
        nTxt.value = currentEventData.eventTitle;
    }
    col2.appendChild(nTxt);
    var timeText = document.createTextNode(formatTimeText(timeSlot));
    col1.appendChild(timeText);
    nr.appendChild(col1);
    nr.appendChild(col2);
    nr.appendChild(col3);
    return nr;
};
 
 
var setBlockColors = function(blockTime){
    var currentHour = new Date().toLocaleString('en-US', {hour: 'numeric', hour12:  false});
    if (blockTime < currentHour){
        return "past"
    } else if (blockTime == currentHour) {
        return "present"
    } else {
        return "future"
    };
}
 
var formatTimeText = function(timeText){
    if (timeText == 13) {
        return "1 PM"
    } else if (timeText == 14) {
        return "2 PM"
    } else if (timeText == 15) {
        return "3 PM"
    } else if (timeText == 16) {
        return "4 PM"
    } else if (timeText == 17) {
        return "5 PM"
    } else if (timeText == 12) {
        return "12 PM"
    } else {
        return timeText + "AM"
    }
    
};
 

 
 
// save task function
var saveEvent = function(eventElement){
 
    if (localStorage.getItem("eventData") == null){
        var newArray = []
        newArray.push(eventElement)
        localStorage.setItem("eventData", JSON.stringify(newArray));
    } else {
        //array already exists in storage check to see if this time slot already has data
        var currentEventData = JSON.parse(localStorage.getItem("eventData"))
        var dataExists = false;
        var dataAtIndex
        for (i = 0; i < currentEventData.length; i++){
            if (currentEventData[i].eventTime == eventElement.eventTime){
                dataExists = true;
                dataAtIndex = i;
            }; 
        }
        if (dataExists){
            var existingData = currentEventData[dataAtIndex];
            existingData.eventTitle = eventElement.eventTitle;
        } else {
            currentEventData.push(eventElement);
        }
        localStorage.setItem("eventData", JSON.stringify(currentEventData));
    }
}
 
//get existing events from localStorage
var getEvent = function(timeSlot){
    var eventData = JSON.parse(localStorage.getItem("eventData"));
    if (eventData == null) {
        return null
    } else {
        for (x = 0; x < eventData.length; x++){
            if (eventData[x].eventTime == timeSlot){
                return eventData[x]
            } 
        }
    }
 
 
}


 
// local storage needs to save events in scheduler on screen after refresh
 