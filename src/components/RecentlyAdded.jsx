/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { useEffect, useState } from "react";
import posthog from 'posthog-js';

function RecentlyAdded({ games }) {
    const [showRecent, setShowRecent] = useState(false);

    useEffect(() => {
        // Check if feature flag is enabled for this visitor
        // PostHog returns false by default, but we also check if it's properly initialized
        try {
            const flag = posthog.isFeatureEnabled('RecentlyAdded');
            setShowRecent(flag === true);
        } catch (e) {
            console.warn('[RecentlyAdded] Feature flag check failed:', e);
            setShowRecent(false);
        }
    }, []);

    // Filter and sort games by addedDate (recently added first)
    const recentGames = [...games]
        .filter(g => g.addedDate)
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 6);

    return (
        <>
            {showRecent && recentGames.length > 0 && (
                <section className="recently-added-section">
                    <h2>Recently Added</h2>
                    <div className="games-grid">
                         {recentGames.map(game => (
                             <div key={game.url} className="game-item">
                                 <a href={game.url}>
                                     <img src={game.img} alt={game.alt || game.title} />
                                 </a>
                                 <p>{game.title}</p>
                             </div>
                         ))}
                     </div>
                </section>
            )}
        </>
    );
 }

export default RecentlyAdded;
