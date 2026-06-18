# Chad Luman Portfolio

A Next.js portfolio that presents Chad Luman's public GitHub projects as case studies with working browser demos, source links, and verified 1280 x 800 screenshots. The site also includes selected AI examples, authentication screens, Stripe pricing, and reservation functionality inherited from its original application template.

## Portfolio Projects

Every public project repository, other than this portfolio host, is represented in the project gallery.

| Project                             | Source stack                              | Live demo                                 | Demo strategy                                                              |
| ----------------------------------- | ----------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| Weather Dashboard                   | React, Vite, Tailwind CSS, OpenWeatherMap | `/weather-dashboard/index.html`           | Production build from the repository; weather requests use `/api/weather`  |
| Task Manager                        | JavaScript, Express, MongoDB, JWT         | `/apps/task-manager/index.html`           | Repository frontend with a browser-local API adapter                       |
| MoveLedger                          | JavaScript, Node.js, MongoDB, OpenAI      | `/apps/moveledger/index.html`             | Repository frontend with browser-local sample data                         |
| North Sky Ballooning                | React, Vite, Tailwind CSS, Express        | `/apps/north-sky-ballooning/index.html`   | Production build from the repository; reservation interaction is demo-safe |
| Forbo Movement Systems Sales Portal | JavaScript, Express, MongoDB              | `/apps/forbo-movement-systems/index.html` | Repository frontend with a browser-local API adapter and asset fallbacks   |
| Lyric the Producer                  | Next.js, TypeScript, Tailwind CSS         | `/apps/lyric-the-producer/index.html`     | Static portfolio adaptation matching the repository's content and design   |

Project metadata, GitHub URLs, demo destinations, and recorded source revisions live in `src/data/projects.ts`. The machine-readable source-to-demo mapping is maintained in `project-demos.json`.

## Live Demo Guarantees

- Every project card opens a usable demo instead of a placeholder page.
- Backend-dependent demos use isolated browser-local data. They do not connect to the original project's production database, authentication system, or customer data.
- Each gallery image is captured from its working demo at 1280 x 800 and stored in `public/images/projects`.
- The project detail pages display the repository and recorded source revision.
- `/api/projects/status` compares recorded revisions with the current GitHub default-branch head and reports current, drifted, or unavailable status.
- The projects page displays the result of that integrity check. Responses are cached for one hour to avoid unnecessary GitHub API traffic.

## Integrity Verification

Run the source and screenshot verifier before publishing portfolio changes:

```bash
npm run verify:projects
```

The verifier reads `project-demos.json` and checks that:

1. Each recorded revision matches the current GitHub repository head.
2. Files mapped as exact repository copies match their raw GitHub source after line-ending normalization.
3. Every configured screenshot exists, is a valid PNG, and is exactly 1280 x 800.

Run the browser smoke suite against a running production build:

```bash
npm run build
npm run start
npm run smoke:projects
```

The smoke suite requires Chrome or Edge. It loads the gallery, confirms all six images render, exercises a meaningful interaction in every demo, checks browser errors, and refreshes the proof screenshots after successful tests. Use `DEMO_BASE_URL` when the site is not running at `http://localhost:3000`.

Useful smoke-test options:

```bash
SMOKE_PROJECT=weather npm run smoke:projects
SMOKE_REQUIRE_WEATHER=false npm run smoke:projects
DEMO_BASE_URL=http://localhost:3001 npm run smoke:projects
```

On PowerShell, set these through `$env:NAME = "value"` before running the command.

## Automated Maintenance

`.github/workflows/project-integrity.yml` protects the catalog on pushes to `main`, pull requests, manual runs, and a weekly Monday schedule. CI installs dependencies, verifies repository synchronization, lints, builds, starts the production app, smoke-tests every demo, and uploads the captured screenshots as an artifact.

GitHub's automatic `GITHUB_TOKEN` is used for API requests in CI. Set a local `GITHUB_TOKEN` when you need a higher GitHub API rate limit; both the verifier and runtime status route support it.

The CI smoke test allows the Weather Dashboard UI to pass without a real weather response when `OPENWEATHER_API_KEY` is unavailable. Configure that secret to validate the complete live weather lookup in CI.

## Updating A Project

When a public repository changes:

1. Update or rebuild its corresponding demo under `public/apps` or `public/weather-dashboard`.
2. Preserve exact repository files where `project-demos.json` declares a file mapping.
3. Update `sourceRevision` in `src/data/projects.ts` and `revision` in `project-demos.json` to the same Git commit SHA.
4. Run `npm run verify:projects` to confirm source parity.
5. Build and start the portfolio, then run `npm run smoke:projects` to exercise each demo and regenerate screenshots.
6. Run `npm run lint`, `npm run build`, and `git diff --check` before committing.

Do not update a recorded revision without also reviewing the associated demo. A matching SHA should mean the portfolio representation was deliberately checked against that exact repository state.

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- ESLint
- Chrome DevTools Protocol browser testing
- GitHub REST and raw-content APIs
- NextAuth, OpenAI API, Stripe Checkout, and Nodemailer for optional application features

## Local Development

Requirements:

- Node.js 20 or newer
- npm
- Chrome or Microsoft Edge for browser smoke tests

Install and run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Create `.env.local` when testing integrations. Only add values for the features you use:

```bash
SITE_URL=http://localhost:3000
SITE_NAME=Chad Luman Portfolio
AUTHOR_NAME=Chad Luman

GITHUB_TOKEN=
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

Never commit `.env.local` or API credentials. Demo data is disposable and local to the visitor's browser.

## Commands

```bash
npm run dev              # Start the development server
npm run build            # Create the production build
npm run start            # Serve the production build
npm run lint             # Run ESLint
npm run verify:projects  # Verify GitHub revisions, mapped files, and screenshots
npm run smoke:projects   # Exercise the gallery and all six project demos
```

## Project Structure

```text
.github/workflows/project-integrity.yml  Scheduled and pull-request integrity CI
project-demos.json                        Repository, revision, demo, and screenshot manifest
scripts/verify-project-demos.mjs          GitHub source and screenshot verifier
scripts/smoke-project-demos.cjs           Headless browser workflow tests
src/app/api/projects/status/route.ts      Runtime GitHub revision status endpoint
src/app/(site)/projects                   Gallery and project detail routes
src/components/Projects                   Project cards and integrity status UI
src/data/projects.ts                      Portfolio project metadata
public/apps                               Static project demos
public/weather-dashboard                  Weather Dashboard production build
public/images/projects                    Verified live-demo screenshots
src/libs                                  Auth, email, markdown, and reservation helpers
src/markdown/docs                         Local documentation content
stripe/pricingData.ts                     Stripe pricing configuration
```

## Integration Notes

- Weather Dashboard live searches require `OPENWEATHER_API_KEY` on the portfolio server. Its standalone Vite source uses `VITE_OPENWEATHER_API_KEY`.
- OpenAI examples require `OPENAI_API_KEY` unless a supported UI supplies a temporary key.
- Stripe checkout requires valid price IDs in `stripe/pricingData.ts` and `STRIPE_SECRET_KEY`.
- Authentication providers require their matching OAuth credentials and `NEXTAUTH_SECRET`.
- Reservation persistence depends on the environment and should be validated separately before accepting real bookings.
