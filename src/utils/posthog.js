/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import posthog from 'posthog-js';

const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (key && host) {
    posthog.init(key, {
        api_host: host,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        loaded: () => {
            console.log('[PostHog] Initialized successfully');
        }
    });
} else {
    console.warn('[PostHog] Missing VITE_PUBLIC_POSTHOG_KEY or VITE_PUBLIC_POSTHOG_HOST');
}

export default posthog;
