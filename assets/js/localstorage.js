var dateArr = [];
var localStorageData = 'localStorageSaveTv';

var loadFromLocalStorage = function() {
    dateArr = JSON.parse(localStorage.getItem(dateArr));
    if (!dateArr) {
     dateArr = [];
    }
};
var saveToLocalStorage = function() {
    localStorage.setItem("dateArr", JSON.stringify(dateArr));
};

var sendData = function(date, time, series, seriesData){

    objData = {
        objTime : time,
        objSeries: series,
        objSeriesData: seriesData
    }
    // console.log(objData);
    var tempArr = [];
    tempArr = [
        date = date,
        Obj = objData
    ]

    if(dateArr.length == 0){
        dateArr.push(tempArr);
    }else{
        if(checkIfDateExists(date)){

        }else{
            dateArr.push(tempArr);
        }
    } 
}

var checkIfDateExists = function(date){
    for(var i=0; i<dateArr.length; i++){          
        if(dateArr[i][0]==date){
            dateArr[i].push(objData);
            return true;
        }else{
            return false;
        }
    } 
}

loadFromLocalStorage();

sendData('01/01/2021', '11:00', 'Game of thrones', 'Other relevant information');
sendData('01/01/2021', '12:00', 'HIMYM', 'Other relevant information');
sendData('02/01/2021', '10:00', 'HIMYM', 'Other relevant information');

saveToLocalStorage();

console.log(dateArr);
getSeries('girls');