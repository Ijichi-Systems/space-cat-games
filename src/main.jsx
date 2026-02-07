/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/navbar.tsx'
import Home from './index.jsx'
import Games from './games.jsx'
import Credits from './credits.jsx'
import Archive from './archive.jsx'
import Opensource from './opensource.jsx'
import Changelog from './changelog.jsx'
import Privacy from './privacy.jsx'
import DebugDashboard from './components/DebugDashboard.jsx'
import { useEplnxRefresh } from './hooks/useEplnxRefresh'

// Component to handle route changes and refresh ads
function RouteChangeHandler() {
    const location = useLocation()
    const { refreshEplnxAds } = useEplnxRefresh()

    useEffect(() => {
        // Refresh ads on every route change
        // Small delay to ensure DOM has updated with new ad slots
        const timer = setTimeout(() => {
            refreshEplnxAds()
        }, 100)

        return () => clearTimeout(timer)
    }, [location.pathname, refreshEplnxAds])

    return null
}

function App() {
    return (
        <BrowserRouter>
            <RouteChangeHandler />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/opensource" element={<Opensource />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/debug" element={<DebugDashboard />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

// Mount React
const rootEl = document.getElementById('root')
if (rootEl) {
    const root = createRoot(rootEl)
    root.render(<App />)
} else {
    console.warn('Root element not found; cannot mount React app')
}

