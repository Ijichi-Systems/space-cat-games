/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { Link } from "react-router-dom";
import UserButton from "./UserButton";

export default function Navbar() {
  const version = __BUILD_INFO__.appVersion;

  return (
    <div className="topnav">
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/opensource">Source Code</Link>
      <Link to="https://space-cat-games.gitbook.io/space-cat-games-docs/">Documentation</Link>
      <Link to="/credits">Credits</Link>
      <Link to="/changelog">Changelog</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/settings" style={{ color: '#e74c3c', fontWeight: 'bold' }}>Settings</Link>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <UserButton />
        <span
          style={{
            padding: "0 16px",
            color: "#888",
            fontSize: "0.8rem",
            cursor: "default",
            whiteSpace: "nowrap",
          }}
        >
          v{version}
        </span>
      </div>
    </div>
  );
}
