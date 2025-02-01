import OpenCage from "opencage-api-client";
const { geocode } = OpenCage;

export async function getCoordinates(address) {
  try {
    const { street, city, state, country } = address;
    let query = `${street || ""}, ${city}, ${state}, ${country}`;
    // Send the OpenCage API request
    const apiKey = process.env.OPENCAGE_API_KEY;
    const response = await geocode({ q: query, key: apiKey });
    if (response.status.code === 200 && response.results.length > 0) {
      const coordinates = response.results[0].geometry || response.results[1].geometry // for the second result
      const lat = coordinates.lat;
      const lng = coordinates.lng;
      return { lat, lng };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
