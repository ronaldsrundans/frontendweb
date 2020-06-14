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
};

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
  var i=j=0;  
  
  document.getElementById("root").innerHTML="";

  const app = document.getElementById('root')
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)


  document.getElementById("rangeresults").innerHTML="";

  ul = document.createElement('ul');
  for (i=0;i<dates.length;i++){
    //for (i=0;i<1;i++){
    console.log(dates[i]);
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
      //console.log(resarray);


      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      const h1 = document.createElement('h1')
      h1.textContent = dates[i];
      const p = document.createElement('p')


      
    document.getElementById('rangeresults').appendChild(ul);
    resarray.forEach(function (resarray) {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += resarray; 
      p.appendChild(li);
    });
    //p.textContent = resarray;
   
    container.appendChild(card)
    card.appendChild(h1)
    card.appendChild(p)
    //}
      /*for (j=0;j<resarray.length;j++){
        console.log(resarray[j]);
      }
      
      for (var i = 0; i < gotdata.data.namedays.length; i++) {
        console.log(gotdata.data.namedays)
      }*/


    }
    request.send()


  }
}                               