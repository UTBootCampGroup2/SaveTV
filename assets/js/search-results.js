// ************************ From Rose ************************//
// global variables
var searchShowEl = document.querySelector("#search-show");
var searchInputEl = document.querySelector('#findlocate');
var searchFormEl = document.querySelector('.hero-search-filter-form');
var modalBox = document.querySelector(".modal-box");
var seriesName = "";

// create search result container
var resultContainerEl = document.createElement('div');
resultContainerEl.classList = 'result-container';
resultContainerEl.setAttribute('id', 'result-container');
modalBox.appendChild(resultContainerEl);

// Function for submiting search
var searchSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    // get value from input element
    seriesName = searchInputEl.value.trim();
    if (seriesName) {
      // clear old content from search input
      searchInputEl.value = '';
      // call function to fetch api
      getSeries(seriesName);
    } 
    else {
      // show there is no input value in search bar
      searchInputEl.removeAttribute('placeholder');
      searchInputEl.setAttribute('placeholder', 'Please enter a TV show');
    }
};

// Function for searching the series name entered in the input form element
var getSeries = function(seriesName) {
    // clear old content from modal
    while (resultContainerEl.firstChild) {
      resultContainerEl.removeChild(resultContainerEl.firstChild);
    }
    var apiUrl = "https://api.tvmaze.com/singlesearch/shows?q=" + seriesName;
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          // call function in search-auto-fill.js to display modal
          displayModal();
          // call function to display show details fetched from tvmaze api
          displaySeriesdata(data);
        });
      } 
      else {
        console.log('Error: ' + response.statusText);
        // display that the entered value is invalid
        searchInputEl.removeAttribute('placeholder');
        searchInputEl.setAttribute('placeholder', 'Please enter a valid TV show name');
      }
    })
    .catch(function(error) {
      console.log('Unable to connect');
    });
};

