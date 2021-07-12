localStorage.clear();

// Total cases throughout India
var sno=1;
const url="https://api.covid19india.org/data.json";
const url2="https://www.trackcorona.live/api/countries";
fetch(url)
.then(res => res.json())
.then(data => {
    info=data;
    $("#total").text(data.statewise[0].confirmed)
    $("#recover").text(data.statewise[0].recovered)
    $("#active").text(data.statewise[0].active)
    $("#updated").text(data.statewise[0].lastupdatedtime)
    // Filling table
    for (var i=1;i<38;i++){
        if (i==31){
            i++;
            continue;
        }
        if (data.statewise[i].confirmed>50000)
            $(".state_info").append("<tr class=more><td>" + sno + "</td><td>" + data.statewise[i].state + "</td><td>" + data.statewise[i].confirmed + "</td><td>" + data.statewise[i].active + "</td><td>" + data.statewise[i].recovered + "</td><td>" + data.statewise[i].deaths + "</td><td>" + data.statewise[i].deltaconfirmed + "</td><td>" + data.statewise[i].lastupdatedtime + "</td></tr>");
        else{
            $(".state_info").append("<tr class=less><td>" + sno + "</td><td>" + data.statewise[i].state + "</td><td>" + data.statewise[i].confirmed + "</td><td>" + data.statewise[i].active + "</td><td>" + data.statewise[i].recovered + "</td><td>" + data.statewise[i].deaths + "</td><td>" + data.statewise[i].deltaconfirmed + "</td><td>" + data.statewise[i].lastupdatedtime + "</td></tr>");
        }
        sno++;
    }
});
 

$(".searchButton").click(function(){
    var info=$(".inputSearch").val();
    localStorage.setItem("State-Name", info);
    window.open("state.html");
})

