function generateWeatherHTML(data) {
    console.log(data)
    const weather = data.weather[0];
    const iconName = weather.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconName}.png`;

    return `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Feels like:</strong> ${data.main.feels_like} °C</p>
        <p><strong>Description:</strong> ${weather.description}</p>
        <img class="weather-icon" src="${iconUrl}" alt="${weather.main}">
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Sunrise:</strong> ${new Date(
            data.sys.sunrise * 1000
        ).toLocaleTimeString()}</p>
        <p><strong>Sunset:</strong> ${new Date(
            data.sys.sunset * 1000
        ).toLocaleTimeString()}</p>
    `;
}

async function getWeatherData() {
    document.getElementById("get").addEventListener("click", async function (e) {
        const city = document.getElementById("city").value;
        fetch(`/get-weather/${city}`)
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("weather-details").innerHTML = generateWeatherHTML(data);
            })
            .catch((err) => console.log(err));
    });
}

document.addEventListener("DOMContentLoaded", getWeatherData);
