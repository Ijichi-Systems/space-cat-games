/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

/**
 * Privacy-friendly game analytics.
 * Records game plays without tracking personal information.
 */

// This should be replaced with the actual Google Apps Script Web App URL after deployment
const ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw12jSRDnHrxOZJnDanNn6xfSbOrQy_vRUn_N1Jv1ped9oEkdCJzZoaSR_16XAAesQc/exec';

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

    console.log('[Analytics] Tracking play for:', game.title);

    if (ANALYTICS_ENDPOINT === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        console.log('[Analytics] Deployment needed. Tracking:', payload);
        return;
    }

    try {
        // For Google Apps Script, we use 'no-cors' mode. 
        // This is because Google Apps Script redirects (302) the POST request to a different domain,
        // which usually triggers CORS blocks in standard 'cors' mode.
        // 'no-cors' allows the request to be sent even if we can't read the response.
        await fetch(ANALYTICS_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'omit', // Prevents sending cookies which can trigger security blocks
            headers: {
                'Content-Type': 'text/plain', // Using text/plain avoids preflight (CORS) checks
            },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        // Silently fail to not interrupt user experience
        console.error('[Analytics] Error reporting play:', error);
    }
};
