
// ************************ From Brandon ************************//
// fetching TV Maze API 
function searchShow(query) {
  var url = `http://api.tvmaze.com/search/shows?q=${query}`;
  console.log(url);

  fetch(url)
  // .then(response => response.json())
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    else{
      console.log('Unable to connect to tvmaze');
    }
  })
  .then((jsonData) => {
    
    // gets specific string from array
    if(jsonData != null){
      var movieInfoList =  jsonData.map((element) => ({
        movieId: element.show.id, 
        imgLink: element.show.image.medium
      }));
    }

    renderResults(movieInfoList);
  
    // displays error message in html
    document.getElementById("errorMessage").innerHTML = "";
      
  })
  .catch((error) => {
      document.getElementById("errorMessage").innerHTML = error;
  });
}

document.onclick = function (event) {
  event.preventDefault();
  var target = event.target;

  if (target.tagName.toLowerCase() === 'img') {
      console.log("img click test") //works
      console.log('event', event);

      var movieId = target.id;
      console.log(movieId);
      displayModal();
  }
}

// lists JSON objects on HTML 
function renderResults(movieInfoList) {
 var list = document.getElementById("resultsList");
 list.innerHTML="";
 movieInfoList.forEach(movieInfo => {

  // turns img string to img
     showImage(movieInfo);
 });
}

function showImage(movieInfo) {
  // creates img
  var img = document.createElement("img")
  // console.log(movieInfo);
  img.id = movieInfo.movieId;
  img.src = movieInfo.imgLink;
  
  //images will populate in <section>
  document.querySelector('section').appendChild(img);

}

function displayModal() {
  var modalBox = document.querySelector(".modal-box");
  modalBox.classList.add("activeInfo");

  var exitBtn = modalBox.querySelector(".quit");
  exitBtn.onclick = ()=>{
    modalBox.classList.remove("activeInfo");
  }
}

let searchTimeout = 0;

// automatically starts searching just from input of search bar
window.onload = () => {
  var searchField = document.getElementById("findlocate")
  searchField.onkeyup = (event) => {

      clearTimeout(searchTimeout);

      if(searchField.value.trim().length === 0) {
          return;
      }

      searchTimeout = setTimeout(() => {
        console.log(searchField.value.trim());
          searchShow(searchField.value.trim());
      }, 250);
      
  }
}

// ************************ From Rose ************************//
// global variables
var searchShowEl = document.querySelector("#search-show");
var searchInputEl = document.querySelector('#findlocate');
var searchFormEl = document.querySelector('.hero-search-filter-form');

// create search result container
var resultContainerEl = document.createElement('div');
resultContainerEl.classList = 'result-container';
resultContainerEl.setAttribute('id', 'result-container');
searchShowEl.appendChild(resultContainerEl);

// Function for submiting search
var searchSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var seriesName = searchInputEl.value.trim();
  
    if (seriesName) {
      getSeries(seriesName);
  
      // clear old content
      searchInputEl.value = '';
    } else {
      alert('Please enter a TV show');
    }
};

// Function for searching the series name entered in the input form element
var getSeries = function(seriesName) {

    // var apiUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + seriesName; // From Rose
    var apiUrl = "http://api.tvmaze.com/search/shows?q=" + seriesName;          // From Brandon
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        //console.log(response);
        response.json().then(function(data) {
          console.log("In getSeries: ");
          // console.log(data);
          // displaySeriesdata(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect');
    });
  
};

// Function for displaying the serached series information
var displaySeriesdata = function(series) {
  
  console.log(series);
  if(series != null){
    // create section for holding series data
    var seriesDataEl = document.createElement('div');
    seriesDataEl.className = 'series-data';
    seriesDataEl.setAttribute('id', 'series-data');
    resultContainerEl.appendChild(seriesDataEl);

    // display Image
    // console.log(series.image.medium);
    // var imageEl = document.createElement('img');
    // imageEl.className = ('search-image')
    // imageEl.setAttribute("id", 'search-image');
    // imageEl.setAttribute("src", series.image.medium);
    // seriesDataEl.appendChild(imageEl);

    // display name of the series
    console.log(series.name);
    var nameEl = document.createElement('p');
    nameEl.className = ('search-name')
    nameEl.setAttribute("id", 'search-name');
    nameEl.textContent = series.name;
    seriesDataEl.appendChild(nameEl);

    // display website
    //console.log(series.officialSite);
    var websiteEl = document.createElement('a');
    websiteEl.textContent = "Visit Website";
    websiteEl.className = ('search-website')
    websiteEl.setAttribute("id", 'search-website');
    websiteEl.setAttribute("href", series.officialSite);
    websiteEl.setAttribute("target", '_blank');
    seriesDataEl.appendChild(websiteEl);

    // display status or schedule
    if(series.status != 'Ended') {
      //console.log(series.schedule.time + series.schedule.days);

      var scheduleEl = document.createElement('p');
      scheduleEl.className = ('search-schedule')
      scheduleEl.setAttribute("id", 'search-schedule');
      scheduleEl.textContent = series.schedule.time + " "+ series.schedule.days;
    
      seriesDataEl.appendChild(scheduleEl);
    }
    else {
      //console.log(series.status);
      var statusEl = document.createElement('p');
      statusEl.className = ('search-status')
      statusEl.setAttribute("id", 'search-status');
      statusEl.textContent = "Status: " + series.status;
      seriesDataEl.appendChild(statusEl);
    }

    // add save button
    var saveButtonEl = document.createElement('button');
    saveButtonEl.className = 'save-button';
    saveButtonEl.setAttribute('id', 'save-button');
    saveButtonEl.setAttribute('type', 'button');
    saveButtonEl.innerHTML = "<i class='fa fa-search'></i>"
    saveButtonEl.textContent = "Save";
    seriesDataEl.appendChild(saveButtonEl);

    // display summary
    var summaryEl = document.createElement('div');
    summaryEl.className = 'search-summary';
    summaryEl.setAttribute('id', 'search-summary');
    summaryEl.innerHTML = series.summary;
    resultContainerEl.appendChild(summaryEl);

    // call function to get rating
    seriesRating(series.externals.imdb);
  }
  else{
    console.log("displaySeriesdata input is null");
  }
    
};

// Function for getting rating
var seriesRating = function(id) {

    var apiUrl = "http://www.omdbapi.com/?i=" + id + "&apikey=8f19b7dc";

    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            displayRating(data);
        });
        } else {
        alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Unable to connect');
    });
};

// Function to display rating

var displayRating = function(rating) {

    var ratingContainerEl = document.createElement('div');
    ratingContainerEl.className = 'rating-container';
    ratingContainerEl.setAttribute('id', 'rating-container');
    resultContainerEl.appendChild(ratingContainerEl);

    // display rating score
    console.log(rating.Ratings[0].Value);
    var ratingEl = document.createElement('p');
    ratingEl.className = 'rating-score';
    ratingEl.setAttribute('id', 'rating-score');
    ratingEl.textContent = rating.Ratings[0].Value;
    ratingContainerEl.appendChild(ratingEl);
  
    // display rating source
    console.log(rating.Ratings[0].Source);
    var sourceEl = document.createElement('span');
    sourceEl.className = 'rating-source';
    sourceEl.setAttribute('id', 'rating-source');
    sourceEl.textContent = " Source: " + rating.Ratings[0].Source;
    ratingEl.appendChild(sourceEl);
  
};

// add event listener for search
// searchFormEl.addEventListener('submit', searchSubmitHandler);