// Function for displaying the serached series information
var displaySeriesdata = function(series) {
  if(series != null){
    // create section for holding series data
    var seriesDataEl = document.createElement('div');
    seriesDataEl.className = 'series-data';
    seriesDataEl.setAttribute('id', 'series-data');
    resultContainerEl.appendChild(seriesDataEl);

    // display Image
    if(series.image != null && series.image.medium != null) {
      var imageEl = document.createElement('img');
      imageEl.className = ('search-image')
      imageEl.setAttribute("id", 'search-image');
      imageEl.setAttribute("src", series.image.medium);
      seriesDataEl.appendChild(imageEl);
    }
    
    // display name of the series
    if(series.name != null) {
      var nameEl = document.createElement('p');
      nameEl.className = ('search-name')
      nameEl.setAttribute("id", 'search-name');
      nameEl.textContent = series.name;
      seriesDataEl.appendChild(nameEl);
    }

    // display website
    if(series.officialSite != null) {
      var websiteEl = document.createElement('a');
      websiteEl.textContent = "Visit Website";
      websiteEl.className = ('search-website')
      websiteEl.setAttribute("id", 'search-website');
      websiteEl.setAttribute("href", series.officialSite);
      websiteEl.setAttribute("target", '_blank');
      seriesDataEl.appendChild(websiteEl);
    }

    // display schedule, savebutton and network or webchannel if show is running
    if(series.status === "Running") {
      // display network or webChannel
      var networkSearchEl = document.createElement('p');
      if(series.network != null) {
        networkSearchEl.className = ('search-network');
        networkSearchEl.setAttribute("id", 'search-network');
        networkSearchEl.textContent = series.network.name;
        seriesDataEl.appendChild(networkSearchEl);
      }
      else {
        var webChannelSearchEl = document.createElement('p');
        webChannelSearchEl.className = ('search-webchannel');
        webChannelSearchEl.setAttribute("id", 'search-webchannel');
        webChannelSearchEl.textContent = series.webChannel.name;
        seriesDataEl.appendChild(webChannelSearchEl);
      }

      // display schedule
      if(series.schedule.time != null) {
        var showDays = [];
        var showDays = series.schedule.days;
        for(var i=0; i <showDays.length; i ++) {
          var scheduleEl = document.createElement('p');
          scheduleEl.className = ('search-schedule')
          scheduleEl.setAttribute("id", 'search-schedule');
          scheduleEl.textContent = series.schedule.time + " "+ showDays[i];
          seriesDataEl.appendChild(scheduleEl);
        }
      }
/* 
Code Changed by Fazle:
*/    
      // if series is running show 'Remind' button to add to calendar
      if (typeof(series._links.nextepisode) !== 'undefined') {
        
        var seriesName = series.name;
        // add save button
        var saveButtonEl = document.createElement('button');
        saveButtonEl.className = 'save-button';
        saveButtonEl.setAttribute('id', 'save-button');
        saveButtonEl.setAttribute('type', 'button');
        saveButtonEl.innerHTML = "<i class='fa fa-search'></i>"
        var nexEpisodeUrl = series._links.nextepisode.href;
        saveButtonEl.textContent = "Add to Watch List";
        
        // var res = nexEpisodeUrl.slice('http');
        var res = nexEpisodeUrl.split("http");
        nexEpisodeUrl = 'https' + res[1];
        // call function in localstorage.js when save button is clicked
        saveButtonEl.setAttribute('onclick', 'saveBtnHandlerLocalStorage("' + nexEpisodeUrl + '", ' + '"' + seriesName + '")');
        seriesDataEl.appendChild(saveButtonEl);
      }
       
    }
    //display status and button for "ended" shows; schedule and network is not required in this case
    else {
      //display status if show has ended
      var statusEl = document.createElement('p');
      statusEl.className = ('search-status')
      statusEl.setAttribute("id", 'search-status');
      statusEl.textContent = "Status: " + series.status;
      seriesDataEl.appendChild(statusEl);
/* 
Code Changed by Fazle:
*/ 
      var saveButtonEl = document.createElement('button');
      saveButtonEl.className = 'save-button';
      saveButtonEl.setAttribute('id', 'save-button');
      saveButtonEl.setAttribute('type', 'button');
      saveButtonEl.innerHTML = "<i class='fa fa-search'></i>"
      saveButtonEl.textContent = "Add To Favourite";
      // call function in localstorage.js when save button is clicked
      var nexEpisodeUrl = series._links.self.href;
      var res = nexEpisodeUrl.split("http");
      nexEpisodeUrl = 'https' + res[1];

      saveButtonEl.setAttribute('onclick', 'addFavHandlerLocalStorage("' + series._links.self.href + '")');
      seriesDataEl.appendChild(saveButtonEl);

    }
    

    // display summary
    var summaryEl = document.createElement('div');
    summaryEl.className = 'search-summary';
    summaryEl.setAttribute('id', 'search-summary');
    summaryEl.innerHTML = series.summary;
    resultContainerEl.appendChild(summaryEl);

    // call function to get rating
    seriesRating(series.externals.imdb);
  }  
};

// Function for getting rating
var seriesRating = function(id) {

    var apiUrl = "https://www.omdbapi.com/?i=" + id + "&apikey=8f19b7dc";

    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            displayRating(data);
        });
        } else {
        console.log('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        console.log('Unable to connect');
    });
};

// Function to display rating
var displayRating = function(rating) {
  var ratingScore = 'Not available';
  var ratingSource = 'Internet Movie Database';
  if(rating.Response != "False"){
    ratingScore = rating.Ratings[0].Value;
    ratingSource = rating.Ratings[0].Source;
  }
  var ratingContainerEl = document.createElement('div');
  ratingContainerEl.className = 'rating-container';
  ratingContainerEl.setAttribute('id', 'rating-container');
  resultContainerEl.appendChild(ratingContainerEl);
  // display rating score
  var ratingEl = document.createElement('p');
  ratingEl.className = 'rating-score';
  ratingEl.setAttribute('id', 'rating-score');
  ratingEl.textContent = "Rating: " + ratingScore;
  ratingContainerEl.appendChild(ratingEl);
  // display rating source
  var sourceEl = document.createElement('span');
  sourceEl.className = 'rating-source';
  sourceEl.setAttribute('id', 'rating-source');
  sourceEl.textContent = " Source: " + ratingSource;
  ratingEl.appendChild(sourceEl);
};

// add event listener for search
searchFormEl.addEventListener('submit', searchSubmitHandler);