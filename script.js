const countriesContainer = document.getElementById("countries-container");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error");
const searchInput = document.getElementById("search");

// Store all fetched countries in memory
let allCountries = [];


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

  // Clear previous cards
  countriesContainer.innerHTML = "";

  // Show message if no countries match
  if (countries.length === 0) {
    countriesContainer.innerHTML = "<p>No countries found.</p>";
    return;
  }

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


// Function 3: Search/filter the stored countries
searchInput.addEventListener("input", function() {

  // Get what the user typed
  const searchText = searchInput.value.toLowerCase();

  // Filter the countries already stored in memory
  const filteredCountries = allCountries.filter(function(country) {

    return country.country.toLowerCase().includes(searchText);

  });

  // Render only the matching countries
  renderCountries(filteredCountries);
});


// Main function
async function loadCountries() {

  loading.style.display = "block";
  errorMessage.style.display = "none";

  try {

    // Fetch the data only once
    const countries = await fetchCountries();

    // Store the complete dataset in memory
    allCountries = countries;

    // Display all countries
    renderCountries(allCountries);

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