// global variables

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

// Function for getting rating

// Function to display rating

//call search

