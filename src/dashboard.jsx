/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  usePlayHistory,
  getTotalPlays,
  getUniqueTitles,
  getFavoriteGame,
  getTopGames,
  getCountByDay,
  getLongestStreak,
} from './hooks/usePlayHistory';
import { useAuth } from './hooks/useAuth';
import Footer from './components/footer';

/* Activity Heatmap  */
function ActivityHeatmap({ countByDay }) {
  const today = new Date();

  const weeks = useMemo(() => {
    const days = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }
    const ws = [];
    for (let i = 0; i < days.length; i += 7) ws.push(days.slice(i, i + 7));
    return ws;
  }, []);

  const months = useMemo(() => {
    const labels = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(d.toLocaleString('default', { month: 'short' }));
    }
    return labels;
  }, []);

  const getColor = (count) => {
    if (!count) return '#1e1e2e';
    if (count <= 2) return '#0e4429';
    if (count <= 5) return '#006d32';
    if (count <= 9) return '#26a641';
    return '#39d353';
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '4px', paddingLeft: '20px' }}>
        {months.map((m, i) => (
          <span key={i} style={{ fontSize: '0.7rem', color: '#666', flex: 1, minWidth: '28px' }}>{m}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '3px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginRight: '4px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) =>
            i % 2 === 1 ? (
              <span key={d} style={{ fontSize: '0.65rem', color: '#555', lineHeight: '14px', height: '14px' }}>{d}</span>
            ) : (
              <span key={d} style={{ height: '14px', fontSize: '0.65rem' }} />
            )
          )}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((day) => {
              const count = countByDay[day] || 0;
              return (
                <div
                  key={day}
                  title={`${day}: ${count} play${count !== 1 ? 's' : ''}`}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 2,
                    background: getColor(count),
                    cursor: count ? 'default' : 'default',
                    transition: 'opacity 0.1s',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.7rem', color: '#666' }}>Less</span>
        {['#1e1e2e', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c) => (
          <div key={c} style={{ width: 11, height: 11, borderRadius: 2, background: c }} />
        ))}
        <span style={{ fontSize: '0.7rem', color: '#666' }}>More</span>
      </div>
    </div>
  );
}

/*  Stat Card  */
function StatCard({ label, value, sub }) {
  return (
    <div style={{
      background: '#1a1a2e',
      border: '1px solid #2a2a3e',
      borderRadius: '12px',
      padding: '20px 24px',
      flex: 1,
      minWidth: '140px',
    }}>
      <div style={{ fontSize: '2rem', fontWeight: '700', color: '#eee' }}>{value}</div>
      <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '4px' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>{sub}</div>}
    </div>
  );
}

/* Dashboard Page */
export default function Dashboard() {
  const { history } = usePlayHistory();
  const { user, isSupported } = useAuth();

  const countByDay = useMemo(() => getCountByDay(history), [history]);
  const totalPlays = getTotalPlays(history);
  const uniqueGames = getUniqueTitles(history);
  const favorite = getFavoriteGame(history);
  const topGames = getTopGames(history, 10);
  const streak = getLongestStreak(countByDay);
  const name = user?.user_metadata?.full_name || user?.email || 'Player';

  if (!isSupported && !user) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#eee' }}>Authentication Unavailable</h1>
        <p style={{ color: '#888' }}>
          Login is only available on the official <a href="https://spacecatgame.netlify.app" style={{ color: '#4285F4' }}>spacecatgame.netlify.app</a> domain.
        </p>
        <Link to="/" style={{ color: '#4285F4', marginTop: '20px', display: 'inline-block' }}>Return to Home</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard – Space Cat Games</title>
        <link href="/css/style.css" rel="stylesheet" />
      </Helmet>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#000000', marginBottom: '4px' }}>
            {user ? `${name}'s Dashboard` : 'My Dashboard'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Your personal play stats.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <StatCard label="Total Plays" value={totalPlays.toLocaleString()} />
          <StatCard label="Games Played" value={uniqueGames.toLocaleString()} sub="unique titles" />
          <StatCard
            label="Favorite Game"
            value={favorite ? `${favorite.count}×` : '—'}
            sub={favorite?.title ?? 'No plays yet'}
          />
          <StatCard label="Longest Streak" value={streak > 0 ? `${streak}d` : '—'} sub="consecutive days" />
        </div>

        {/* Activity heatmap */}
        <div style={{
          background: '#1a1a2e',
          border: '1px solid #2a2a3e',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ccc', marginBottom: '16px' }}>
            Play Activity
          </h2>
          {totalPlays === 0 ? (
            <p style={{ color: '#555', fontSize: '0.9rem' }}>
              No activity yet. <Link to="/games" style={{ color: '#4285F4' }}>Play some games</Link> to see your heatmap!
            </p>
          ) : (
            <ActivityHeatmap countByDay={countByDay} />
          )}
        </div>

        {/* Top games */}
        <div style={{
          background: '#1a1a2e',
          border: '1px solid #2a2a3e',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ccc', marginBottom: '16px' }}>
            Most Played
          </h2>
          {topGames.length === 0 ? (
            <p style={{ color: '#555', fontSize: '0.9rem' }}>Nothing yet — go play something!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topGames.map((g, i) => (
                <div key={g.title} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#555', fontSize: '0.8rem', width: '20px', textAlign: 'right' }}>
                    {i + 1}
                  </span>
                  <img
                    src={g.img}
                    alt={g.title}
                    width={36}
                    height={36}
                    style={{ borderRadius: '6px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/images/noimg.png'; }}
                  />
                  <span style={{ flex: 1, color: '#ddd', fontSize: '0.9rem' }}>{g.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      height: '6px',
                      borderRadius: '3px',
                      background: '#26a641',
                      width: `${Math.round((g.count / topGames[0].count) * 120)}px`,
                      minWidth: '4px',
                    }} />
                    <span style={{ color: '#888', fontSize: '0.8rem', minWidth: '48px', textAlign: 'right' }}>
                      {g.count} play{g.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div style={{
          background: '#1a1a2e',
          border: '1px solid #2a2a3e',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ccc', marginBottom: '16px' }}>
            Recent Activity
          </h2>
          {history.length === 0 ? (
            <p style={{ color: '#555', fontSize: '0.9rem' }}>No recent activity.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {history.slice(0, 15).map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={e.img}
                    alt={e.title}
                    width={32}
                    height={32}
                    style={{ borderRadius: '6px', objectFit: 'cover' }}
                    onError={(ev) => { ev.target.src = '/images/noimg.png'; }}
                  />
                  <span style={{ flex: 1, color: '#ddd', fontSize: '0.88rem' }}>{e.title}</span>
                  <span style={{ color: '#555', fontSize: '0.78rem' }}>
                    {new Date(e.timestamp).toLocaleString(undefined, {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
