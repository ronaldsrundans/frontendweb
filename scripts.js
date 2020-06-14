//document.getElementById("defaultOpen").click();
//document.getElementById('date').value = new Date().toDateInputValue();

var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
//var country = document.getElementById("country");
//var strCountry = country.options[country.selectedIndex].value;

function openFindTab(evt, openTab) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(openTab).style.display = "block";
  evt.currentTarget.className += " active";
}

function httpGetNameday(){
  document.getElementById("namedayresults").innerHTML="";
  var request = new XMLHttpRequest()
  var country = document.getElementById("country");
  var nameinput = document.getElementById("nameday").value;
  var strCountry = country.options[country.selectedIndex].value;
  request.open('GET', 'https://api.abalin.net/getdate?name='.concat(nameinput).concat('&country=').concat(strCountry), true)
  request.onload = function() {
    var strResult="Result: ";
    var gotdata = JSON.parse(this.response)
    for (var i = 0; i < gotdata.results.length; i++) {
      console.log(gotdata.results[i])
      strResult+=gotdata.results[i].day;
      strResult+=" ";
      strResult+=months[gotdata.results[i].month-1];
      strResult+="  ";
    }
    //document.getElementById("results").innerHTML=strResult;
    document.getElementById("namedayresults").innerHTML=strResult;

  }
  request.send()
}

function httpGetNames(){
  var request = new XMLHttpRequest()
  var country = document.getElementById("country");
  var inputdate = new Date(document.getElementById("date").value).getDate();
  var inputmonth = new Date(document.getElementById("date").value).getMonth()+1;
  var strCountry = country.options[country.selectedIndex].value;
  request.open('GET', ' https://api.abalin.net/namedays?country='.concat(strCountry).concat('&month=').concat(inputmonth).concat('&day=').concat(inputdate), true)
  request.onload = function() {
    var gotdata = JSON.parse(this.response)
    var strgotdata=JSON.stringify(gotdata.data.namedays)
    var obj = JSON.parse(strgotdata); 
    var res =JSON.stringify(obj[strCountry]);
    res = res.substring(1, res.length - 1);
    console.log(res);
    var resarray = res.split(", ");
    console.log(resarray);
    document.getElementById("nameresults").innerHTML="";
    ul = document.createElement('ul');
    document.getElementById('nameresults').appendChild(ul);
    resarray.forEach(function (resarray) {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += resarray;
      });
    }
  request.send()
}
var getDates = function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

function getnamesdateRange(){
  var request = new XMLHttpRequest()
  var country = document.getElementById("country");
  var strCountry = country.options[country.selectedIndex].value;
  //console.log(strCountry);
  var startDate= document.getElementById("startdate").value.replace("-",",").replace("-",",");
  var endDate = document.getElementById("enddate").value.replace("-",",").replace("-",",");
  //console.log(startDate);
  //console.log(endDate);

 // console.log(dates[i]);
  var dates = getDates(new Date (startDate), new Date(endDate)); 
  var gotdata=strgotdata=obj=res=resarray="";
  for (i=0;i<dates.length;i++){
    //console.log(dates[i]);
    //console.log(dates[i].getDate());
    //console.log(dates[i].getMonth()+1);
    request.open('GET', 'https://api.abalin.net/namedays?country='.concat(strCountry).concat('&month=').concat(dates[i].getMonth()+1).concat('&day=').concat(dates[i].getDate()), false)
    request.onload = function() {
      // Begin accessing JSON data here
      gotdata = JSON.parse(this.response)
      //console.log(gotdata)
      strgotdata=JSON.stringify(gotdata.data.namedays)
      obj = JSON.parse(strgotdata); 
      res =JSON.stringify(obj[strCountry]);
      res = res.substring(1, res.length - 1);
      //console.log(res);
      resarray = res.split(", ");
      console.log(resarray);
      /*
      for (var i = 0; i < gotdata.data.namedays.length; i++) {
        console.log(gotdata.data.namedays)
      }*/


    }
    request.send()


  }
}                                                                                                          


//var countriesArr=[cz, sk, pl, fr, hu, hr, se, us, at, it, es, de, dk, fi, bg, lt, ee, lv, gr, ru ];
// Create a request variable and assign a new XMLHttpRequest object to it.
/*
const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)



// Returns an array of dates between the two dates

*/
// Usage
//var startDate=document.getElementById("startDates").value;
  //console.log(startDate);

/*
var dates = getDates(new Date ("2020,06,01"), new Date("2020,06,10"));                                                                                                           
dates.forEach(function(date) {
  //console.log(date);
});
*/



 // getDates();
//document.getElementById("demo1").innerHTML = "Hello World!";
//console.log(getSDates());
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML = this.responseText;
      console.log(this);

    }
  };
  xhttp.open("GET", "https://api.abalin.net/getdate?name=John&country=us", true);
  xhttp.send();
}
//var defddd=document.getElementById("defaultOpen").click();
