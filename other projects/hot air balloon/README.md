# North Sky Ballooning

Tailwind + React marketing site with a popup booking form and a lightweight Express backend for reservation management.

## Run locally

Install dependencies:

```bash
npm install
```

Start the API server in one terminal:

```bash
npm run server
```

Start the Vite frontend in another terminal:

```bash
npm run dev
```

## Booking flow

- Click **Book a Flight** on the homepage to open the splash-style reservation modal.
- Submissions are stored in `server/data/reservations.json`.
- Admins can review and respond to reservation requests at:

```text
http://localhost:5173/admin
```

## API routes

- `GET /api/reservations`
- `POST /api/reservations`
- `PATCH /api/reservations/:id/respond`
