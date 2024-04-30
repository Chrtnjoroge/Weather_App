// Define constants for API key and API URL
const apiKey = "ENTER_YOUR_APIKEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Get references to HTML elements
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

// Initialize temperature unit
let tempUnit = "C";

// Add event listener to the search button
searchButton.addEventListener("click", () => {
  // Get the value of the location input and trim any extra whitespace
  const loc = locationInput.value.trim();
  // Check if the input is not empty
  if (loc.length > 0) {
    // Call the fetchWeather function with the location input
    fetchWeather(loc);
  } else {
    // Alert the user to enter a city if the input is empty
    alert("Please enter a city!");
  }
});

// Function to fetch weather data
function fetchWeather(location) {
  // Display "Loading..." while fetching data
  locationElement.textContent = "Loading...";
  temperatureElement.textContent = "";
  descriptionElement.textContent = "";

  // Construct the URL for the API request
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  // Fetch weather data from the API
  fetch(url)
    .then((response) => {
      // Check if the response is not OK, throw an error if not
      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }
      // Parse response as JSON
      return response.json();
    })
    .then((data) => {
      // Display weather information
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°${tempUnit}`;
      descriptionElement.textContent = data.weather[0].description;

      // Display weather icon
      const iconCode = data.weather[0].icon; // Get the icon code from the weather data
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Construct the URL for the weather icon
      const iconElement = document.createElement("img");
      iconElement.src = iconUrl; // Set the src attribute of the image element to the icon URL
      iconElement.alt = data.weather[0].description; // Set alt attribute for accessibility
      descriptionElement.appendChild(iconElement); // Append the icon to the description element
    })
    .catch((error) => {
      // Log and display error message if there's an error fetching weather data
      console.error("Error fetching weather data:", error);
      locationElement.textContent = "Error fetching weather data";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "";
    });
}

