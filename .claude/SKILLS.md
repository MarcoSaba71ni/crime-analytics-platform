# Frontend Skills — Source of Truth

This document is the authoritative reference for all frontend work on SafeSweden AI.
It covers design system, architecture patterns, routing, state management, API integration, and conventions.
Keep it up to date as the codebase evolves.

---

## Design System

### Colors

Defined as CSS variables in `frontend/src/index.css` and used throughout via `var(--color-*)` or Tailwind's arbitrary value syntax.

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#041F45` | Dark navy — backgrounds, headers, base surfaces |
| `--color-secondary` | `#E4B21C` | Gold — CTAs, active states, highlights, accent borders |
| `--color-tertiary` | `#dbeafe` | Light blue — hover states, tertiary fills |

Supporting palette (Tailwind utilities, not custom tokens):
- `bg-slate-800 / text-slate-500` — card fallback surfaces
- `bg-green-400 / text-green-400` — positive / resolved states
- `bg-red-600 / text-red-400` — negative / unresolved / alert states
- `bg-blue-500 / border-blue-500` — accent highlights
- `text-white/40`, `bg-white/10` — transparency overlays on dark surfaces

**Rule:** Always use CSS variable tokens for primary/secondary/tertiary. Use Tailwind utilities for one-off semantic colors (status, alerts). Do not hardcode hex values inline.

### Typography

Custom font **Redwing** is loaded via `@font-face` in `index.css`.

| Weight | File | Class |
|---|---|---|
| 300 (Light) | `Redwing-Light.otf` | default for `h1`, `h2`, `header li` |
| 500 (Medium) | `Redwing-Medium.otf` | `.redwing` utility class |

Font files live at `frontend/public/fonts/`.

**Rule:** Use Redwing for headings and branding elements. Body copy uses the browser default sans-serif stack via Tailwind. Apply `.redwing` class when Redwing is needed outside of heading tags.

### Spacing & Layout

Tailwind's default spacing scale applies. Key patterns in use:

- Page-level padding: `px-4 sm:px-8 lg:px-16`
- Cards: `rounded-xl`, `shadow-md`, `p-4` or `p-6`
- Section gaps: `gap-4`, `gap-6`, `gap-8`
- Responsive breakpoints: mobile-first — `sm:` (640px), `lg:` (1024px)

### Interactive States

- Scale on hover: `hover:scale-105 transition-transform`
- Color transition: `transition-colors`
- Active/pressed buttons: use `--color-secondary` border or background
- Disabled: `opacity-50 cursor-not-allowed`

### Icons

All icons come from **lucide-react**. Do not mix in other icon libraries.

---

## Architecture

### Directory Layout

```
frontend/src/
├── animations/          # GSAP scroll-trigger logic (one file per page/section)
├── assets/              # Static images, SVGs
├── components/          # Shared/reusable components
│   └── ComponentName/   # Folder per complex component (JSX + supporting files)
├── context/             # React Context providers and hooks
├── pages/               # Page-level components (one per route)
├── router/              # Route definitions and guards
├── store/               # Redux slices and store configuration
├── App.jsx              # Root component; handles scroll-to-top on navigation
├── App.css
├── index.css            # Global CSS: Tailwind import, CSS variables, fonts
└── main.jsx             # Entry point; wraps app in AuthProvider, Redux Provider, BrowserRouter
```

### Component Conventions

- **Simple components**: single `.jsx` file directly in `components/`.
- **Complex components** (own state, sub-files, animation logic): own folder `components/ComponentName/ComponentName.jsx`.
- Component file names and export names use **PascalCase**.
- No default exports from `index.js` barrel files — import the file directly.
- Keep components focused: if a component exceeds ~150 lines and handles multiple concerns, split it.

### Provider Stack (main.jsx)

```
<AuthProvider>          ← auth state (user, token, role)
  <Provider store>      ← Redux (saved crimes)
    <BrowserRouter>
      <App>             ← scroll-to-top on route change
        <Header/>
        <Router/>       ← all route definitions
```

