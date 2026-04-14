function getWeather() {
    const city = document.getElementById("city").value;

    const apiKey = "a9f9f2696fa34111ba7184211261404"; // replace this
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("weather").innerHTML = "City not found!";
                return;
            }

            // const temp = data.main.temp;
            // const weather = data.weather[0].description;
            // const humidity = data.main.humidity;
             console.log(data);
            document.getElementById("weather").innerHTML = `
                <h3>${city}</h3>
               <p> Temperature: ${data.current.temp_c}°C</p>
                        <p> Feels Like: ${data.current.feelslike_c}°C</p>
                        <p> Humidity: ${data.current.humidity}%</p>
                        <p> Wind: ${data.current.wind_kph} km/h (${data.current.wind_dir})</p>
                        <p> Visibility: ${data.current.vis_km} km</p>
                        <p> UV Index: ${data.current.uv}</p>
                        <p> Cloud: ${data.current.cloud}%</p>
            `;
        })
        .catch(error => {
            console.log(error);
            document.getElementById("weather").innerHTML = "Error fetching data!";
        });
}