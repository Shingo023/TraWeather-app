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