---

## Routing

### Route Map

| Path | Component | Guard |
|---|---|---|
| `/` | `HomePage` | none |
| `/statistics` | `Statistics` | none |
| `/about` | `About` | none |
| `/crime-page` | `CrimePage` | none |
| `/crime-history` | `CrimeHistory` | none |
| `/zones` | `Zones` | none |
| `/auth/login` | `Login` | `PublicRoutes` (redirect to `/` if logged in) |
| `/auth/register` | `Register` | `PublicRoutes` (redirect to `/` if logged in) |
| `/profile` | `ProfilePage` | `ProtectedRoute` (redirect to `/auth/login` if not authenticated) |

Route definitions live in `router/Router.jsx`. Add new routes there.

### Route Guards

- **`ProtectedRoute`**: Requires `user && token` from AuthContext. Redirects to `/auth/login` if either is absent.
- **`PublicRoutes`**: Redirects to `/` if user & token are already present (prevents logged-in access to auth pages).

**Rule:** Any personalized or role-sensitive feature (saved areas, watchlist, reporting) must be behind `ProtectedRoute`.

---

## State Management

### When to Use What

| Scenario | Solution |
|---|---|
| Auth state (user, token, role) | React Context (`AuthContext`) |
| Cross-component persistent data (saved crimes) | Redux Toolkit slice |
| Local UI state (open/closed, form inputs, loading) | `useState` / `useReducer` |
| Server data not needing persistence | Local state with `useEffect` fetch |

### AuthContext (`context/AuthContext.jsx`)

State: `user`, `token`, `role` (derived from `user.role`).

Methods:
- `login(email, password)` — POST `/auth/login`, stores `access_token` and `user` in localStorage.
- `logout()` — clears auth state and localStorage.
- `setAuth(userData, accessToken)` — manual setter for token-based flows (e.g. registration).

On mount, validates token with `GET /auth/me`; logs out automatically if token is invalid.

localStorage keys: `access_token`, `user` (JSON string).

**Hook:** Always consume via `useAuth()` from `context/useAuth.jsx` — never import `AuthContext` directly.

**Role detection pattern:**
```js
const { role } = useAuth()
const isAnalyst = role?.toLowerCase() === 'analyst'
const isReporter = role?.toLowerCase() === 'crime_reporter'
```

### Redux Store (`store/`)

Single reducer: `saved` (from `savedSlice.js`).

**`savedSlice` actions:**

| Action | Payload | Effect |
|---|---|---|
| `toggleSavedCrime(crime)` | crime object | Add if not saved; remove if already saved |
| `deleteSavedCrime(crimeId \| crime)` | id or object | Remove specific crime |
| `clearSavedCrimes()` | — | Clear all saved crimes |
| `upsertSavedCrime(crime)` | crime object | Add or update existing |

All mutations auto-persist to `localStorage` key `savedCrimes`.

**Normalized crime shape** (what gets stored):
```js
{
  id, title, description, location, type,
  latitude, longitude,   // note: NOT lat/lng — normalized on save
  date, severity, source, image_url, image_alt
}
```

**Rule:** Analyst role only can save crimes. Gate save UI with `isAnalyst` check before dispatching.

---

## API Integration

### Base URL

```js
import.meta.env.VITE_API_URL   // set in .env.local
```

