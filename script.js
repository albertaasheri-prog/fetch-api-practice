const countriesContainer = document.getElementById("countries-container");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error");


// Function 1: Fetch the country data
async function fetchCountries() {

  const url = "https://countriesnow.space/api/v0.1/countries";

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data.data;

  } catch (error) {

    throw error;

  }
}


// Function 2: Render the country data
function renderCountries(countries) {

  countriesContainer.innerHTML = "";

  countries.forEach(function(country) {

    // Create the card
    const card = document.createElement("div");
    card.classList.add("country-card");

    // Create country name
    const countryName = document.createElement("h2");
    countryName.textContent = country.country;

    // Create cities text
    const cities = document.createElement("p");

    if (country.cities && country.cities.length > 0) {
      cities.textContent = `Cities: ${country.cities.slice(0, 5).join(", ")}`;
    } else {
      cities.textContent = "Cities: No cities available";
    }

    // Add the elements to the card
    card.append(countryName, cities);

    // Add the card to the page
    countriesContainer.append(card);
  });
}


// Main function
async function loadCountries() {

  loading.style.display = "block";
  errorMessage.style.display = "none";

  try {

    // Get the data
    const countries = await fetchCountries();

    // Display the data
    renderCountries(countries);

    // Hide loading message
    loading.style.display = "none";

  } catch (error) {

    // Hide loading message
    loading.style.display = "none";

    // Display error message
    errorMessage.textContent =
      "Something went wrong loading the countries. Please try again later.";

    errorMessage.style.display = "block";

    console.error("Failed to fetch country data:", error);
  }
}


// Start the application
loadCountries();