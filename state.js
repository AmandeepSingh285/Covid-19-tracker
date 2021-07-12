const stateName=localStorage.getItem("State-Name");

$("h1").html(stateName + " covid-19 stats");

var url="https://api.covid19india.org/data.json";

fetch(url)
.then(res => res.json())
.then(data => {
    for (var i = 1; i < 38; i++) {
        if (data.statewise[i].state == stateName) {
            var temp1 = Number(data.statewise[i].recovered);
            var temp2 = Number(data.statewise[i].confirmed);
            temp1 /= temp2;
            $("ul").append("<li> Active Cases: " + data.statewise[i].active + "</li>");
            $("ul").append("<li> Confirmed Cases: " + data.statewise[i].confirmed + "</li>");
            $("ul").append("<li> Recovered: " + data.statewise[i].recovered + "</li>");
            $("ul").append("<li> Deaths: " + data.statewise[i].deaths + "</li>");
            $("ul").append("<li> Delta Confirmed Cases: " + data.statewise[i].deltaconfirmed + "</li>");
            $("ul").append("<li> Delta deaths: " + data.statewise[i].deltadeaths + "</li>");
            $("ul").append("<li> Delta Recovered: " + data.statewise[i].deltarecovered + "</li>");
            $("ul").append("<li> Percentage recovered: " + temp1 * 100 + "</li>");
        }
    }
})

var xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
  if (this.status==200){
    var data=JSON.parse(this.responseText);
    var state=data.statewise.map(function(elem){
      return elem.state;
    });
    var cases=data.statewise.map(function(elem){
      return elem.confirmed;
    });
    var recover = data.statewise.map(function(elem){
        return elem.recovered;
    });
    var delta = data.statewise.map(function(elem){
        return elem.deltaconfirmed;
    });
    state.splice(0,1);
    cases.splice(0,1);
    recover.splice(0,1);
    delta.splice(0,1);
  }
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: state,
            datasets: [{
                label: 'Confirmed cases',
                data: cases,
                backgroundColor: 'transparent',
                borderColor: 'red',
                borderWidth: 4
            }]
        },
        options: {
        elements: {
            line: {
            tension: 0
            }
        },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var ctx2=document.getElementById("myChart2").getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: state,
            datasets: [{
                label: 'Recovered cases',
                data: recover,
                backgroundColor: 'transparent',
                borderColor: 'green',
                borderWidth: 4
            }]
        },
        options: {
        elements: {
            line: {
            tension: 0
            }
        },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var ctx3=document.getElementById("myChart3").getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: state,
            datasets: [{
                label: 'Delta cases',
                data: delta,
                backgroundColor: 'transparent',
                borderColor: 'yellow',
                borderWidth: 4
            }]
        },
        options: {
        elements: {
            line: {
            tension: 0
            }
        },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
