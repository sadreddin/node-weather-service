const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-01");
const messageTwo = document.querySelector("#message-02");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const address = search.value;

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent =
          data.forecastData.weather +
          ", " +
          data.forecastData.temperature +
          " C";
      }
    });
  });
});
