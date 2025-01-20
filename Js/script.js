let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let forecast = document.querySelector(".weather_forecast");
let icon = document.querySelector(".weather_icon");
let temp = document.querySelector(".weather_temp");
let minTemp = document.querySelector(".weather_min");
let maxTemp = document.querySelector(".weather_max");

let w_feel = document.querySelector(".flees_like");
let w_humidity = document.querySelector(".humidity");
let w_wind = document.querySelector(".wind");
let w_pressure = document.querySelector(".pressure");

let searchCity = document.querySelector(".weather_search");

//For Converting the country code to country name
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

//For Converting the date and time
const getDateTime = (dt) => {
const curDate = new Date(dt * 1000);
console.log(curDate);
 
const options = {
    weekday : "long",
    year : "numeric",
    month : "long",
    day : "numeric",
    hour : "numeric",
    minute : "numeric",
}

const formatter = new Intl.DateTimeFormat("en-US", options);

return formatter.format(curDate);

}

// default city
let city = "indore";

// search Functionality
searchCity.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value ="";
})

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a6b4c205c8adee249bc8078df9295bc3`;
    try {
        const res = await fetch(weatherUrl); 
        const data = await res.json();
        console.log(data);

        const {main, name, weather, wind, sys, dt} = data;
        
        cityName.innerHTML  = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        forecast.innerHTML = weather[0].main;
        forecast.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        
        // const kelvinToCelsius = (kelvin) => {
        //     return (kelvin - 273.15).toFixed(1);
        // }

        const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
        
        temp.innerHTML = `${kelvinToCelsius(main.temp)}&#176C`;
        minTemp.innerHTML = `Min: ${kelvinToCelsius(main.temp_min)}&#176C`;
        maxTemp.innerHTML = `Max: ${kelvinToCelsius(main.temp_max)}&#176C`;

        w_feel.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed}m/s`;
        w_pressure.innerHTML = `${main.pressure}hPa`;
    } catch (error) {
        console.log(error);
    }
}
document.body.addEventListener("load", getWeatherData());

document.addEventListener("contextmenu", (rightCurStop) =>{
    rightCurStop.preventDefault();
}, false);
