/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from './components/footer';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts.json')
      .then(r => r.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load blog posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog – Space Cat Games</title>
      </Helmet>
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <h1 style={{ color: '#eee', marginBottom: '10px' }}>Blog & News</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>Updates, announcements, and more from Space Cat Games.</p>
        
        {loading ? (
          <div style={{ color: '#eee' }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ color: '#555' }}>No posts found.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {posts.map(post => (
              <div 
                key={post.slug} 
                style={{ 
                  background: '#1a1a2e', 
                  border: '1px solid #2a2a3e', 
                  borderRadius: '12px', 
                  padding: '24px',
                  transition: 'transform 0.2s',
                }}
              >
                <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <span>📅 {post.date}</span>
                  {post.author && <span>👤 {post.author}</span>}
                  {post.version && <span>🏷️ v{post.version}</span>}
                </div>
                <h2 style={{ margin: '0 0 12px 0' }}>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    style={{ color: '#4285F4', textDecoration: 'none', fontSize: '1.5rem', fontWeight: '700' }}
                  >
                    {post.title}
                  </Link>
                </h2>
                <Link 
                  to={`/blog/${post.slug}`} 
                  style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  Read more &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
