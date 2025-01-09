var q="amman";
async function checkWeather(){

    let apiurl =`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${q}&appid=a25a25335cdf8cf7ef7ce8e819c2f3b4` ;
     
    const response= await fetch(apiurl);
    const data = await response.json();

    const date = new Date(data.dt *1000);
    const formattedDate =date.toLocaleDateString("en-US");

    const days=["Sunday" ," Monday" , "Tuesday" ," wednesday" , "Thursday" ," Friday" ," saturday"];
    document.getElementById("day").textContent=days[date.getDay()];
    document.getElementById("date").textContent=formattedDate;
    document.getElementById("city").textContent=data.name;
    document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
    document.getElementById("PRESSURE").innerHTML = data.main.pressure +"hpa";
    document.getElementById("humidity").innerHTML=data.main.humidity +"%"; 
    document.getElementById("temp").innerHTML=Math.round(data.main.temp)+"°C";
    document.getElementById("description").innerHTML=data.weather[0].description;

}   

checkWeather();

function changeWeather(){
    let selc = document.getElementById("selc");
    if(selc.value == "Amman"){
        q="amman";
}else if (selc.value == "London"){
    q="london";
}else if (selc.value =="Paris"){
    q="paris"
}
checkWeather()
}

 

 
 

