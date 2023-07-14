const request = require('request');

function weatherHelper(interaction) {
    var location = interaction.options.getString('location').toLowerCase();

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHERMAP_KEY}`;

    request(apiUrl, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const weatherData = JSON.parse(body);

            if (location !== weatherData.name.toLowerCase()) {
                location = weatherData.name;
            }

            // Kelvin to Celsius conversion
            const celsius = Math.round(weatherData.main.temp - 273.15);

            // Kelvin to Fahrenheit conversion
            const fahrenheit = Math.round((weatherData.main.temp - 273.15) * 9 / 5 + 32);

            const desc = weatherData.weather[0].description;
            const lat = weatherData.coord.lat, lon = weatherData.coord.lon;

            await interaction.reply(`The weather in ${weatherData.name}, ${weatherData.sys.country} (${lat}, ${lon}) is ${celsius}°C or ${fahrenheit}°F having ${desc}.`);
        } else {
            await interaction.reply(`Sorry, I couldn't find the weather for ${location}.`);
        }
    });
}

module.exports = {
    weatherHelper,
};