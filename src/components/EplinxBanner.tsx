/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 * Eplinx Banner Component
 * 
 * This component loads the Eplinx ad script and renders an ad slot.
 * The script is loaded once globally and never removed to ensure ads
 * persist across page navigations in the React SPA.
 */

import { useEffect } from "react";

let scriptLoaded = false;

function EplinxBanner() {
    useEffect(() => {
        // Only load the script once globally
        if (scriptLoaded) {
            return;
        }

        // Check if script is already in DOM
        const existingScript = document.querySelector(
            'script[src="https://media.eplinx.net/js/code.min.js"]'
        );
        
        if (existingScript) {
            scriptLoaded = true;
            return;
        }

        const script = document.createElement("script");
        script.src = "https://media.eplnx.net/js/code.min.js";
        script.async = true;
        script.dataset.cfasync = "false";
        
        script.onload = () => {
            scriptLoaded = true;
            console.log("[Eplinx] Banner script loaded");
        };
        
        script.onerror = () => {
            console.error("[Eplinx] Failed to load banner script");
        };
        
        document.body.appendChild(script);
    }, []);

    return <ins className="ins-zone" data-zone="160108"></ins>;
}

export default EplinxBanner;
