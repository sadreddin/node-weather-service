const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-01");
const messageTwo = document.querySelector("#message-02");
const messageThree = document.querySelector("#message-03");
const messageFour = document.querySelector("#message-04");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";

  const address = search.value;

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData.weather;
        messageThree.textContent = `Temperature: ${data.forecastData.temperature} C,   Feels like: ${data.forecastData.feels_like} C`;
        messageFour.textContent = `Humidity: ${data.forecastData.humidity},   wind: ${data.forecastData.wind}`;
      }
    });
  });
});
