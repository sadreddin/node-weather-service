const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d1e7063e22ff384301a81053dc50d211&units=metric`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Could not connect to weaher services!", undefined);
    } else if (body.cod === 200) {
      callback(undefined, {
        weather: body.weather[0].main,
        temperature: body.main.temp,
        feels_like: body.main.feels_like,
        humidity: body.main.humidity,
        wind: body.wind.speed,
      });
    } else {
      callback("Coordinates are not correct!", undefined);
    }
  });
};

module.exports = forecast;
