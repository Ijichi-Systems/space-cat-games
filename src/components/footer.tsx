/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const version = __BUILD_INFO__.appVersion;
  const [uptime, setUptime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date("2024-05-21T00:00:00");

    const calculateUptime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setUptime({ days, hours, minutes, seconds });
    };

    calculateUptime();
    const interval = setInterval(calculateUptime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer>
      <div className="container text-center">
        <p>
          © 2026 Nijika Softworks &{" "}
          <a href="https://github.com/neurontechofficial">
            Neuron Technologies
          </a>{" "}
          | All rights reserved.
        </p>

        {/* Uptime Counter */}
        <div className="uptime-wrapper">
          <div className="uptime-label">SITE UPTIME</div>
          <div className="uptime-counter">
            <div className="uptime-unit">
              <span className="value">{uptime.days}</span>
              <span className="unit-label">DAYS</span>
            </div>
            <div className="uptime-unit">
              <span className="value">
                {uptime.hours.toString().padStart(2, "0")}
              </span>
              <span className="unit-label">HRS</span>
            </div>
            <div className="uptime-unit">
              <span className="value">
                {uptime.minutes.toString().padStart(2, "0")}
              </span>
              <span className="unit-label">MIN</span>
            </div>
            <div className="uptime-unit highlight">
              <span className="value">
                {uptime.seconds.toString().padStart(2, "0")}
              </span>
              <span className="unit-label">SEC</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="flex justify-center items-center gap-4 my-[10px]">
          <img src="images/react.png" width={150} height={60} />
          <img src="images/vite.svg" height={55} />
          <a href="https://www.wolfram.com/language/">
            <img src="images/wl.png" width={120} alt="Wolfram Language" />
          </a>
        </div>

        {/* Build Info, expect IDE to warn since these are set by vite/node on build  */}
        <div className="mt-5 text-[#666] text-[0.8rem]">
          <div>Built on: {new Date(__BUILD_INFO__.date).toLocaleString()}</div>
          <div>
            Node: {__BUILD_INFO__.node} | Vite: {__BUILD_INFO__.vite} | Version:{" "}
            {version}
          </div>
        </div>
      </div>
    </footer>
  );
}
