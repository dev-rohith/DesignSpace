import OpenCage from "opencage-api-client";
const { geocode } = OpenCage;

export async function getCoordinates(address) {
  try {
    const { street, house_number, city, state, country, postal_code } = address;
    let query = `${street || ""}, ${city}, ${state}, ${country}`;
    // Send the OpenCage API request
    const apiKey = process.env.OPENCAGE_API_KEY;
    const response = await geocode({ q: query, key: apiKey });

    const coordinates = response.results[0].geometry; // or use response.results[1] for the second result
    const lat = coordinates.lat;
    const lng = coordinates.lng;
    return { lat, lng };
    if (response.status.code === 200 && response.results.length > 0) {
      const result = response.results[0];
      const lat = result.geometry.lat;
      const lng = result.geometry.lng;
      return { lat, lng };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
