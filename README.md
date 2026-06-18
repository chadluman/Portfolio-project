# Portfolio Project

A Next.js portfolio site for showcasing full-stack and front-end projects, with embedded live demos, AI-powered example tools, authentication screens, Stripe pricing, and a small reservation workflow.

The app is built from an AI tools starter template, but the current project has been shaped into a personal portfolio hub. It highlights several standalone projects from the `other projects` folder and serves deployable demo builds from `public/apps`.

## What is included

- Portfolio landing page with about, project, pricing, docs, and auth routes.
- Project gallery with detail pages for each featured project.
- Embedded interface previews for Task Manager and MoveLedger, plus live demos for North Sky Ballooning and Weather Dashboard.
- Case studies and source links for every public project repository other than this portfolio host.
- AI example tools for article titles, business names, content writing, interview questions, product names, and spreadsheet prompts.
- API routes for OpenAI content generation, OpenWeatherMap weather lookups, Stripe checkout, and reservation management.
- Optional auth, email, Stripe, Mailchimp, and OpenAI integrations controlled by `integrations.config.tsx`.

## Featured projects

| Project                             | Stack                                     | Portfolio destination                   |
| ----------------------------------- | ----------------------------------------- | --------------------------------------- |
| Weather Dashboard                   | React, Vite, Tailwind CSS, OpenWeatherMap | `/weather-dashboard/index.html`         |
| Task Manager                        | JavaScript, Express, MongoDB, JWT         | `/apps/task-manager/index.html`         |
| MoveLedger                          | JavaScript, Node.js, MongoDB, OpenAI      | `/apps/moveledger/index.html`           |
| North Sky Ballooning                | React, Vite, Tailwind CSS, Express        | `/apps/north-sky-ballooning/index.html` |
| Forbo Movement Systems Sales Portal | JavaScript, Express, MongoDB              | `/projects/forbo-movement-systems`      |
| Lyric the Producer                  | Next.js, TypeScript, OpenAI, Vercel       | `/projects/lyric-the-producer`          |

Project metadata and GitHub source links live in `src/data/projects.ts`.

### Weather Dashboard

The Weather Dashboard searches live OpenWeatherMap conditions through the
portfolio API route at `/api/weather`.

- Search for any city and view temperature, conditions, humidity, wind,
  pressure, visibility, and sunrise/sunset data.
- Add a city after a successful lookup instead of using preset quick-city
  buttons.
- Reopen or remove saved cities from the dashboard.
- Keep saved cities between visits using browser `localStorage`.
- Prevent duplicate saved-city entries.

The portfolio-ready dashboard is served from
`public/weather-dashboard/index.html`. Its React and Vite source is maintained
in `other projects/Weather-Dashboard`.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth
- OpenAI API
- Stripe Checkout
- Nodemailer

## Getting started

Requirements:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

If `.env.example` is not present, create `.env.local` and add only the values you need from the environment variables below.

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Most features can be explored without configuring every integration. Add the keys for the parts you want to test.

```bash
SITE_URL=http://localhost:3000
SITE_NAME=Portfolio Project
AUTHOR_NAME=Your Name

OPENAI_API_KEY=
OPENWEATHER_API_KEY=

STRIPE_SECRET_KEY=

NEXTAUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=2525
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
```

The AI examples can also accept an API key through the `/ai-examples` UI for quick testing. For development or deployment, prefer `OPENAI_API_KEY` in the server environment.

## Useful scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Run the production build
npm run lint     # Run the configured Next.js lint command
```

## Project structure

```text
src/app                 Next.js routes and API endpoints
src/components          Shared UI sections and feature components
src/data/projects.ts    Portfolio project metadata
src/libs                Auth, email, markdown, and reservation helpers
src/markdown/docs       Local documentation content
public/apps             Static demo builds served by the portfolio
public/weather-dashboard Portfolio-ready Weather Dashboard
public/images/projects  Project preview images
other projects          Source folders for showcased projects, including Weather Dashboard
stripe/pricingData.ts   Stripe pricing plan data
```

## Notes

- The OpenAI generation route currently uses `gpt-3.5-turbo`.
- Weather Dashboard requires `OPENWEATHER_API_KEY` when run through the
  portfolio API route. The standalone Vite source uses
  `VITE_OPENWEATHER_API_KEY`.
- Stripe checkout requires valid Stripe price IDs in `stripe/pricingData.ts` and `STRIPE_SECRET_KEY`.
- Reservation data is handled by `src/libs/reservations.ts`; local and deployed storage behavior may differ depending on the environment.
