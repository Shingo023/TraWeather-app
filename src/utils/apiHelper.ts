import { PlaceInfoToEditType } from "@/types";

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

// Save the new order to the database
export const saveNewFavoriteCitiesOrder = async (
  userId: string | undefined,
  cityOrder: number[]
) => {
  const response = await fetch(`/api/update-favorite-cities-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      cityOrder,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to save new order of favorite cities.");
    console.error("Request failed with status:", response.status);
  }
  const data = await response.json();
  return data;
};

export const updateHomeLocationApi = async (body: any, userId: string) => {
  const response = await fetch(`/api/users/${userId}/default-city`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to update default city");
  }
  const data = await response.json();
  return data;
};

export const updatePlaceName = async (
  placeInfoToEdit: PlaceInfoToEditType,
  newPlaceName: string
) => {
  const response = await fetch(
    `/api/user-favorite-cities?id=${placeInfoToEdit?.userFavoriteCityId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customName: newPlaceName }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update city name");
  }
  const data = await response.json();
  return data;
};

export const fetchPlacePredictions = async (input: string) => {
  const response = await fetch(
    `/api/autocomplete?input=${encodeURIComponent(input)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch place predictions");
  }

  const data = await response.json();
  return data.predictions;
};

export const fetchPlaceCoordinate = async (placeId: string) => {
  const response = await fetch(`/api/place-coordinate?placeId=${placeId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch place coordinate");
  }

  const data = await response.json();
  return data;
};
