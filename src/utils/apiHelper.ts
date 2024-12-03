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

  if (!res.ok) {
    throw new Error(`Failed to delete city with ID: ${favoriteCityId}`);
  }
  return res;
};

export const fetchDisplayedCityWeatherData = async (
  lat: number,
  lng: number
) => {
  const response = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const fetchCityData = async (placeId: string) => {
  const response = await fetch(`/api/favorite-cities?placeId=${placeId}`);
  if (!response.ok) {
    throw new Error("City not found");
  }
  return response.json();
};

export const fetchFavoriteCitiesPlaceIds = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}/favorite-cities/placeIds`);

  if (!response.ok) {
    throw new Error("Failed to fetch favorite city place IDs");
  }
  return response.json();
};
