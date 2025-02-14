"use client";

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="card w-75">
            <div className="row g-0">
              <div className="col-md-8 p-3">
                <div className="card mb-3">
                  <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseCase" style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                    <div className="row">
                      <div className="col-1 border-end d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pc" viewBox="0 0 16 16">
                          <path d="M5 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"/>
                        </svg>
                      </div>
                      <div className="col-11">
                        <strong>Gehäuse</strong>
                      </div>
                    </div>
                  </div>
                  <div className="collapse" id="collapseCase">
                    <div className="card-body">
                      <div className="card mb-2">
                        <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseATX" style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                          ATX
                        </div>
                        <div className="collapse" id="collapseATX">
                          <div className="card-body"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseCPU" style={{ borderRadius: "5px", borderColor: "lightgrey" }}>
                    <div className="row">
                      <div className="col-1 border-end d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cpu" viewBox="0 0 16 16">
                          <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3z"/>
                        </svg>
                      </div>
                      <div className="col-11">
                        <strong>Prozessor</strong>
                      </div>
                    </div>
                  </div>
                  <div className="collapse" id="collapseCPU">
                    <div className="card-body"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 bg-light p-3">
                <div className="row">
                  <div className="col-4">
                    <Image src="https://gzhls.at/i/60/05/3326005-n0.jpg" width={80} height={80} alt="PC-Konfiguration" />
                  </div>
                  <div className="col-8 d-flex justify-content-center align-items-center">
                    <h5>PC-Konfiguration</h5>
                  </div>
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
