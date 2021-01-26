// Declare empty array for upcoming episodes:
var dateArr = [];
// Declare empty array for favourites:
var favArr = [];

var localStorageObj = {};

var localStorageName = 'group2-SaveTv-items';

// get html element to print calendar:
var localUlElement = document.querySelector("ul", "#search-history");

var localFavDiv = document.getElementById("my-favs");  

// load from storage function
var loadFromLocalStorage = function() {
    // dateArr = JSON.parse(localStorage.getItem(localStorageName));
    // Store both arrays as object:
    
    localStoreObj = JSON.parse(localStorage.getItem(localStorageName));
    
    if(localStoreObj){
        dateArr = localStoreObj.dateArray ? localStoreObj.dateArray : [];
        favArr = localStoreObj.favArrray ? localStoreObj.favArrray : [];
    }else{
        dateArr = [];
        favArr = [];
    }
    localStoreObj = {
        dateArray: dateArr,
        favArrray: favArr
    };
    // console.log(localStorageObj);
};

// save to storage function
var saveToLocalStorage = function() {
    localStoreObj.dateArray = dateArr;
    localStoreObj.favArrray = favArr;
    
    localStorage.setItem(localStorageName, JSON.stringify(localStoreObj));
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
                    window.location.reload();
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
    .catch(function(error) {
        alert('Unable to connect From Local storage');
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
        liDateEl.className = "accordion-item";
        liDateEl.setAttribute("data-accordion-item", "");

        var aEl = document.createElement("a");
        aEl.setAttribute("href", "#");
        aEl.className="accordion-title";
        
        aEl.textContent = date;
        // append date li element to ul:
        //localUlElement.appendChild(aEl);
        liDateEl.append(aEl);

        // show episodes details into li:
        for( var j=1; j<dateArr[i].length; j++){
            
            // create anchor tag for episode link:
            anEpiLink = document.createElement("a");
            anEpiLink.setAttribute("href", dateArr[i][j].objUrl);
            anEpiLink.textContent="See Episode";
            anEpiLink.setAttribute("target", '_blank');

            divTabEl = document.createElement("div");
            divTabEl.className = "accordion-content";
            divTabEl.setAttribute("data-tab-content", "");
            divTabEl.textContent = "Series Name: " + dateArr[i][j].objSeriesName 
            + ", Episode Name: " + dateArr[i][j].objEpisodeName + ", Time: " + dateArr[i][j].objTime 
            + ", Link: ";
            divTabEl.appendChild(anEpiLink);
            liDateEl.appendChild(divTabEl);

            // append episodes details in UL:
            //localUlElement.appendChild(liCalEl);
        }
        localUlElement.appendChild(liDateEl);
    }
}

// Add to Calendar Button Handler:
var saveBtnHandlerLocalStorage=function(nextEpisodeUrl, seriesName){
    localStorageCall(nextEpisodeUrl, seriesName);
}

// Check if series is already saved in Favourites
var checkIfFavExists = function(favName){
    for(var i=0; i<favArr.length; i++){
        if(favName == favArr[i][0]){
            return true;
        }
    }
    return false;
}

// Push to Favourtire array:
var pushtoFavArray = function(name, url, image){
    // if series name is not already saved:
    if(!checkIfFavExists(name)){
        // create and save data to temporary series info array:
        var tempArr = [];
        tempArr = [
            objName = name,
            ObjUrl = url,
            ObjImage = image
        ]
        // save the series info
        favArr.push(tempArr);
    }else{
        console.log("Fav show already exists");
    }
    saveToLocalStorage();
    window.location.reload();
}

// Add to Favourites:
var addFavHandlerLocalStorage = function(url){
    loadFromLocalStorage();
    fetch(url)
    .then(function(response) {
        
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                pushtoFavArray(data.name, data.url, data.image.medium);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Unable to connect From Local storage');
    });
}

var showFavouritesInfo = function(){
    loadFromLocalStorage();

    var containerDiv = document.createElement("div");
    containerDiv.className = "grid-x grid-margin-x small-up-1 medium-up-3 large-up-5 text-center align-center";
    
    for(var i=0; i<favArr.length; i++){
        var favName = favArr[i][0];
        var favUrl = favArr[i][1];
        var favImg = favArr[i][2];

        var calloutDiv = document.createElement("div");
        calloutDiv.className="callout";

        // img element:
        var img = document.createElement("img");
        img.setAttribute("src", favImg);

        // p element:
        var pEl = document.createElement("p");
        pEl.className="lead";
        pEl.textContent=favName;

        // Cell anchor element:
        var anchorEl = document.createElement("a");
        anchorEl.setAttribute("href", favUrl);
        anchorEl.setAttribute("target", "_blank");
        anchorEl.className="cell";

        //append all to calloutDiv:
        calloutDiv.appendChild(img);
        calloutDiv.appendChild(pEl);

        // Append to container div
        anchorEl.appendChild(calloutDiv);
        containerDiv.appendChild(anchorEl);
        localFavDiv.appendChild(containerDiv);
    }
    
}

showCalendarInfo();
showFavouritesInfo();