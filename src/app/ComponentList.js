import React from "react";

const ComponentList = ({ components = [] }) => {
    if (!Array.isArray(components)) {
        console.error("components muss ein Array sein!", components);
        return <p>Fehler: Ungültige Daten.</p>;
    }

    return (
        <div className="row">
            <div className="col">
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>Komponenten</th>
                            <th>Preis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.length > 0 ? (
                            components.map((comp, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="komp-text">
                                            <strong>{comp.category}: </strong>
                                        </div>
                                        <div className="desc-text">{comp.name || "-"}</div>
                                    </td>
                                    <td className="komp-text">
                                        <div>&nbsp;</div>
                                        <div className="desc-text">{comp.price ? `${comp.price}€` : "-"}</div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">
                                    Keine Komponenten vorhanden.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComponentList;
