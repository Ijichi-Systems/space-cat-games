/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet';
import Footer from './components/footer';

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('Loading post...');
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/posts.json`)
      .then(r => r.json())
      .then(data => {
        const foundPost = data.posts.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          setTitle(foundPost.title);
          return fetch(foundPost.file);
        } else {
          throw new Error('Post not found');
        }
      })
      .then(r => {
        if (!r.ok) throw new Error('Failed to load markdown');
        return r.text();
      })
      .then(text => {
        // Strip frontmatter from text if present
        const cleanedContent = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
        setContent(cleanedContent);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#eee' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#eee' }}>Post not found</h1>
        <Link to="/blog" style={{ color: '#4285F4' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{title} – Space Cat Games Blog</title>
      </Helmet>
      <div className="blog-post-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <Link to="/blog" style={{ color: '#4285F4', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          &larr; Back to all posts
        </Link>
        
        {post && (
          <div style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
            <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>{post.title}</h1>
            <div style={{ display: 'flex', gap: '20px', color: '#888', fontSize: '0.9rem' }}>
              <span>📅 {post.date}</span>
              {post.author && <span>👤 {post.author}</span>}
              {post.version && <span>🏷️ v{post.version}</span>}
            </div>
          </div>
        )}

        <article className="markdown-body" style={{ 
          color: 'var(--text-main)', 
          lineHeight: '1.6',
          fontSize: '1.1rem'
        }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => post ? null : <h1 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} {...props} />,
              h2: ({node, ...props}) => <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
              h3: ({node, ...props}) => <h3 style={{ color: 'var(--text-main)', marginTop: '1.5rem', marginBottom: '0.8rem' }} {...props} />,
              p: ({node, ...props}) => <p style={{ marginBottom: '1.2rem' }} {...props} />,
              a: ({node, ...props}) => <a style={{ color: '#4285F4', textDecoration: 'underline' }} {...props} />,
              ul: ({node, ...props}) => <ul style={{ marginBottom: '1.2rem', paddingLeft: '2rem' }} {...props} />,
              li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
              code: ({node, inline, ...props}) => (
                inline 
                  ? <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '4px' }} {...props} />
                  : <code style={{ display: 'block', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.2rem' }} {...props} />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
      <Footer />
    </>
  );
}
