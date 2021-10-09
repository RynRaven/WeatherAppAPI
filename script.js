const API_KEY ='d6e50ba138856be8b5668a250426b28d';

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const forecastEl = document.getElementsByClassName('forecast-temperature');
const weatherForecastEl = document.getElementById('weather-forecast');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval (() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    timeEl.innerHTML = (hour < 10? '0'+hour : hour) + ':' + (minutes < 10? '0'+minutes: minutes)

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month];

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData (data){
    const { sunrise , sunset , pressure , humidity , wind_speed } = data.current;
    const { main } = data.current.weather[0];
    const { timezone } = data;
    const { temp } = data.current;

    document.querySelector('.weather-main').innerText = "Sky: " + main;
    document.querySelector('.humidity').innerText = "Humidity: " + humidity + " %";
    document.querySelector('.pressure').innerText = "Pressure: " + pressure + " mb";
    document.querySelector('.wind').innerText = "Wind speed: " + wind_speed + "m/s";
    document.querySelector('.sunrise').innerText = "Sunrise: " + window.moment(sunrise * 1000).format('HH:mm a');
    document.querySelector('.sunset').innerText = "Sunset: " + window.moment(sunset * 1000).format('HH:mm a');

    document.querySelector('.time-zone').innerText = "Timezone: " + timezone;
    document.querySelector('.temperature').innerText = temp + "°C"; 
    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            console.log("Idk");
        }else{
            otherDayForcast += `
            <div class="weather-forecast-items">
                <div class="day">
                    <div class="week-day">${window.moment(day.dt*1000).format('dddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="forecast-temperature">${day.temp.day}&#176;C</div>
                </div>
                `
        }
    })
    
    weatherForecastEl.innerHTML = otherDayForcast;

}
    