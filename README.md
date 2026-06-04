# Rainhard Bonnke — Portfolio

Modern React portfolio showcasing full-stack development work.

## Stack

- React 19 + Vite
- Vanilla CSS (dark theme, responsive)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Option A: Import from GitHub (recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. Import [Rainhard-Bonnke/portfolio](https://github.com/Rainhard-Bonnke/portfolio).
3. Vercel detects Vite automatically. Keep:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

Future pushes to `main` redeploy automatically.

### Option B: Vercel CLI

```bash
npm install
npx vercel login
npm run deploy
```

## Contact form

The contact form posts to the existing Google Apps Script endpoint configured in `src/data/site.js`.

## CV

Your resume lives at `public/Rainhard-bonnke-cv.docx` for the download button.
