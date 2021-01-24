// Declare empty array:
var dateArr = [];
var localStorageName = 'group2-SaveTv-items';

// get html element to print calendar:
var localUlElement = document.querySelector("ul", "#search-history");
// console.log(localUlElement);

// load from storage function
var loadFromLocalStorage = function() {
    dateArr = JSON.parse(localStorage.getItem(localStorageName));
    
    if (!dateArr) {
        dateArr = [];
    }
};

// save to storage function
var saveToLocalStorage = function() {
    localStorage.setItem(localStorageName, JSON.stringify(dateArr));
};

// push to array function
var pushToDateArray = function(date, time, series, episode, url){
    // create data structure of object:
    objData = {
        objTime : time,
        objSeriesName: series,
        objEpisodeName: episode,
        objUrl: url
    }

    // create empty temp array:
    var tempArr = [];
    tempArr = [
        date = date,
        Obj = objData
    ]
    
    
    // if date array is empty save temp array
    if(dateArr.length == 0){
        dateArr.push(tempArr);
    
    // if data exists in date array:
    }else{
        var position = checkIfDateExists(date);
        // if date already exists 
        if(position !== null){
            // check if already saved:
            var checkIfExists = checkIfEpisodeExists(episode, position);
            if(!checkIfExists){
                // save object inside this array
                dateArr[position].push(objData);
            }else{
                // console.log('already saved');
            }
            
        }else{
            // date donot exist create new array item :
            dateArr.push(tempArr);
        }
    } 
}

var checkIfDateExists = function(date){
    
    for(var i=0; i<dateArr.length; i++){
        if(date == dateArr[i][0]){
            return i;
        }
    }
    return null;
}

var checkIfEpisodeExists = function(epi, pos){
    for(var i=1; i<dateArr[pos].length; i++){
        if(dateArr[pos][i].objEpisodeName == epi){
            return true;
        }
    }
}

var localStorageCall = function(apiUrl, seriesName) {
    
    loadFromLocalStorage();
    fetch(apiUrl)
        .then(function(response) {
            
            if (response.ok) {
                response.json().then(function(data) {
                    var airDate = data.airdate;
                    var airTime = data.airtime;
                    var name = data.name;
                    var url = data.url;
                    pushToDateArray(data.airdate, data.airtime, seriesName, data.name, data.url);
                    saveToLocalStorage();
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
    .catch(function(error) {
        alert('Unable to connect');
    });
}

// load calendar information to html:
var showCalendarInfo = function(){
    // populate dateArr array from local storage:
    loadFromLocalStorage();

    // episodes date and details:
    for( var i=0; i<dateArr.length; i++){
        // get date value from array:
        var date = dateArr[i][0];

        // create list items to show date:
        liDateEl = document.createElement("li");
        liDateEl.className = "cal-date";
        liDateEl.textContent = date;
        // append date li element to ul:
        localUlElement.appendChild(liDateEl);

        // show episodes details into li:
        for( var j=1; j<dateArr[i].length; j++){
            
            // create anchor tag for episode link:
            anEpiLink = document.createElement("a");
            anEpiLink.setAttribute("href", dateArr[i][j].objUrl);
            anEpiLink.textContent="See Episode";
            anEpiLink.setAttribute("target", '_blank');

            liCalEl = document.createElement("li");
            liCalEl.className = "cal-details";
            liCalEl.textContent = "Series Name: " + dateArr[i][j].objSeriesName 
            + ", Episode Name: " + dateArr[i][j].objEpisodeName + ", Time: " + dateArr[i][j].objTime 
            + ", Link: ";
            liCalEl.append(anEpiLink);

            // append episodes details in UL:
            localUlElement.appendChild(liCalEl);
        }
    }
}
var saveBtnHandlerLocalStorage=function(nextEpisodeUrl, seriesName){
    localStorageCall(nextEpisodeUrl, seriesName);
    window.location.reload();
}

showCalendarInfo();
