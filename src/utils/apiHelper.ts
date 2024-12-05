const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "An error occurred");
  }
  return response.json();
};

export const deleteCity = async (userId: string, favoriteCityId: number) => {
  const res = await fetch("/api/user-favorite-cities", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      favoriteCityId,
    }),
  });

  return handleResponse(res);
};

export const fetchDisplayedCityWeatherData = async (
  lat: number,
  lng: number
) => {
  const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
  return handleResponse(res);
};

export const fetchCityData = async (placeId: string) => {
  const res = await fetch(`/api/favorite-cities?placeId=${placeId}`);
  return handleResponse(res);
};

export const fetchFavoriteCitiesPlaceIds = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}/favorite-cities/placeIds`);
  return handleResponse(res);
};

export const fetchFavoriteCities = async (userId: string) => {
  const res = await fetch(`/api/user-favorite-cities?userId=${userId}`);
  return handleResponse(res);
};

export const fetchDefaultCity = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}/default-city`);
  if (!response.ok) throw new Error("Failed to fetch default city.");
  const data = await response.json();
  if (!data) throw new Error("No data found for default city.");
  return data;
};

export const fetchLocationDetails = async (
  latitude: number,
  longitude: number
) => {
  const response = await fetch(
    `/api/location-details?lat=${latitude}&lng=${longitude}`
  );
  if (!response.ok) throw new Error("Failed to fetch location details.");
  const data = await response.json();
  if (!data.cityName || !data.address || !data.placeId) {
    throw new Error("Incomplete location details received.");
  }
  return data;
};
