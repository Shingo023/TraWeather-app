// wind speed(kph)
export const getWindStrength = (windspeed: number) => {
  if (windspeed >= 0 && windspeed <= 5) {
    return "Calm"; // 0–5 kph
  } else if (windspeed >= 6 && windspeed <= 10) {
    return "Still"; // 6–10 kph
  } else if (windspeed >= 11 && windspeed <= 19) {
    return "Gentle"; // 11–19 kph
  } else if (windspeed >= 20 && windspeed <= 29) {
    return "Mild"; // 20–29 kph
  } else if (windspeed >= 30 && windspeed <= 39) {
    return "Brisk"; // 30–39 kph
  } else if (windspeed >= 40 && windspeed <= 50) {
    return "Breezy"; // 40–50 kph
  } else if (windspeed >= 51 && windspeed <= 61) {
    return "Blustery"; // 51-61 kph
  } else if (windspeed >= 62 && windspeed <= 74) {
    return "Windy"; // 62–74 kph
  } else if (windspeed >= 75 && windspeed <= 88) {
    return "Gale"; // 75–88 kph
  } else if (windspeed >= 89 && windspeed <= 102) {
    return "Stormy"; // 89–102 kph
  } else if (windspeed >= 103) {
    return "Fierce"; // 103+ kph
  } else {
    return "Unknown"; // Catch-all for unexpected values
  }
};

// precipitation (mm/h)
export const getPrecipIntensity = (precip: number) => {
  if (precip === 0) return null;

  if (precip < 2.5) return "Light";
  if (precip < 7.6) return "Moderate";
  if (precip < 50) return "Heavy";

  return "Violent";
};

// Function to return visibility index based on the visibility in km
export const getVisibilityIndex = (visibility: number) => {
  if (visibility < 1) {
    return "Very Poor";
  } else if (visibility >= 1 && visibility < 2) {
    return "Poor";
  } else if (visibility >= 2 && visibility < 4) {
    return "Moderate";
  } else if (visibility >= 4 && visibility < 10) {
    return "Good";
  } else {
    return "Very Good";
  }
};
