---
icon: server
---

# How to deploy

## Let's get hosting!

So, when you go to host Space Cat Games, first know it is a React SPA (Single Page Application) project. That means there are build commands that are required to host Space Cat Games. Usually, most PaaS providers (Vercel, Netlify, Railway, etc) will know this, and autofill commands. **GitHub Pages** does not know this. (see "Hosting with GitHub Pages")

### Hosting with a PaaS provider (Vercel, Netlify, Railway, etc)

Hosting with a PaaS provider is quite easy. Following the steps below should have you up and running in around 5 minutes! (Please note Vercel is used in this example.)

#### 1 - Clone the repo in Vercel

Head over to [Vercel](https://vercel.com), and login/sign up. From there, press "Add New", and select "Project" from the combo box.

![Vercel "Add New" combo box](https://i.postimg.cc/pLPbf71r/vercel-project.png)

Once you are in the "Let's build something new" screen, paste the following URL into the "Enter a Git repository URL to deploy" box: `https://github.com/neurontechofficial/spacecatgames.git`

#### 2 - Deployment Settings

After entering that, you should see a screen that looks like the below image. ![Vercel Configuration Page](https://i.postimg.cc/cHBfnvK5/image.png)

Make sure the "Framework Preset" is set to **Vite** The "Build and Output Settings" should **NOT** be changed.

#### 3 - Hit that deploy button!

After a short build process, Space Cat Games will be deployed!

### Hosting with GitHub Pages or Selfhost - !! NOT RECOMMENDED !!

First off, we don't recommend hosting on GH Pages or with selfhost. Even though Space Cat Games uses a point release model, changes in those releases are rolling. Most commits bring new features or bug fixes, and unless you set up GH Actions, a cron job or a shell script to update for you, you will have to manually build and deploy all the time.

If you REALLY want to use GH Pages or selfhost, feel free to use this guide. And by selfhost, I mean you can't just upload the .JSX files to a server, or run them locally. If you want to run them locally, build the site and copy the dist/ folder.

#### 1 - Cloning the repo and setting up Node.

Step one is to locally clone the repo, and setup node.js. You will need git installed to do this, or a modern IDE like VSCode or PHPStorm. Before cloning, we need to install npm. You can get it from `https://www.npmjs.com` With git, run the following command in a terminal: `git clone https://github.com/neurontechofficial/spacecatgames.git`

#### 2 - Building with Vite

If you want to modify Space Cat Games in any way before building, **DO THAT NOW!** Once this is done, `cd` to the directory that Space Cat Games is in. Run the command `npm install` and then `vite build` (refer to [https://vite.dev/guide/build](https://vite.dev/guide/build) for more information on building.) Let this run, it may take a while. After building, you should get a "dist" folder.

#### 3 - Deploying

Once you have got the "dist" folder, upload this to where you want to deploy. Refer to GH Pages for more information on deploying with them. We cannot provide instructions on selfhosting.

***

Happy gaming!
