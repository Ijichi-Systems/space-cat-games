/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import posthog from './posthog';

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
    if (!game) {
        console.error('[Analytics] No game object provided');
        return;
    }
    if (!game.title) {
        console.error('[Analytics] Game object missing title:', game);
        return;
    }

    // Only send the game title. No user IDs, IPs, or other PII.
    const payload = {
        game: game.title,
        timestamp: new Date().toISOString(),
        action: 'play'
    };

    console.log('[Analytics] Attempting to track play for:', game.title);

    if (ANALYTICS_ENDPOINT === 'YOUR_GOOGLE_APPS_SCRIPT_URL' || !ANALYTICS_ENDPOINT) {
        console.warn('[Analytics] Deployment needed or endpoint missing. Data:', payload);
    }

    // Capture to PostHog with enhanced data
    const posthogData = {
        game_title: game.title,
        game_url: game.url,
    };

    // Add optional properties if they exist
    if (game.img) posthogData.game_image = game.img;
    if (game.alt) posthogData.game_alt = game.alt;
    if (game.category) posthogData.game_category = game.category;
    if (game.tags) posthogData.game_tags = game.tags;

    posthog.capture('game played', posthogData);
    console.log('[Analytics] PostHog event captured:', posthogData);

    try {
        console.log('[Analytics] Sending request to:', ANALYTICS_ENDPOINT);
        // We use mode: 'no-cors' and no headers to make the request as "silent" as possible.
        // This avoids CORS preflight checks and handles Google's redirects automatically.
        const fetchPromise = fetch(ANALYTICS_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(payload)
        });

        // We return the promise so the caller can wait for it if needed
        return fetchPromise;
    } catch (error) {
        // Silently fail to not interrupt user experience
        console.error('[Analytics] Critical error during fetch setup:', error);
    }
};

/**
 * Flush PostHog events to ensure they're sent
 */
export const flushAnalytics = () => {
    try {
        if (posthog && typeof posthog.flush === 'function') {
            posthog.flush();
            console.log('[Analytics] PostHog events flushed');
        }
    } catch (e) {
        console.warn('[Analytics] Failed to flush events', e);
    }
};

