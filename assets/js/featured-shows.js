// function to fetch shows for the day
var todaysShows = function () {

    var apiUrl = "https://api.tvmaze.com/schedule?country=US&date=2021-01-24";
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
   // image
   
    console.log(featuredShows[0].show.image.medium);
    var featuredImageEl1 = document.getElementById('image1');
    featuredImageEl1.removeAttribute('src');
    featuredImageEl1.setAttribute('src', featuredShows[0].show.image.medium);
    featuredImageEl1.removeAttribute('alt');
    featuredImageEl1.setAttribute('alt', "Image of " + featuredShows[0].show.name);
    //poster of featuredshows[0].name
  
    var featuredImageEl2 = document.getElementById('image2');
    featuredImageEl2.removeAttribute('src');
    featuredImageEl2.setAttribute('src', featuredShows[1].show.image.medium);
    featuredImageEl2.removeAttribute('alt');
    featuredImageEl2.setAttribute('alt', "Image of " + featuredShows[1].show.name);
  
    var featuredImageEl3 = document.getElementById('image3');
    featuredImageEl3.removeAttribute('src');
    featuredImageEl3.setAttribute('src', featuredShows[2].show.image.medium);
    featuredImageEl3.removeAttribute('alt');
    featuredImageEl3.setAttribute('alt', "Image of " + featuredShows[2].show.name);
  
    var featuredImageEl4 = document.getElementById('image4');
    featuredImageEl4.removeAttribute('src');
    featuredImageEl4.setAttribute('src', featuredShows[3].show.image.medium);
  
    var featuredImageEl5 = document.getElementById('image5');
    featuredImageEl5.removeAttribute('src');
    featuredImageEl5.setAttribute('src', featuredShows[4].show.image.medium);
  
    var featuredImageEl6 = document.getElementById('image6');
    featuredImageEl6.removeAttribute('src');
    featuredImageEl6.setAttribute('src', featuredShows[5].show.image.medium);

  };
  todaysShows();