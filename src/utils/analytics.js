/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

/**
 * Privacy-friendly game analytics.
 * Records game plays without tracking personal information.
 */

// This should be replaced with the actual Google Apps Script Web App URL after deployment
const ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxc3GfrybfRHm-Pt27ImQtKG-yLwmbQ7X6pddY33_0c2Uhfo7Pfd-oVynLGOjnXtEiCRg/exec';

/**
 * Tracks a game play event.
 * @param {Object} game - The game object being played.
 */
export const trackGamePlay = async (game) => {
    if (!game || !game.title) return;

    // Only send the game title. No user IDs, IPs, or other PII.
    const payload = {
        game: game.title,
        timestamp: new Date().toISOString(),
        action: 'play'
    };

    if (ANALYTICS_ENDPOINT === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        console.log('[Analytics] Deployment needed. Tracking:', payload);
        return;
    }

    try {
        // Use sendBeacon for "fire and forget" analytics if supported, 
        // otherwise use fetch. fetch with 'no-cors' is often enough for simple logging.
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
        } else {
            await fetch(ANALYTICS_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        }
    } catch (error) {
        // Silently fail to not interrupt user experience
        console.error('[Analytics] Error reporting play:', error);
    }
};
