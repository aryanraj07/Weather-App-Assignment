const BASE_URL = "http://localhost:5000/favorites";

export const getFavorites = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addFavorite = async (city) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(city),
  });
  return response.json();
};

export const deleteFavorite = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
