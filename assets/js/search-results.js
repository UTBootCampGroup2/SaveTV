// global variables
var searchShowEl = document.querySelector("#search-show");

// create search result container
var resultContainerEl = document.createElement('div');
resultContainerEl.classList = 'result-container';
resultContainerEl.setAttribute('id', 'result-container');
searchShowEl.appendChild(resultContainerEl);

// Function for searching the series name entered in the input form element
var getSeries = function(seriesName) {

    var apiUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + seriesName;
  
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        //console.log(response);
        response.json().then(function(data) {
          //console.log(data);
          displaySeriesdata(data);
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
  

    // create section for series data
    var seriesDataEl = document.createElement('div');
    seriesDataEl.className = 'series-data';
    seriesDataEl.setAttribute('id', 'series-data');
    resultContainerEl.appendChild(seriesDataEl);

    // display Image
    console.log(series.image.medium);
    var imageEl = document.createElement('img');
    imageEl.setAttribute("src", series.image.medium);
    seriesDataEl.appendChild(imageEl);
  
    // display name of the series
    console.log(series.name);
    var nameEl = document.createElement('p');
    nameEl.textContent = series.name;
    seriesDataEl.appendChild(nameEl);
    
    // display status or schedule
    if(series.status != 'Ended') {
      //console.log(series.schedule.time + series.schedule.days);
  
      var scheduleEl = document.createElement('p');
      scheduleEl.textContent = series.schedule.time + " "+ series.schedule.days;
     
      seriesDataEl.appendChild(scheduleEl);
    }
    else {
      //console.log(series.status);
      var statusEl = document.createElement('p');
      statusEl.textContent = "Status: " + series.status;
      seriesDataEl.appendChild(statusEl);
    }
  
    // add save button
    var saveButtonEl = document.createElement('button');
    saveButtonEl.className = 'save-button';
    saveButtonEl.setAttribute('id', 'save-button');
    saveButtonEl.setAttribute('type', 'button');
    saveButtonEl.textContent = "Save";
    seriesDataEl.appendChild(saveButtonEl);
  
    // get id
    //console.log(series.externals.imdb);
    //seriesRating(series.externals.imdb);
  
    // display website
    //console.log(series.officialSite);
    var siteEl = document.createElement('a');
    siteEl.textContent = "Visit Website";
    siteEl.setAttribute("href", series.officialSite);
    siteEl.setAttribute("target", '_blank');
    seriesDataEl.appendChild(siteEl);
  
    // display summary
    var summaryEl = document.createElement('div');
    summaryEl.innerHTML = series.summary;
    resultContainerEl.appendChild(summaryEl);
  };

// Function for getting rating

// Function to display rating

//call search
getSeries('yellowstone');

