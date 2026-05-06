/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { useEffect, useState } from "react";
import posthog from 'posthog-js';

function RecentlyAdded({ games }) {
    const [showRecent, setShowRecent] = useState(false);

    useEffect(() => {
        const flag = posthog.isFeatureEnabled('RecentlyAdded');
        setShowRecent(flag);
    }, []);

    const recentGames = [...games]
        .filter(g => g.addedDate)
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 6);

    return (
        <>
            {showRecent && (
                <section>
                    <h2>Recently Added</h2>
                    <div className="games-grid">
                        {recentGames.map(game => (
                            <div key={game.url} className="game-item">
                                <button onClick={() => window.location.href = game.url}>
                                    <img src={game.img} alt={game.alt || game.title} />
                                </button>
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
