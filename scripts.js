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
//document.getElementById("defaultOpen").click();

//var countriesArr=[cz, sk, pl, fr, hu, hr, se, us, at, it, es, de, dk, fi, bg, lt, ee, lv, gr, ru ];
// Create a request variable and assign a new XMLHttpRequest object to it.
const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

function httpGetNames()
{
      var request = new XMLHttpRequest()
      var country = document.getElementById("country");
      var dateinput = document.getElementById("date").value;
      var day=dateinput.substring(8, 10);
      var month=dateinput.substring(5, 7);
      console.log(day);
      console.log(month);
      /*var $dateinput = getElementById("date");*/
      var strCountry = country.options[country.selectedIndex].value;
      console.log(strCountry);

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', ' https://api.abalin.net/namedays?country='.concat(strCountry).concat('&month=').concat(month).concat('&day=').concat(day), true)

    request.onload = function() {
      // Begin accessing JSON data here
      var gotdata = JSON.parse(this.response)

  
      /*
      data.data.namedays forEach(lv => {
        // Log each movie's title
        console.log(lv)
        data.data.namedays=>lv.forEach(lv=> {
          console.log(lv)
        })*/
        for (var i = 0; i < gotdata.data.namedays.lv.length; i++) {
          console.log(gotdata.data.namedays.lv)
        }
        //console.log(data.data.namedays.lv[0])
     // console.log(data.data.namedays.lv)
    }

    // Send request
    request.send()
}
function httpGetNameday(){
  //container.removeChild(card)

  var request = new XMLHttpRequest()
      var country = document.getElementById("country");
      var nameinput = document.getElementById("name").value;
      //console.log(nameinput);
     // https://api.abalin.net/getdate?name=John&country=us
      var strCountry = country.options[country.selectedIndex].value;
      //console.log(strCountry);
     // varName=
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.abalin.net/getdate?name='.concat(nameinput).concat('&country=').concat(strCountry), true)

    request.onload = function() {
      // Begin accessing JSON data here
      var gotdata = JSON.parse(this.response)
      for (var i = 0; i < gotdata.results.length; i++) {
        console.log(gotdata.results[i])
      }
      gotdata.results.forEach(results => {
        // Log each date
        console.log(results.day)
        console.log(results.month)
        const card = document.createElement('div')
        //container.removeChild(card)

        card.setAttribute('class', 'card')
  
        const h1 = document.createElement('h1')
        h1.textContent = results.day
        //h1.textContent = (results.month).getMonth();

        container.appendChild(card)
        card.appendChild(h1)


      })
      //console.log(gotdata.results[0].day);
      //console.log(gotdata.results[0].name)

    }
    request.send()

}
// Returns an array of dates between the two dates
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

// Usage
//var startDate=document.getElementById("startDates").value;
  //console.log(startDate);

/*
var dates = getDates(new Date ("2020,06,01"), new Date("2020,06,10"));                                                                                                           
dates.forEach(function(date) {
  //console.log(date);
});
*/

function changeel(){
  var request = new XMLHttpRequest()
      var country = document.getElementById("country");
      var strCountry = country.options[country.selectedIndex].value;
      //console.log(strCountry);
      var startDate= document.getElementById("startDates").value.replace("-",",").replace("-",",");
  var endDate = document.getElementById("endDates").value.replace("-",",").replace("-",",");
 // console.log(startDate);
 // console.log(dates[i]);
  var dates = getDates(new Date (startDate), new Date(endDate));                                                                                                           
  for (i=0;i<dates.length;i++){
    //console.log(dates[i]);
    //console.log(dates[i].getDate());
    //console.log(dates[i].getMonth()+1);
    request.open('GET', 'https://api.abalin.net/namedays?country='.concat(strCountry).concat('&month=').concat(dates[i].getMonth()+1).concat('&day=').concat(dates[i].getDate()), false)
    request.onload = function() {
      // Begin accessing JSON data here
      var gotdata = JSON.parse(this.response)
      console.log(gotdata)
      
      /*
      for (var i = 0; i < gotdata.data.namedays.length; i++) {
        console.log(gotdata.data.namedays)
      }*/


    }
    request.send()


  }
} 

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
