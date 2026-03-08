/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Credits() {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="container">
        <h1>Credits &amp; Acknowledgments</h1>
        <section className="credits-section">
          <h2>Space Cat Games is powered by:</h2>
          <ul className="credits-list">
            <li>
              <strong>React</strong>{" "}
              <a href="https://react.dev/">react.dev</a>
            </li>
            <li>
              <strong>node.js:</strong>{" "}
              <a href="https://nodejs.org/en">nodejs.org</a>
            </li>
            <li>
              <strong>JetBrains WebStorm</strong>{" "}
              <a href="https://www.jetbrains.com/webstorm/">jetbrans.com</a>
            </li>
            <li>
              <strong>
                <a href="https://www.wolfram.com/language/">
                  Wolfram Mathematica (Wolfram Language){" "}
                </a>
              </strong>
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
