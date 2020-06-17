var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}

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
};

function httpGetNameday(){
  document.getElementById("namedayresults").innerHTML="";
  var request = new XMLHttpRequest()
  var strCountry = document.getElementById("country");
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
    var resarray = res.split(",");
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
  var startDate= document.getElementById("startdate").value.replace("-",",").replace("-",",");
  var endDate = document.getElementById("enddate").value.replace("-",",").replace("-",",");
  var dates = getDates(new Date (startDate), new Date(endDate)); 
  var gotdata=strgotdata=obj=res=resarray=restrim="";
  var i=j=0;  
  document.getElementById("rangeresults").innerHTML="";
  const app = document.getElementById('rangeresults')
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)
  ul = document.createElement('ul');
  for (i=0;i<dates.length;i++){
    request.open('GET', 'https://api.abalin.net/namedays?country='.concat(strCountry).concat('&month=').concat(dates[i].getMonth()+1).concat('&day=').concat(dates[i].getDate()), false)
    request.onload = function() {
      gotdata = JSON.parse(this.response)
      strgotdata=JSON.stringify(gotdata.data.namedays)
      objstrgotdata = JSON.parse(strgotdata); 
      strobjstrgotdata =JSON.stringify(objstrgotdata[strCountry]);
      strobjstrgotdata=myTrim(strobjstrgotdata);
      strobjstrgotdata = strobjstrgotdata.substring(1, strobjstrgotdata.length - 1);
      namesArray = strobjstrgotdata.split(",");
      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      const h1 = document.createElement('h1')
      h1.textContent = weekdays[dates[i].getDay()].concat(" ").concat(dates[i].getDate()).concat(" ").concat(months[dates[i].getMonth()]);
      const p = document.createElement('p')
      document.getElementById('rangeresults').appendChild(ul);
      namesArray.forEach(function (namesArray) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += namesArray;
        p.appendChild(li);
      });
      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
    }
    request.send()
  }
}       

function getnamesweek(){
  var request = new XMLHttpRequest()
  var country = document.getElementById("country");
  var strCountry = country.options[country.selectedIndex].value;
  var d = new Date();
  var n = new Date();
  var nstart = new Date();
  var nend = new Date();
  d.setDate(d.getDate());
  var weekdaytoday=d.getDay();
  nstart.setDate(d.getDate()-weekdaytoday+1);
  nend.setDate(d.getDate()-weekdaytoday+6+1);
  var dates = getDates(nstart, nend); 
  var gotdata=strgotdata=obj=res=resarray=restrim="";
  var i=j=0;    
  document.getElementById("weekresults").innerHTML="";
  const app = document.getElementById('weekresults')
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)
  document.getElementById("rangeresults").innerHTML="";
  ul = document.createElement('ul');
  for (i=0;i<7;i++){
    request.open('GET', 'https://api.abalin.net/namedays?country='.concat(strCountry).concat('&month=').concat(dates[i].getMonth()+1).concat('&day=').concat(dates[i].getDate()), false)
    request.onload = function() {
      gotdata = JSON.parse(this.response)
      strgotdata=JSON.stringify(gotdata.data.namedays)
      objstrgotdata = JSON.parse(strgotdata); 
      strobjstrgotdata =JSON.stringify(objstrgotdata[strCountry]);
      strobjstrgotdata=myTrim(strobjstrgotdata);
      strobjstrgotdata = strobjstrgotdata.substring(1, strobjstrgotdata.length - 1);
      namesArray = strobjstrgotdata.split(",");
      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      const h1 = document.createElement('h1')
      h1.textContent = weekdays[dates[i].getDay()].concat(" ").concat(dates[i].getDate()).concat(" ").concat(months[dates[i].getMonth()]);
      const p = document.createElement('p')
      document.getElementById('rangeresults').appendChild(ul);
      namesArray.forEach(function (namesArray) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += namesArray;
        p.appendChild(li);
      });
      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
    }
    request.send()
  }
}
