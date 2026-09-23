const apiKey = "a0032530c3d0b0bc648ca1ddf92d5302";
const city = "Onitsha";
const country = "NG";

// Build the API URL 
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

// Ask OpenWeatherMap for the weather
async function getWeather() {
    const response = await fetch(weatherURL);   //Go to this weather URL and get the information.
    const data = await response.json();   // Take the response and turn it into JavaScript data that I can use

    const currentWeather = document.querySelector("#current-weather");

    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    currentWeather.innerHTML = `
        <img src="${iconURL}" alt="${data.weather[0].description}">
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Minimum Temperature: ${data.main.temp_min} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

async function getForecast() {
    const response = await fetch(forecastURL);
    const data = await response.json();

    const threeDays = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    const forecast = document.querySelector("#forecast");
    
    

    threeDays.forEach(day => {

        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        forecast.innerHTML += `
            <div>
                <p>${dayName}</p>
                <p>${day.main.temp} °C</p>
            </div>
        `;
    });
}

async function getSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const qualifiedMembers = members.filter(
        member => member.membership === 2 || member.membership === 3
    );

    const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);

    const selectedMembers = shuffledMembers.slice(0, 3);

    const spotlight = document.querySelector("#spotlights");

    spotlight.innerHTML = "";

    selectedMembers.forEach(member => {
        spotlight.innerHTML += `
            <article class="spotlight-card">
                <img src="${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <p>Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </article>
        `;
    });
}

getWeather();
getForecast();
getSpotlights();