# Local Bistro Hub

A modern restaurant website and ordering experience — browse the menu, build your order, and get pickup info. Built as a full-stack app with a React SPA frontend and optional Express API.

---

## Live site

**[Visit Local Bistro Hub →](https://local-bistro-hub.netlify.app)**

*(Replace the link above with your actual Netlify URL if different.)*

**More demo sites:**
- [Flavor Haven](https://flavorhavendemo.netlify.app/)
- [Rosie's Kitchen](https://rosiekitchen.netlify.app/)

---

## Features

- **Home** — Hero, hours, location, and quick actions (Order, Menu, Call)
- **Menu** — Categorized menu (pizzas, sides, drinks) with descriptions and prices
- **Order** — Add items, adjust quantities, optional pickup time; order state persists in session storage
- **About** — Story and values
- **Contact** — Get in touch
- **Responsive UI** — Tailwind CSS, Radix-based components, Framer Motion
- **SPA routing** — Client-side routing with fallback for Netlify (no 404 on refresh)

---

## Tech stack

| Layer      | Tech |
|-----------|------|
| Frontend  | React 19, TypeScript, Vite 7, Wouter, TanStack Query, Framer Motion |
| UI        | Tailwind CSS 4, Radix UI, shadcn-style components |
| Backend   | Express 5 (optional), Passport, sessions |
| Data      | Drizzle ORM, PostgreSQL, Zod |
| Deploy    | Netlify (client-only SPA build) |

---

## Project structure

```
├── client/           # Vite + React app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── pages/
├── server/           # Express API (optional for full-stack)
├── shared/           # Shared schema (Drizzle, Zod)
├── script/           # Build script
├── netlify.toml      # Netlify build & SPA redirects
└── package.json
```

---

## Getting started

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm/yarn)

### Install

```bash
npm install
```

### Run locally

**Frontend only (no backend):**

```bash
npm run dev:client
```

Runs the Vite dev server at [http://localhost:5000](http://localhost:5000).

**Full stack (client + Express server):**

```bash
npm run dev
```

Requires a PostgreSQL database and env/config for the server.

### Build for production

```bash
npm run build
```

Client-only build (what Netlify uses):

```bash
npm run build:client
```

Output: `dist/public` (set as publish directory in `netlify.toml`).

### Other scripts

| Script       | Description |
|-------------|-------------|
| `npm run start`   | Run production server (after `npm run build`) |
| `npm run check`   | TypeScript check |
| `npm run db:push` | Push Drizzle schema to DB |

---

## Deployment (Netlify)

1. Connect this repo to Netlify.
2. Build settings in `netlify.toml`:
   - **Build command:** `npm run build:client`
   - **Publish directory:** `dist/public`
3. SPA redirects are already set: `/*` → `/index.html` (200) so routes like `/menu` and `/order` work on refresh.

No server-side env vars are required for the client-only deploy.

---

## License

MIT
