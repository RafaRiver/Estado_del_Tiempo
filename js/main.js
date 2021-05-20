const apiKey = "";
const api_key_map ="";

const button = document.getElementById("sendButton");
const inputElement = document.getElementById("search");
const icono = document.querySelector(".icono");
const desc = document.querySelector(".descripcion");
const ciudad = document.querySelector(".ciudad");
const pais = document.querySelector(".pais");



const temp = document.querySelector(".temperatura");
const tmax = document.querySelector(".tempmax");
const tmin = document.querySelector(".tempmin");
const ster = document.querySelector(".senst");
const hum  = document.querySelector(".humedad");
const vie  = document.querySelector(".viento");
const pres = document.querySelector(".presion");
const map = document.querySelector(".mapa");


      
button.addEventListener('click', datos);

function datos () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputElement.value+'&appid='+apiKey+'&units=metric&lang=es')
    .then(response=>{
        return response.json();
    })
    .then(info=>{
        console.log(info);
        obtenerDatos(info);
    }).catch(err =>{
        alert('No se encontró la ciudad solicitada');
    });
}

function obtenerDatos(info){
        var city = info.name;
    
        var country = info.sys.country;   ;

        var temperatura = info.main.temp;
  
        var temperaturaMaxima = info.main.temp_max;

        var temperaturaMinima = info.main.temp_min;

        var sensacionTermica = info.main.feels_like;

        var humedad = info.main.humidity;
   
        var presion = info.main.pressure;
 
        var viento = info.wind.speed * 3.6;
    
        var logo = info.weather[0].icon;
        console.log(logo);
    
        var descripcion = info.weather[0].description;
        console.log(descripcion);
    
    
    
        icono.src='http://openweathermap.org/img/wn/'+logo+'@2x.png';
        temp.innerHTML=parseInt(temperatura) + '°';
        desc.innerHTML=descripcion;
        tmax.innerHTML=parseInt(temperaturaMaxima) + '°';
        tmin.innerHTML=parseInt(temperaturaMinima) + '°';
        ster.innerHTML=parseInt(sensacionTermica) + '°';
        hum.innerHTML=humedad + ' %';
        vie.innerHTML=parseInt(viento) + ' Km/h';
        pres.innerHTML=presion + ' hp';
        ciudad.innerHTML=city;
        pais.innerHTML=country;
        map.src="https://www.google.com/maps/embed/v1/place?key=" + api_key_map + "&q=" + city;
    
    
    //LOCAL STORAGE
    
    var infoClima ={
        "icono":logo,
        "ciudad":city,
        "pais":country,
        "descripcion":descripcion,
        "temperatura":temperatura,
        "temperatura_maxima":temperaturaMaxima,
        "temperatura_minima":temperaturaMinima,
        "sensacion_termica":sensacionTermica,
        "humedad":humedad,
        "presion":presion,
        "viento":viento
    };
    
    localStorage.setItem('info', JSON.stringify(infoClima));
    

}

window.onload = function(){
    var infoClima = JSON.parse(localStorage.getItem('info'));
    console.log(infoClima);
    
        icono.src='http://openweathermap.org/img/wn/'+infoClima.icono+'@2x.png';
        temp.innerHTML=parseInt(infoClima.temperatura) + '°';
        desc.innerHTML=infoClima.descripcion;
        tmax.innerHTML=parseInt(infoClima.temperatura_maxima) + '°';
        tmin.innerHTML=parseInt(infoClima.temperatura_minima) + '°';
        ster.innerHTML=parseInt(infoClima.sensacion_termica) + '°';
        hum.innerHTML=infoClima.humedad + ' %';
        vie.innerHTML=parseInt(infoClima.viento) + ' Km/h';
        pres.innerHTML=infoClima.presion + ' hp';
        ciudad.innerHTML=infoClima.ciudad;
        pais.innerHTML=infoClima.pais;
        map.src="https://www.google.com/maps/embed/v1/place?key="+api_key_map+ "&q=" + infoClima.ciudad;
}













