const request = require('request');
const moment = require('moment-timezone');
const { timezoneHelper } = require('./timezoneHelper.js')

function weatherHelper(interaction) {
    var location = interaction.options.getString('location').toLowerCase();

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHERMAP_KEY}`;

    request(apiUrl, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const weatherData = JSON.parse(body);

            if (location !== weatherData.name.toLowerCase()) {
                location = weatherData.name;
            }

            const celsius = Math.round(weatherData.main.temp - 273.15);
            const fahrenheit = Math.round((weatherData.main.temp - 273.15) * 9 / 5 + 32);
            const humidity = weatherData.main.humidity;
            const clouds = weatherData.clouds.all;
            const desc = weatherData.weather[0].description;
            const lat = weatherData.coord.lat;
            const lon = weatherData.coord.lon;

            // Convert the time zone offset to a valid time zone identifier
            const timezoneOffsetMinutes = weatherData.timezone / 60;
            const timezoneIdentifier = moment.tz(timezoneHelper(timezoneOffsetMinutes)[0]).format('Z');

            // Get the times using the adjusted time zone identifier
            const currentTime = moment.unix(weatherData.dt)
                .utcOffset(timezoneIdentifier)
                .format('LT');
            const sunriseTime = moment.unix(weatherData.sys.sunrise)
                .utcOffset(timezoneIdentifier)
                .format('LT');
            const sunsetTime = moment.unix(weatherData.sys.sunset)
                .utcOffset(timezoneIdentifier)
                .format('LT');

            await interaction.reply(`Weather update as of ${currentTime} (${weatherData.name} time):\n\nThe weather in ${weatherData.name}, ${weatherData.sys.country} (${lat}, ${lon}) is ${celsius}°C or ${fahrenheit}°F having ${desc}.
                \n\nAdditional informations:\n\nTimezone: ${timezoneHelper(timezoneOffsetMinutes)[0]}\nClouds: ${clouds}%\nHumidity: ${humidity}%\nSunrise: ${sunriseTime}\nSunset: ${sunsetTime}\n`);
        } else {
            await interaction.reply(`Sorry, I couldn't find the weather for ${location}.`);
        }
    });
}

module.exports = {
    weatherHelper,
};