// Global variables
var date = moment().format('YYYY-MM-DD');

var featuredImageEl0 = document.getElementById('image0');
var featuredwebEl0 = document.getElementById('web0');
var featuredDetailsEl0 = document.getElementById('details0');
var featuredShowName0 = null;

var featuredImageEl1 = document.getElementById('image1');
var featuredwebEl1 = document.getElementById('web1');
var featuredDetailsEl1 = document.getElementById('details1');
var featuredShowName1 = null;

var featuredImageEl2 = document.getElementById('image2');
var featuredwebEl2 = document.getElementById('web2');
var featuredDetailsEl2 = document.getElementById('details2');
var featuredShowName2 = null;

var featuredImageEl3 = document.getElementById('image3');
var featuredwebEl3 = document.getElementById('web3');
var featuredDetailsEl3 = document.getElementById('details3');
var featuredShowName3 = null;

var featuredImageEl4 = document.getElementById('image4');
var featuredwebEl4 = document.getElementById('web4');
var featuredDetailsEl4 = document.getElementById('details4');
var featuredShowName4 = null;

var featuredImageEl5 = document.getElementById('image5');
var featuredwebEl5 = document.getElementById('web5');
var featuredDetailsEl5 = document.getElementById('details5');
var featuredShowName5 = null;

// function to fetch shows for the day
var todaysShows = function () {

    var apiUrl = "https://api.tvmaze.com/schedule?country=US&date=" + date;
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      
      if (response.ok) {
        //console.log(response);
        response.json().then(function(data) {
          
          displayFeaturedShows(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect');
    });
  };
  
// function for display shows
var displayFeaturedShows = function(featuredShows) {
  
  // generate random number
  var arr = [];
  while(arr.length < 8){
      var r = Math.floor(Math.random() * featuredShows.length);
      if(arr.indexOf(r) === -1) arr.push(r);
  }

  // First featured show
  var hasImage0 = featuredShows[arr[0]].show.image;
  // reload if image is not present
  if(hasImage0 === null){
    location.reload();
  }
  featuredImageEl0.removeAttribute('src');
  featuredImageEl0.setAttribute('src', hasImage0.medium);
  featuredImageEl0.removeAttribute('alt');
  featuredShowName0 = featuredShows[arr[0]].show.name;
  featuredImageEl0.setAttribute('alt', "Poster of " + featuredShowName0);
  featuredwebEl0.setAttribute('href', featuredShows[arr[0]].show.officialSite);
  
  // Second featured show
  var hasImage1 = featuredShows[arr[1]].show.image;
  // reload if image is not present
  if(hasImage1 === null){
    location.reload();
  }
  featuredImageEl1.removeAttribute('src');
  featuredImageEl1.setAttribute('src', hasImage1.medium);
  featuredImageEl1.removeAttribute('alt');
  featuredShowName1 = featuredShows[arr[1]].show.name;
  featuredImageEl1.setAttribute('alt', "Poster of " + featuredShowName1);
  featuredwebEl1.setAttribute('href', featuredShows[arr[1]].show.officialSite);

  // Third featured show
  var hasImage2 = featuredShows[arr[2]].show.image;
  // reload if image is not present
  if(hasImage2 === null){
    location.reload();
  }
  featuredImageEl2.removeAttribute('src');
  featuredImageEl2.setAttribute('src', hasImage2.medium);
  featuredImageEl2.removeAttribute('alt');
  featuredShowName2 = featuredShows[arr[2]].show.name;
  featuredImageEl2.setAttribute('alt', "Poster of " + featuredShowName2);
  featuredwebEl2.setAttribute('href', featuredShows[arr[2]].show.officialSite);

  // Fourth featured show
  var hasImage3 = featuredShows[arr[3]].show.image;
  // reload if image is not present
  if(hasImage3 === null){
    location.reload();
  }
  featuredImageEl3.removeAttribute('src');
  featuredImageEl3.setAttribute('src', hasImage3.medium);
  featuredImageEl3.removeAttribute('alt');
  featuredShowName3 = featuredShows[arr[3]].show.name;
  featuredImageEl3.setAttribute('alt', "Poster of " + featuredShowName3);
  featuredwebEl3.setAttribute('href', featuredShows[arr[3]].show.officialSite);

  // Fifth featured show
  var hasImage4 = featuredShows[arr[4]].show.image;
  // reload if image is not present
  if(hasImage4 === null){
    location.reload();
  }
  featuredImageEl4.removeAttribute('src');
  featuredImageEl4.setAttribute('src', hasImage4.medium);
  featuredImageEl4.removeAttribute('alt');
  featuredShowName4 = featuredShows[arr[4]].show.name;
  featuredImageEl4.setAttribute('alt', "Poster of " + featuredShowName4);
  featuredwebEl4.setAttribute('href', featuredShows[arr[4]].show.officialSite);

  // Sixth featured show
  var hasImage5 = featuredShows[arr[5]].show.image;
  // reload if image is not present
  if(hasImage5 === null){
    location.reload();
  }
  featuredImageEl5.removeAttribute('src');
  featuredImageEl5.setAttribute('src', hasImage5.medium);
  featuredImageEl5.removeAttribute('alt');
  featuredShowName5 = featuredShows[arr[5]].show.name;
  featuredImageEl5.setAttribute('alt', "Poster of " + featuredShowName5);
  featuredwebEl5.setAttribute('href', featuredShows[arr[5]].show.officialSite);
};

// Functions for displaying details in modal
var showDetails0 = function() {
  displayModal(featuredShowName0);
};
var showDetails1 = function() {
  displayModal(featuredShowName1);
};
var showDetails2 = function() {
  displayModal(featuredShowName2);
};
var showDetails3 = function() {
  displayModal(featuredShowName3);
};
var showDetails4 = function() {
  displayModal(featuredShowName4);
};
var showDetails5 = function() {
  displayModal(featuredShowName5);
};

// Event listeners for showing details of featured shows
featuredDetailsEl0.addEventListener('click', showDetails0);
featuredDetailsEl1.addEventListener('click', showDetails1);
featuredDetailsEl2.addEventListener('click', showDetails2);
featuredDetailsEl3.addEventListener('click', showDetails3);
featuredDetailsEl4.addEventListener('click', showDetails4);
featuredDetailsEl5.addEventListener('click', showDetails5);

todaysShows();