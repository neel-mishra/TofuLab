# Deploy TofuLab to Vercel

## 1. Push to GitHub

The code is committed and the remote is set to your repo. Push using **your** GitHub account (the push from this environment failed due to different credentials):

```bash
cd "/Users/neelmishra/.cursor/projects/Landing Pages/landingpage"
git push -u origin main
```

If you use SSH:
```bash
git remote set-url origin git@github.com:neel-mishra/TofuLab.git
git push -u origin main
```

If you're prompted for a password, use a [Personal Access Token](https://github.com/settings/tokens) (HTTPS) or ensure your SSH key is added to GitHub.

---

## 2. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (with GitHub if you like).
2. Click **Add New…** → **Project**.
3. **Import** the `neel-mishra/TofuLab` repository (GitHub may ask for authorization once).
4. Vercel will detect Next.js. Keep the defaults:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `next build` (default)
   - **Output Directory:** (default)
5. Click **Deploy**. Vercel will build and give you a URL (e.g. `tofulab-xxx.vercel.app`).

Future pushes to `main` will trigger automatic deployments (see `vercel.json`).

---

## Optional: Deploy from your machine with Vercel CLI

```bash
cd "/Users/neelmishra/.cursor/projects/Landing Pages/landingpage"
npx vercel login
npx vercel
```

Follow the prompts to link the project and deploy.
