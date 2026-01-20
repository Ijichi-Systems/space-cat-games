/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
    const [buildId, setBuildId] = useState("");
    const [tip, setTip] = useState("");
    const [header, setHeader] = useState("");

    const tips = [
        "Aishite Aishite Aishite!",
        "Mayday! Go ahead and fire away!",
        "webstorm better than vscode lmao",
        "quick release christmas day lmfao - meowcat767",
        "1 year of service!",
        "The most Cutting Edge games website.",
        "Cirno is behind you by the way.",
        "did you know that for some reason this is react now?",
    ];

    useEffect(() => {
        const version = __BUILD_INFO__.appVersion;
        // Header randomization
        if (Math.random() < 0.1) {
            setHeader(`スペースキャットゲーム バージョン${version}`);
        } else {
            setHeader(`Welcome to Space Cat Games ${version} - Hello, React!`);
        }

        // Random tips
        const pickTip = () =>
            setTip(tips[Math.floor(Math.random() * tips.length)]);
        pickTip();
        const interval = setInterval(pickTip, 5000);

        // Build ID - prefer local build info which is now accurate
        if (__BUILD_INFO__.gitCommit !== 'unknown') {
            setBuildId("Build: " + __BUILD_INFO__.gitCommit);
        } else {
            fetch("https://api.github.com/repos/Starry-Systems/spacecatgames/commits?per_page=1")
                .then(r => r.json())
                .then(d => {
                    if (d?.[0]?.sha) {
                        setBuildId("Build ID: " + d[0].sha.slice(0, 7));
                    } else {
                        setBuildId("Session ID: " + Math.random().toString().slice(2, 10));
                    }
                })
                .catch(() =>
                    setBuildId("Session ID: " + Math.random().toString().slice(2, 10))
                );
        }

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Helmet>
                <title>Space Cat Games - Home</title>
                <meta name="description" content="The worlds best free and open source games website!" />
                <meta name="keywords" content="games, open source, browser games" />
                <meta property="og:title" content="Space Cat Games - Home" />
                <meta property="og:type" content="website" />
            </Helmet>


            <div className="hero">
                <div className="container">
                    <h1 id="main-header">{header}</h1>
                    <div id="build-id">{buildId}</div>
                    <div id="random-tip" className="random-tip">{tip}</div>

                    <br />
                    <a href="/games" className="btn">Play Now</a>
                    <!-- Eplinx.com / Banner / 120x240 --><ins class="ins-zone" data-zone="160013"></ins><script data-cfasync="false" async src="https://media.eplinx.net/js/code.min.js"></script><!-- /Eplinx.com -->
                </div>
            </div>

            <div className="container">
                <section className="features">
                    <h2>Why Play at Space Cat Games?</h2>

                    <div className="features-grid">
                        <Feature title="Free Games" text="All games are free. No subscriptions." />
                        <Feature title="No Downloads" text="Instant browser play. OpenGL required." />
                        <Feature title="Variety" text="From classics to modern community hits." />
                        <Feature title="Open Source" text="Fork it. Break it. Improve it." />
                    </div>
                </section>

                <section className="featured-games">
                    <h2>Featured Games</h2>

                    <div className="games-grid">
                        <Game title="SuperTuxKart"
                            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wVhcyQV-z7il2CAUbDkZJKkWTUe9lrR_3A&s"
                            url="https://supertuxkart.pages.dev/" />

                        <Game title="Minecraft"
                            img="https://i.ibb.co/tT7XZRMW/Grass-Block-JE2.webp"
                            url="/games/minecraft.html" />

                        <Game title="Crazy Cattle 3D"
                            img="/images/cattlemoment.webp"
                            url="/games/clcrazycattle3d.html" />
                        <!-- Eplinx.com / Banner / 120x240 --><ins class="ins-zone" data-zone="160013"></ins><script data-cfasync="false" async src="https://media.eplinx.net/js/code.min.js"></script><!-- /Eplinx.com -->
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

function Feature({ title, text }) {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Game({ title, img, url }) {
  const handleClick = () => {
    // Check if URL is external (starts with http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      // Open external links in new tab
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Use regular browser navigation for internal game routes
      // These are actual static HTML files that need to be loaded from the public directory
      window.location.href = url;
    }
  };

  return (
    <div className="game-item">
      <button onClick={handleClick}>
        <img src={img} alt={title} />
      </button>
      <p>{title}</p>
    </div>
  );
}
