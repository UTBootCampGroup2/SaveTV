var dateArr = [];
var localStorageName = 'group2-SaveTv-items';

var loadFromLocalStorage = function() {
    var data = JSON.parse(localStorage.getItem(localStorageName));
    return data ? data : [];
};
var saveToLocalStorage = function(data) {
    localStorage.setItem(localStorageName, JSON.stringify(data));
};

var clearDateArray = function() {
    dateArr = [];
}

var pushToDateArray = function(date, time, series, seriesData){

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
        if(dateExists(date)){

        }else{
            dateArr.push(tempArr);
        }
    } 
}

var dateExists = function(date){
    for(var i=0; i<dateArr.length; i++){          
        if(dateArr[i][0]==date){
            dateArr[i].push(objData);
            return true;
        }else{
            return false;
        }
    } 
}

var localStorageTestSequence = function() {
    loadFromLocalStorage();

    pushToDateArray('01/01/2021', '11:00', 'Game of thrones', 'Other relevant information');
    pushToDateArray('01/01/2021', '12:00', 'HIMYM', 'Other relevant information');
    pushToDateArray('02/01/2021', '10:00', 'HIMYM', 'Other relevant information');
    
    saveToLocalStorage(dateArr);
    
    console.log(dateArr);
    getSeries('girls');
}

localStorageTestSequence();

