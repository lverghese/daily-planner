// Need a function with the current date at the top
var getCurrentDate = function() {
    var cDay = currentDate.getDate();
    var cMonth = currentDate.getMonth();
    var cYear = currentDate.getFullYear();

}

window.addEventListener("load", function() {
   var container = document.getElementById("timeBlockContainer");
    var timesAvailable = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    for (i = 0; i < timesAvailable.length; i+=1) {
        container.appendChild(buildTimeBlock(timesAvailable[i]));
    }
})



var buildTimeBlock = function(timeSlot) {
    var container = document.getElementById("timeBlockContainer")
    var nr = document.createElement("div");
    nr.classList.add("row");
    var col1 = document.createElement("div");
    col1.classList.add("col-1");
    var col2 = document.createElement('div');
    col2.classList.add("col-10")
    if (setBlockColors(timeSlot) == "past") {
        col2.classList.add("past");
    } else if (setBlockColors(timeSlot) == "present") {
        col2.classList.add("present");
    } else {
        col2.classList.add("future");
    };
    var col3 = document.createElement("div");
    col3.classList.add("col-1");
    var nBtn = document.createElement("button");
    nBtn.id = "btn" + timeSlot;
    nBtn.classList.add("add")
    nBtn.textContent="save"
    nBtn.addEventListener("click", function() {
        var eventData = {
            eventTime: timeSlot,
            eventTitle: nTxt.value
        }

    })
    col3.appendChild(nBtn);
    var nTxt = document.createElement("input")
    nTxt.type="text";
    nTxt.id="txt" + timeSlot;
    //TODO: handle adding existing data later
    col2.appendChild(nTxt);

    var timeText = document.createTextNode(formatTimeText(timeSlot));

    col1.appendChild(timeText);
    nr.appendChild(col1);
    nr.appendChild(col2);
    nr.appendChild(col3);
    return nr;
};



// function for the color coding of the timeblocks
// if its the current hour set it to present css style
// if its before the current hour it is the past css style
// if its after the current hour make it future css style
// anything else make white


var setBlockColors = function(blockTime) {
    var currentHour = new Date().toLocaleString('en-us', {hour: 'numeric', hour12: false});
    if (blockTime < currentHour) {
        return "past"
    } else if (blockTime == currentHour) {
        return "present"
    } else {
        return "future"
    };
}

var formatTimeText = function(timeText) {
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
        return "noon"
    } else {
        return timeText + "AM"
    }
};
// edit task function


// save task function
var saveEvent = function(eventElement) {
    if(localStorage.getItem("eventData") == null) {
        var newArray = []
        newArray.push(eventElement)
        localStorage.setItem("eventData", JSON.stringify(newArray));
    } else {
        var currentEventData = JSON.parse(localStorage.getItem("eventData"))
        currentEventDate.push(eventElement);
        localStorage.setItem(setItem("eventData", JSON.stringify(currentEventData)));
    }
}

// local storage needs to save events in scheduler on screen after refresh
