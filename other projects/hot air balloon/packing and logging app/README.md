# MoveLedger MVP

Browser-based moving inventory prototype for customers who need:

- account login
- move-by-move container tracking
- printable QR labels
- photo records for each container
- AI-assisted item suggestions from photos
- searchable item lookup and relocation

## Run it

### Legacy quick demo

Open [index.html](C:\Users\Luman\OneDrive\Desktop\hot air balloon\packing and logging app\index.html) in a browser.

### Mobile-ready build

This repo now also includes a mobile packaging path for iPhone using Capacitor.

1. Install dependencies with `npm install`
2. Build the web assets with `npm run build`
3. Run the packaged web build locally with `npm run dev`
4. Initialize the iOS project with `npm run ios:init`
5. Sync web changes into the native shell with `npm run cap:sync`
6. Open Xcode with `npm run cap:open:ios`

Native iOS compilation still needs macOS with Xcode and CocoaPods installed.

Demo login:

- `demo@moveledger.app`
- `demo1234`

## What works now

- Register and log in with browser-stored accounts
- Create multiple moves per user
- Create containers with QR payloads and printable labels
- Upload photos to preserve a visual packing record
- Add manual items or generate AI/demo item suggestions from the latest photo
- Search all items in the account by keyword
- Relocate items between containers or remove them

## Important MVP note

This version stores everything in browser local storage so the workflow can be tested quickly.

For production, these parts should move to a backend:

- authentication and user accounts
- image storage
- QR scan history
- OpenAI API calls
- insurance/export reports
- audit logs showing who changed an item and when

## What changed for App Store prep

- Source files now live in `src/`
- Production-ready web assets build into `www/`
- QR generation is bundled instead of loaded from a CDN
- Label printing now uses the current page instead of a popup window
- Capacitor config and iOS scripts are scaffolded at the repo root

## Suggested next build phase

1. Add a real backend with authenticated users.
2. Store photos in cloud storage and item records in a database.
3. Add QR scanning with phone camera support.
4. Generate PDF inventory reports for claims and military move documentation.
5. Move AI analysis to a secure server endpoint with human review/edit tools.
