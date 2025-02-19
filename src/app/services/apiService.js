const BASE_URL = "http://80.75.218.175:8080/api/";

export const fetchToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}auth/GetToken`);
    const text = await response.text();
    return text.replace(/^"|"$/g, ""); // Entfernt Anführungszeichen, falls vorhanden
  } catch (error) {
    console.error("Fehler beim Abrufen des Tokens:", error);
    throw error;
  }
};

export const fetchSelectedProducts = async (token) => {
  try {
    const url = new URL(`${BASE_URL}getAllSelected?token=${token}`);
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : Object.values(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Komponenten:", error);
    throw error;
  }
};

export const fetchHardwareData = async (
  hardware,
  apiFunction,
  token,
  filterValues,
  category,
  subCategory
) => {
  try {
    const url = new URL(
      `${BASE_URL}${hardware}${apiFunction}${token}${filterValues}`
    );
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Daten");
    }

    return await response.json();
  } catch (error) {
    console.error("API Fehler:", error);
    throw error;
  }
};

export const getSelectedProducts = async (token) => {
  if (!token) return [];

  try {
    const apiFunction = "getAllSelected";
    const baseUrl = "http://80.75.218.175:8080/api/";
    const url = new URL(`${baseUrl}${apiFunction}?token=${token}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Daten erhalten:", data);

    return Array.isArray(data) ? data : Object.values(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Komponenten:", error);
    return [];
  }
};