### Endpoints in Use

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/login` | Login with email + password → returns user + token |
| GET | `/auth/me` | Validate token on mount |
| GET | `/crimes?limit=100` | Fetch crime list for Zones/CrimeHistory |
| GET | `/crimes/proxy-image?url=...` | CORS-safe image proxy for crime images |

### Fetch Pattern

```js
useEffect(() => {
  let ignore = false
  async function fetchData() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/endpoint`)
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      if (!ignore) setData(data)
    } catch (err) {
      if (!ignore) setError(err.message)
    }
  }
  fetchData()
  return () => { ignore = true }
}, [deps])
```

**Rules:**
- Always use the `ignore` flag pattern in `useEffect` to prevent stale updates.
- Never serve raw individual crime records to the UI — aggregated data only (see CLAUDE.md constraints).
- Pass the auth token in `Authorization: Bearer <token>` header for protected endpoints.

---

## Form Conventions

Forms use controlled inputs with per-field `touched` state.

```js
const [form, setForm] = useState({ email: '', password: '' })
const [touched, setTouched] = useState({})
const [errors, setErrors] = useState({})

// On blur: mark field as touched
// On change: re-validate if already touched
// On submit: mark all fields touched, block if errors
```

**Rule:** Never show validation errors until the user has touched (blurred) a field. On submit, force-touch all fields to surface all errors at once.

---

## Data Visualization (Recharts)

Charts live in `Statistics.jsx`. All charts share:
- Dark theme colors matching the CSS variable palette.
- `DarkTooltip` custom component for consistent tooltip styling.
- `StatSection` wrapper component for the KPI + chart side-by-side layout.

Chart types in use: `AreaChart`, `BarChart` (horizontal + vertical), `PieChart` (donut).

**Rule:** Wrap every new chart section in `StatSection`. Use `DarkTooltip` for all tooltips.

---

## Map (Leaflet + react-leaflet)

`SwedishMap.jsx` and the inline map in `Zones.jsx` both use react-leaflet.

- Default center: Stockholm `[59.3293, 18.0686]`
- Default zoom: 12
- Tile source: OpenStreetMap (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
- Bounds detection: `BoundsTracker` component fires `onBoundsChange` on `moveend`/`zoomend`

**Rule:** Always filter crimes against current map bounds on the client (do not re-fetch on pan). Use the `ignore` flag pattern when fetching crimes initially.

---

## Animations (GSAP)

GSAP with `ScrollTrigger` plugin. Animation logic is extracted into `animations/` files (e.g. `animations/landing-page.js`).

- Initialize in `useEffect` with full cleanup: `ScrollTrigger.kill()` + `gsap.set()` on unmount.
- Always respect `prefers-reduced-motion`:
  ```js
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  ```
- Pin-based scroll sequences use `scrub: true` for smooth scrubbing.

---

## Accessibility Standards

- All interactive icon-only buttons must have `aria-label`.
- Toggle buttons must have `aria-pressed`.
- Button groups must have `role="group"` with a descriptive `aria-label`.
- Use semantic HTML: `<form>`, `<label>`, `<input>` with proper `id`/`htmlFor` pairing.
- Images must have meaningful `alt` text; decorative images use `alt=""`.

---

## Dependency Reference

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.5 | UI framework |
| `react-router-dom` | ^7.15.0 | Client-side routing |
| `@reduxjs/toolkit` | latest | Redux state management |
| `react-redux` | latest | React–Redux bindings |
| `recharts` | ^3.8.1 | Data visualization |
| `leaflet` + `react-leaflet` | ^1.9.4 / ^5.0.0 | Interactive maps |
| `gsap` | ^3.15.0 | Scroll-triggered animations |
| `lucide-react` | ^1.14.0 | Icons |
| `tailwindcss` | ^4.2.4 | Utility-first CSS |
| `vite` | ^8.0.10 | Build tool |

---

## What Belongs Where (Quick Reference)

| Task | Location |
|---|---|
| Add a new page | `pages/NewPage.jsx` + new `<Route>` in `router/Router.jsx` |
| Add a shared component | `components/MyComponent.jsx` or `components/MyComponent/` |
| Add a new auth-protected route | Wrap in `<ProtectedRoute>` in `Router.jsx` |
| Add global CSS variable | `src/index.css` `:root` block |
| Add a Redux action | New or existing slice in `store/` |
| Add GSAP animation | Extract to `animations/` file, initialize in `useEffect` |
| Add a new chart section | Wrap in `StatSection`, use `DarkTooltip`, add to `Statistics.jsx` |
