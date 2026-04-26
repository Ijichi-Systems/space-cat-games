/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isSupported, user } = useAuth();
  const version = __BUILD_INFO__.appVersion;

  return (
    <div className="topnav">
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/opensource">Source Code</Link>
      <Link to="https://space-cat-games.gitbook.io/space-cat-games-docs/">Documentation</Link>
      <Link to="/credits">Credits</Link>
      <Link to="/changelog">Changelog</Link>
      {(isSupported || user) && <Link to="/dashboard">Dashboard</Link>}
      <Link to="/settings" className="text-primary font-bold">Settings</Link>

      <div className="ml-auto flex items-center gap-1">
        <UserButton />
        <span className="px-4 text-text-muted text-[0.8rem] cursor-default whitespace-nowrap">
          v{version}
        </span>
      </div>
    </div>
  );
}
