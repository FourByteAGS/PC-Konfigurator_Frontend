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
        console.log('Daten erhalten:', data);

        return Array.isArray(data) ? data : Object.values(data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Komponenten:', error);
        return [];
    }
};

