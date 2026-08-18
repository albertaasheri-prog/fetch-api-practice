async function fetchCountries() {
  const url = "https://countriesnow.space/api/v0.1/countries";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Country data:", data);
  } catch (error) {
    console.error("Failed to fetch country data:", error);
  }
}

fetchCountries();