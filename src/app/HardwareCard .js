import React from "react";

const HardwareCard = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Keine Daten geladen</p>;
    }

    return (
        <div className="row">
            {data.map((item, index) => (
                <div key={index} className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.name || "Kein Name"}</h5>
                            <p className="card-text">
                                <strong>Preis:</strong> {item.price ? `${item.price} €` : "N/A"}
                            </p>
                            <p className="card-text">
                                <strong>Hersteller:</strong> {item.manufacturer || "Unbekannt"}
                            </p>
                            <p className="card-text">
                                <strong>Typ:</strong> {item.type || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HardwareCard;
