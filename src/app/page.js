"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import TowerCard from "@/app/TowerCard";
import ComponentList from "@/app/ComponentList";

export default function Home() {
    const [token, setToken] = useState(null);
    const [hardwareData, setHardwareData] = useState(null);
    const [activeFilter, setFilterValues] = useState(null);
    const [selectedProducts, selectedProductList] = useState(null);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");

        const fetchToken = async () => {
            try {
                const response = await fetch('http://80.75.218.175:8080/api/auth/GetToken');
                const text = await response.text();
                const cleanToken = text.replace(/^"|"$/g, ''); // Entfernt Anführungszeichen, falls vorhanden

                if (cleanToken) {
                    setToken(cleanToken);
                    console.log('Token empfangen:', cleanToken);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen des Tokens:', error);
            }
        };

        fetchToken();
    }, []); // Läuft nur beim ersten Rendern

    useEffect(() => {
        if (!token) return; // Wartet auf das Token, bevor die Produkte geladen werden

        const getSelectedProducts = async () => {
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

                // Falls das JSON-Objekt eine Liste enthält
                let productsArray = Array.isArray(data) ? data : Object.values(data);

                console.log('Umgewandeltes Array:', productsArray);
                selectedProductList(productsArray); // Speichert die Daten im State
            } catch (error) {
                console.error('Fehler beim Abrufen der Komponenten:', error);
            }
        };

        getSelectedProducts();
    }, [token]); // Wird erneut ausgeführt, wenn sich `token` ändert


    const getHardwareData = async (hardware, apiFunction, token, filterValues) => {
        const baseUrl = "http://80.75.218.175:8080/api/";
        const url = new URL(`${baseUrl}${hardware}${apiFunction}${token}${filterValues}`);
        setFilterValues(filterValues);

        if (filterValues == activeFilter) {
            return;
        }

        try {
            const response = await fetch(
                url.toString()
            );
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Daten");
            }
            const data = await response.json();
            setHardwareData(data); // Speichert die Daten im State
            console.log("Hardware-Daten:", data);
        } catch (error) {
            console.error("API Fehler:", error);
            return null;
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center">
                {/* Hauptkarte */}
                <div className="card w-75">
                    <div className="row g-0">

                        {/* Linke Spalte */}
                        <div className="col-md-8 p-3">

                            {/* Gehäuse Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseCase"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-pc" viewBox="0 0 16 16">
                                                <path
                                                    d="M5 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Gehäuse</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseCase">
                                    <div className="card-body">

                                        {/* ATX */}
                                        <div className="card mb-2">
                                            <div
                                                onClick={() => getHardwareData("tower/", "GetTowerByFormFactor?", "token=" + token, "&formFactor=ATX")}
                                                className="card-header" data-bs-toggle="collapse"
                                                data-bs-target="#collapseATX"
                                                style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                                ATX
                                            </div>
                                            <div className="collapse" id="collapseATX">
                                                <div className="card-body">
                                                    <TowerCard data={hardwareData} token={token} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Micro ATX */}
                                        <div className="card mb-2">
                                            <div onClick={() => getHardwareData("tower/", "GetTowerByFormFactor?", "token=" + token, "&formFactor=MICRO_ATX")}
                                                className="card-header" data-bs-toggle="collapse"
                                                data-bs-target="#collapseMicroATX"
                                                style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                                Micro ATX
                                            </div>
                                            <div className="collapse" id="collapseMicroATX">
                                                <div className="card-body">
                                                    <TowerCard data={hardwareData} token={token} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mini ATX */}
                                        <div className="card">
                                            <div onClick={() => getHardwareData("tower/", "GetTowerByFormFactor?", "token=" + token, "&formFactor=MINI_ATX")}
                                                className="card-header" data-bs-toggle="collapse"
                                                data-bs-target="#collapseMiniATX"
                                                style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                                Mini ATX
                                            </div>
                                            <div className="collapse" id="collapseMiniATX">
                                                <div className="card-body">
                                                    <TowerCard data={hardwareData} token={token} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Prozessor Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseCPU"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-cpu" viewBox="0 0 16 16">
                                                <path
                                                    d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Prozessor</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseCPU">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>


                            {/* Mainboard Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse"
                                    data-bs-target="#collapseMainboard"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-motherboard" viewBox="0 0 16 16">
                                                <path
                                                    d="M11.5 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-10 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zM5 3a1 1 0 0 0-1 1h-.5a.5.5 0 0 0 0 1H4v1h-.5a.5.5 0 0 0 0 1H4a1 1 0 0 0 1 1v.5a.5.5 0 0 0 1 0V8h1v.5a.5.5 0 0 0 1 0V8a1 1 0 0 0 1-1h.5a.5.5 0 0 0 0-1H9V5h.5a.5.5 0 0 0 0-1H9a1 1 0 0 0-1-1v-.5a.5.5 0 0 0-1 0V3H6v-.5a.5.5 0 0 0-1 0zm0 1h3v3H5zm6.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                                <path
                                                    d="M1 2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 9H1V8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6H1V5H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 2zm1 11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Mainboard</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseMainboard">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                            {/* Prozessorkühler Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse"
                                    data-bs-target="#collapseCPUCooler"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-snow" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Prozessorkühler</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseCPUCooler">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                            {/* Arbeitsspeicher Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseRAM"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-memory" viewBox="0 0 16 16">
                                                <path
                                                    d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zM2 10v2H1v-2zm2 0v2H3v-2zm2 0v2H5v-2zm3 0v2H8v-2zm2 0v2h-1v-2zm2 0v2h-1v-2zm2 0v2h-1v-2z" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Arbeitsspeicher</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseRAM">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                            {/* Grafikkarte Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseGPU"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-gpu-card" viewBox="0 0 16 16">
                                                <path
                                                    d="M4 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                                                <path
                                                    d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5m5.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M9 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0" />
                                                <path
                                                    d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Grafikkarte</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseGPU">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                            {/* Datenträger Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse"
                                    data-bs-target="#collapseDatadrive"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-hdd" viewBox="0 0 16 16">
                                                <path
                                                    d="M4.5 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                                <path
                                                    d="M16 11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.51c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198zM3.655 4.26 1.592 8.043Q1.79 8 2 8h12q.21 0 .408.042L12.345 4.26a.5.5 0 0 0-.439-.26H4.094a.5.5 0 0 0-.44.26zM1 10v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Datenträger</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseDatadrive">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                            {/* Gehäuselüfter Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseFan"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-fan" viewBox="0 0 16 16">
                                                <path
                                                    d="M10 3c0 1.313-.304 2.508-.8 3.4a2 2 0 0 0-1.484-.38c-.28-.982-.91-2.04-1.838-2.969a8 8 0 0 0-.491-.454A6 6 0 0 1 8 2c.691 0 1.355.117 1.973.332Q10 2.661 10 3m0 5q0 .11-.012.217c1.018-.019 2.2-.353 3.331-1.006a8 8 0 0 0 .57-.361 6 6 0 0 0-2.53-3.823 9 9 0 0 1-.145.64c-.34 1.269-.944 2.346-1.656 3.079.277.343.442.78.442 1.254m-.137.728a2 2 0 0 1-1.07 1.109c.525.87 1.405 1.725 2.535 2.377q.3.174.605.317a6 6 0 0 0 2.053-4.111q-.311.11-.641.199c-1.264.339-2.493.356-3.482.11ZM8 10c-.45 0-.866-.149-1.2-.4-.494.89-.796 2.082-.796 3.391q0 .346.027.678A6 6 0 0 0 8 14c.94 0 1.83-.216 2.623-.602a8 8 0 0 1-.497-.458c-.925-.926-1.555-1.981-1.836-2.96Q8.149 10 8 10M6 8q0-.12.014-.239c-1.02.017-2.205.351-3.34 1.007a8 8 0 0 0-.568.359 6 6 0 0 0 2.525 3.839 8 8 0 0 1 .148-.653c.34-1.267.94-2.342 1.65-3.075A2 2 0 0 1 6 8m-3.347-.632c1.267-.34 2.498-.355 3.488-.107.196-.494.583-.89 1.07-1.1-.524-.874-1.406-1.733-2.541-2.388a8 8 0 0 0-.594-.312 6 6 0 0 0-2.06 4.106q.309-.11.637-.199M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                <path
                                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Gehäuselüfter</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseFan">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                            {/* Netzteil Auswahl */}
                            <div className="card mb-3">
                                <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapsePower"
                                    style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                                    <div className="row">
                                        <div
                                            className="col-1 border-end d-flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-lightning" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z" />
                                            </svg>
                                        </div>
                                        <div className="col-11">
                                            <strong>Netzteil</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapsePower">
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rechte Spalte */}
                        <div className="col-md-4 bg-light p-3">
                            <div className="row">
                                <div className="col-4">
                                    <img src="https://gzhls.at/i/60/05/3326005-n0.jpg" width="80" />
                                </div>
                                <div className="col-8 d-flex justify-content-center align-items-center">
                                    <h5>PC-Konfiguration</h5>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <ComponentList components={selectedProducts} />

                            </div>
                            <hr />
                            <div>
                                <strong>Endpreis:</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
