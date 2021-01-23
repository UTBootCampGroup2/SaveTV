// ************************ From Brandon ************************//
// fetching TV Maze API 
function searchShow(query) {
  var url = `http://api.tvmaze.com/search/shows?q=${query}`;
  // console.log(url);
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
      console.log(jsonData);
      var movieInfoList =  jsonData.map((element) => ({
        movieId: element.show.id, 
        movieName: element.show.name, 
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
var resultsList = document.getElementById("resultsList");
resultsList.onclick = function (event) {
  event.preventDefault();
  var target = event.target;
  if (target.tagName.toLowerCase() === 'img') {
      console.log("img click test") //works
      console.log('event', event);
      var movieId = target.id;
      console.log(movieId);
      var movieName = target.name;
      console.log("movie name", movieName);
      displayModal(movieName);
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
  console.log(movieInfo);
  var img = document.createElement("img");
  img.id = movieInfo.movieId;
  img.name = movieInfo.movieName;
  img.src = movieInfo.imgLink;
  img.alt = movieInfo.movieName;
  //images will populate in <section>
  document.querySelector('#resultsList').appendChild(img);
}
function displayModal(movieName) {
  var modalBox = document.querySelector(".modal-box");
  modalBox.classList.add("activeInfo");
  var exitBtn = modalBox.querySelector(".quit");
  exitBtn.onclick = ()=>{
    modalBox.classList.remove("activeInfo");
    
  }
  getSeries(movieName);
}
let searchTimeout = 0;
// automatically starts searching just from input of search bar
window.onload = () => {
  var searchField = document.getElementById("findlocate");
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