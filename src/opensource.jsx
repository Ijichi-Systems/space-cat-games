/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Opensource() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/css/style.css" rel="stylesheet" type="text/css" />
      </Helmet>

      <div className="container">
        <h1>Source code and other code things!</h1>
        <section className="license-section">
          <h2>Development Statistics</h2>
          <a href="https://wakatime.com/badge/github/neurontechofficial/spacecatgames">
            <img
                src="https://wakatime.com/badge/github/neurontechofficial/spacecatgames.svg"
                alt="wakatime"
            />
          </a>
          <img alt="GitHub Release" src="https://img.shields.io/github/v/release/neurontechofficial/spacecatgames"/>
          <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/neurontechofficial/spacecatgames"/>
          <img alt="GitHub commit activity"
               src="https://img.shields.io/github/commit-activity/t/neurontechofficial/spacecatgames"/>
          <img alt="GitHub commits since latest release"
               src="https://img.shields.io/github/commits-since/neurontechofficial/spacecatgames/latest"/>
          <img alt="Codecov" src="https://img.shields.io/codecov/c/github/neurontechofficial/spacecatgames"/>


          <h2>Website Source Code</h2>
          <p>
            The Space Cat Games website is built using open web technologies.
            The source code for this website is freely available under the GNU
            General Public License v3.0.
          </p>
          <p>
            You can view and download the source code from the repository:
          </p>
          <div className="cta-section">
            <a
                href="https://github.com/Neurontechofficial/spacecatgames"
                className="btn"
            >
              View Source on GitHub
            </a>
          </div>
        </section>
        <section className="license-section">
          <h2>Old Release - 12.1.2</h2>
          <p>
            Want to roll back time and visit the last version before the revamp?
            Well here it is!.
          </p>
          <p>
            <strong>Warning:</strong> This is an unstable version and contains
            bugs or incomplete features.
          </p>
          <div className="cta-section">
            <a href="https://spacecatgame-dev.netlify.app" className="btn">
              Try 12.1.2
            </a>
          </div>
        </section>
        <section className="license-section">
          <h2>Old Release - Floppa Games 7.1</h2>
          <p>
            Want to roll back time and visit the last version before the
            rebrand? Well here it is!
          </p>
          <p>
            <strong>Warning:</strong> This is an unsupported, end of life
            version and will bugs or incomplete features.
          </p>
          <div className="cta-section">
            <a href="https://spacecatgameslegacy.netlify.app/" className="btn">
              Try 7.1
            </a>
          </div>
        </section>
        <section className="license-section">
          <h2>Game Licensing</h2>
          <p>
            The games featured on Space Cat Games come from various sources with
            different licensing terms:
          </p>
          <ul>
            <li>
              <strong>Open Source Games:</strong> Many games on our platform are
              available under open source licenses like MIT, GPL, or Apache. You
              can view the specific license for each game on its source
              repository.
            </li>
            <li>
              <strong>Educational Adaptations:</strong> Some games are
              educational adaptations of commercial titles, used for learning
              purposes only.
            </li>
            <li>
              <strong>Original Creations:</strong> We also feature original
              games created by independent developers who have chosen to share
              their work.
            </li>
          </ul>
          <p>
            We make every effort to respect the intellectual property rights of
            game creators. If you believe any content infringes on your rights,
            please contact us for prompt resolution.
          </p>
        </section>
        <section className="license-section">
          <h2>GNU General Public License v3.0</h2>
          <p>
            Our website code is licensed under the GNU GPL v3.0, which
            guarantees your freedom to:
          </p>
          <ul>
            <li>Use the software for any purpose</li>
            <li>Change the software to suit your needs</li>
            <li>Share the software and your changes with others</li>
          </ul>
          <p>
            The full text of the GNU GPL v3.0 is available at:
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.gnu.org/licenses/gpl-3.0.html
            </a>
          </p>
        </section>
        <section className="license-section">
          <h2>Contributing</h2>
          <p>
            We welcome contributions to improve Space Cat Games! Here's how you
            can help:
          </p>
          <ul>
            <li>
              <strong>Report Bugs:</strong> Let us know if you find any issues
              or bugs.
            </li>
            <li>
              <strong>Suggest Features:</strong> Have ideas for improving the
              site? We'd love to hear them.
            </li>
            <li>
              <strong>Submit Code:</strong> Developers can submit pull requests
              with improvements or new features.
            </li>
            <li>
              <strong>Add Games:</strong> If you've created a browser game or
              know of a good one, suggest it for inclusion.
            </li>
          </ul>
        </section>
      </div>

      <Footer />
      {/* FPS Counter */}
      <div
        id="fps-counter"
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          background: "rgba(20, 20, 20, 0.8)",
          color: "#0f0",
          fontFamily: "monospace",
          fontSize: 16,
          padding: "6px 12px",
          borderRadius: 6,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        FPS: --
      </div>
    </>
  );
}
