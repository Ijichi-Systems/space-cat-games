# games.jsx

\#

`games.jsx` is a special file; It loads `games.html` from `/public`, and embeds it.&#x20;

Step 1 in this process is to compute the runtime source to avoid Vite's static resolution warnings. We do this with:

```javascript
const iframeSrc = (typeof window !== 'undefined') ? `${window.location.origin}/games.html` : '/games.html';
```

Step 2 is setting the sandbox settings. Quoting the comment from the source code:

```js
/*
  Sandbox settings:
  - We intentionally DO NOT include `allow-same-origin` for stronger isolation.
  - We allow scripts/forms/popups so the static page can generally run, but because
    the iframe will be treated as a unique origin it cannot access the parent page.

  If you need the embedded page to share cookies / same-origin access with the host,
  change sandbox to include `allow-same-origin` but be aware that reduces isolation.
*/
```

We do this for security reasons. We set this with:

```javascript
const sandboxAttrs = "allow-scripts allow-forms allow-popups allow-modals";
```

The final step for most browsers is to load the content. This is done with:

```javascript
return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
        <iframe
            title="Space Cat Games - Games"
            src={iframeSrc}
            style={{ width: '100%', height: '100%', border: '0' }}
            sandbox={sandboxAttrs}
            referrerPolicy="no-referrer"
        />
```

Note that we set the page with the `iframeSrc` variable. We also use `sandboxAttrs` for the sandbox settings.



On older browsers where we can't do this, we load this block instead:

```html
<noscript>
    <div style={{ padding: 16 }}>
        <p>
            This site embeds the static games listing in an isolated frame. If you cannot see
            the embedded site, open it directly:
            {' '}
            <a href="/games.html" target="_blank" rel="noopener noreferrer">Open games page</a>.
        </p>
    </div>
</noscript>
```
