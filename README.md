
# Space Cat Games

**The free and open source way to host a games website!**

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/spacecatgames) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/f795125c-9403-49b7-9e84-ae0c0c4df19e/deploy-status)](https://app.netlify.com/projects/spacecatgame/deploys)
[![wakatime](https://wakatime.com/badge/user/dde58933-1038-4e79-920c-d923c92f1fa4/project/243db57b-c9df-4b25-b6b6-990b204ce8a5.svg)](https://wakatime.com/badge/user/dde58933-1038-4e79-920c-d923c92f1fa4/project/243db57b-c9df-4b25-b6b6-990b204ce8a5)
![GitHub repo size](https://img.shields.io/github/repo-size/neurontechofficial/spacecatgames)


Space Cat Games is a small, easy-to-deploy React single-page application (SPA) that builds to static HTML, CSS, and JavaScript. Drop the built files into the document root of any static host and your games website is ready — no deep coding knowledge required.

---

## Features

- Minimal, easy-to-deploy static site  
- Built with React (SPA)  
- Works on any static host  
  - GitHub Pages  
  - Netlify  
  - Vercel  
  - Apache  
  - nginx  
  - Plain file hosting  
- Lightweight and easy to customize  

---

## Prerequisites

- Node.js (LTS recommended, e.g. 18.x or newer)
- npm (bundled with Node) or Yarn
- git (optional, to clone the repo)
- (Optional) Docker for containerized builds

Check `package.json` in the repository for exact Node/npm compatibility and available scripts.

---

## Quick Start (Development)

### Clone the repository

```bash
git clone https://github.com/neurontechofficial/spacecatgames.git
cd spacecatgames
```

### Install dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn
```

### Start the development server

```bash
npm run dev
```

or

```bash
yarn run dev
```

This usually starts a dev server (commonly at `http://localhost:3000/`) with hot reloading.  

---

## Build for Production (Static Files)

### Create a production build

```bash
npm run build
```

or

```bash
yarn build
```

After building, a folder called `dist/` will be created. The contents (`index.html`, JS, and CSS assets) are static files you can upload to any static host.

### Preview the production build locally

```bash
npx serve -s build
```

or

```bash
npm install -g serve
serve -s build
```

---

## Deploying

### Static hosts

Upload the contents of the `dist/` folder to your host root.

### GitHub Pages

Use the `gh-pages` package or GitHub Actions to publish the build folder.

### Netlify / Vercel

- Build command: `npm run build`
- Publish directory: `dist`

### Manual webserver (nginx / Apache)

Copy the built files into your web root.

> If your app uses client-side routing, configure your host to serve `index.html` for all routes (see **Troubleshooting**).

---

## Docker (Experimental/Unknown)

Example multi-stage Dockerfile that builds the app and serves it with nginx:

```Dockerfile
# build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and run

```bash
docker build -t spacecatgames .
docker run -p 8080:80 spacecatgames
```

---

## Configuration & Environment

- If the app uses environment variables, check for `.env.example` or references in `package.json` or source files.
- For Create React App (CRA) apps, environment variables used in client-side code should be prefixed with `REACT_APP_`.
- Check the source and `package.json` for any runtime config or API endpoints that need adjustment.

---


## Troubleshooting

### Development server won't start

- Ensure Node and npm versions are compatible.
- Delete dependencies and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails

- Read the build output for missing modules or syntax errors.
- Ensure environment variables required at build time are provided.

### SPA refresh / 404 on page reload

Configure your host to rewrite unknown routes to `index.html`.

**Netlify**: add a `_redirects` file with:

```text
/*    /index.html   200
```

**nginx**:

```nginx
location / {
  try_files $uri /index.html;
}
```

**Apache**:

- Enable `mod_rewrite`
- Add a fallback to `index.html`

---

## Contributing

Contributions are welcome! Suggested workflow:

1. Fork the repo
2. Create a branch:
   ```bash
   git checkout -b feat/your-change
   ```
3. Make changes and run the app (and tests, if any)
4. Commit and push your changes
5. Open a Pull Request with:
   - A clear description
   - Testing or verification steps
