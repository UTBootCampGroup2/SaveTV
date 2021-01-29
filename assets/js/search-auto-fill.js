// ************************ From Brandon ************************//
// fetching TV Maze API 
function searchShow(query) {
  var url = `https://api.tvmaze.com/search/shows?q=${query}`;
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
          movieId:   element.show.id    ? element.show.id : 0, 
          movieName: element.show.name  ? element.show.name : "", 
          imgLink:   element.show.image ? element.show.image.medium : ""
        }));
    }
    renderResults(movieInfoList);
      
  })
  .catch((error) => {
      //console.log('error', error);
  });
}
var resultsList = document.getElementById("resultsList");
resultsList.onclick = function (event) {
  event.preventDefault();
  var target = event.target;
  if (target.tagName.toLowerCase() === 'img') {
      //var movieId = target.id;
      var movieName = target.name;  
      getSeries(movieName);
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
  var img = document.createElement("img");
  img.id = movieInfo.movieId;
  img.name = movieInfo.movieName;
  img.src = movieInfo.imgLink;
  img.alt = movieInfo.movieName;
  //images will populate in <section>
  document.querySelector('#resultsList').appendChild(img);
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
  var searchField = document.getElementById("findlocate");
  searchField.onkeyup = (event) => {
      clearTimeout(searchTimeout);
      if(searchField.value.trim().length === 0) {
        while (resultsList.firstChild) {
          resultsList.removeChild(resultsList.firstChild);
        }
          return;
      }
      searchTimeout = setTimeout(() => {
          searchShow(searchField.value.trim());
      }, 250);
      
  }
}