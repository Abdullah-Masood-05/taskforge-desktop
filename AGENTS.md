# TaskForge Desktop — agent notes

This app is Vite + React (JavaScript, CSS Modules) wrapped in Tauri 2.
Routing is react-router-dom with HashRouter — there is no server runtime,
no file-based routing, and no Next.js APIs anywhere in this repo.

- Env vars are `import.meta.env.VITE_*` (see `.env.example`).
- Auth gating lives in `src/routes/ProtectedRoute.jsx`, not middleware.
- The Rust side (`src-tauri/`) rarely needs changes; its CSP allowlist in
  `tauri.conf.json` must cover any new remote hosts you introduce.
