// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=6.21&lon=6.84&units=metric&appid=a0032530c3d0b0bc648ca1ddf92d5302";

// Create the displayResults() function.
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    captionDesc.textContent = data.weather[0].description;
    weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute(
        "alt",
        data.weather[0].description
    );
}

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

apiFetch();

