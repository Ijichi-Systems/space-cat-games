/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isSupported, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const version = __BUILD_INFO__.appVersion;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="topnav">
      <div className="nav-container">

        {/* Hamburger Menu Icon */}
        <button
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/games" onClick={closeMenu}>Games</Link>
          <Link to="/opensource" onClick={closeMenu}>Source Code</Link>
          <Link to="https://bugs.meowcat.site/bugzilla/" onClick={closeMenu}>Report a Bug</Link>
          <Link to="https://space-cat-games.gitbook.io/space-cat-games-docs/" onClick={closeMenu}>Documentation</Link>
          <Link to="/settings" onClick={closeMenu} style={{ color: "#e74c3c", fontWeight: "bold" }}>Settings</Link>
        </div>

        <div className="nav-actions">
          <span className="version-tag">
            v{version}
          </span>
        </div>
      </div>
    </nav>
  );
}
