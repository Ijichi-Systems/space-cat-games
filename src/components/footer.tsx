/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/credits">Credits</Link>
          <Link to="/opensource">Open Source</Link>
          <Link to="/changelog">Changelog</Link>
        </div>

        <p className="copyright">
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
        <div className="flex justify-center items-center gap-4 my-10">
          <a href="https://github.com/Starry-Systems/">
            <img
              src="https://avatars.githubusercontent.com/u/241321890?s=200&v=4"
              className="h-[100px] w-auto md:h-[150px]"
              alt="GitHub"
            />
          </a>
          <a href="https://nijikasoftworks.meowcat.site/">
            <img
              src="images/ns_yellow.png"
              className="h-[100px] w-auto md:h-[150px]"
              alt="Nijika Softworks"
            />
          </a>
        </div>

        {/* Built with badges */}
        <div className="flex justify-center items-center gap-4 my-6 opacity-60">
          <img src="images/react.png" height={30} className="h-[30px] w-auto" alt="React" />
          <img src="images/vite.svg" height={25} className="h-[25px] w-auto" alt="Vite" />
          <a href="https://www.wolfram.com/language/">
            <img src="images/wl.png" height={30} className="h-[30px] w-auto" alt="Wolfram Language" />
          </a>
        </div>
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
