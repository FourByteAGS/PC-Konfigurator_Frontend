import React, { useState } from "react";
import Image from "next/image";
import { getSelectedProducts } from "../services/apiService";

const selectedCPUCooler = async (
  hardware,
  apiFunction,
  token,
  filterValues
) => {
  const baseUrl = "http://80.75.218.175:8080/api/";
  const url = new URL(
    `${baseUrl}${hardware}${apiFunction}${token}${filterValues}`
  );

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Daten");
    }
  } catch (error) {
    console.error("API Fehler:", error);
    return null;
  }
};

const CPUCoolerCard = ({ data, token, setData, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  if (!data || data.length === 0) {
    return <p>Keine Daten geladen</p>;
  }

  const handleSelect = async (id) => {
    const newSelectedId = selectedId === id ? null : id;
    setSelectedId(newSelectedId);

    if (newSelectedId) {
      await selectedCPUCooler(
        "cpufan/",
        "setcomponent?",
        "token=" + token,
        "&componentId=" + id
      );
      onSelect(true);
    } else {
      onSelect(false);
    }
    // `getSelectedProducts` aus apiService aufrufen und den State aktualisieren
    const updatedProducts = await getSelectedProducts(token);

    if (typeof setData === "function") {
      setData(updatedProducts);
    } else {
      console.error("Fehler: setData ist keine Funktion!");
    }
  };

  return (
    <div className="hardware-container">
      {data.map((item) => (
        <div
          key={item.id || item.name}
          className={`hardware-card ${selectedId === item.id ? "selected" : ""
            }`}
          onClick={() => handleSelect(item.id)}
          role="button"
        >
          {/* Bild */}
          <div className="hardware-image">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name || "Produktbild"}
                width={150}
                height={150}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            ) : (
              <p>Kein Bild verfügbar</p>
            )}
          </div>

          {/* Infos */}
          <div className="hardware-info">
            <h5>{item.name || "Kein Name"}</h5>
            <p>
              <strong>Preis:</strong> {item.price ? `${item.price} €` : "N/A"}
            </p>
            <p>
              <strong>Hersteller:</strong> {item.manufacturer || "Unbekannt"}
            </p>
            <p>
              <strong>Typ:</strong> {item.towerType || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CPUCoolerCard;
