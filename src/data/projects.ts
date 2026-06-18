export type Project = {
  slug: string;
  title: string;
  folder: string;
  summary: string;
  description: string;
  imageLabel: string;
  previewImage: string;
  previewAlt: string;
  accent: string;
  launchPath: string;
  launchLabel: string;
  repositoryUrl: string;
  sourceRevision: string;
  demoNote: string;
  stack: string[];
  highlights: string[];
  runSteps: string[];
};

export const projects: Project[] = [
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    folder: 'github.com/chadluman/weather-dashboard',
    summary:
      'A React and Tailwind weather app with city search, current conditions, and API-driven forecast data.',
    description:
      'Weather Dashboard is a Vite-powered React project that connects to OpenWeatherMap. It includes reusable search, weather card, and error message components so users can look up weather quickly from a responsive interface.',
    imageLabel: 'Live weather search',
    previewImage: '/images/projects/weather-dashboard.png',
    previewAlt: 'Live demo screenshot of the Weather Dashboard app',
    accent: 'from-[#f7fbff] via-[#6f7f8c] to-[#9b16f1]',
    launchPath: '/weather-dashboard/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/weather-dashboard',
    sourceRevision: 'ee98bc3a',
    demoNote:
      'Built directly from the repository source; weather requests use the portfolio server API.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'OpenWeatherMap API'],
    highlights: [
      'Component-based search and result cards',
      'Environment-based API key configuration',
      'Responsive Tailwind layout',
    ],
    runSteps: [
      'Set OPENWEATHER_API_KEY on the portfolio server',
      'Open /weather-dashboard/index.html',
    ],
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    folder: 'github.com/chadluman/Task_Manager',
    summary:
      'A collaborative task manager with accounts, teams, assignments, subtasks, progress tracking, and activity history.',
    description:
      'Task Manager combines a responsive vanilla JavaScript interface with an Express and MongoDB backend. It supports authenticated personal and team workflows, assignments, priorities, due dates, subtasks, progress totals, archives, and activity history.',
    imageLabel: 'Task workflow board',
    previewImage: '/images/projects/task-manager.png',
    previewAlt: 'Live demo screenshot of the Task Manager app',
    accent: 'from-[#eef4f7] via-[#b548ff] to-[#4f078a]',
    launchPath: '/apps/task-manager/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/Task_Manager',
    sourceRevision: '71981597',
    demoNote:
      'Exact repository front end with a browser-local demo API and sample team data.',
    stack: ['JavaScript', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    highlights: [
      'Authenticated personal and team task visibility',
      'Assignments, subtasks, progress, archives, and activity history',
      'Backend-enforced ownership and team boundaries',
    ],
    runSteps: [
      'Copy .env.example to .env and configure MongoDB and JWT_SECRET',
      'Run npm install, then npm start',
      'Open http://localhost:5501',
    ],
  },
  {
    slug: 'moveledger',
    title: 'MoveLedger',
    folder: 'github.com/chadluman/moveledger',
    summary:
      'A secure moving inventory app for tracking customers, moves, containers, itemized contents, photos, and printable records.',
    description:
      "MoveLedger uses a Node.js and MongoDB backend to keep each customer's moving inventory separate and persistent. It adds container photos, cross-move search, printable QR records, secure sessions, and optional AI-assisted photo inventory.",
    imageLabel: 'Inventory logging app',
    previewImage: '/images/projects/moveledger.png',
    previewAlt: 'Live demo screenshot of the MoveLedger inventory app',
    accent: 'from-[#f7fbff] via-[#9b16f1] to-[#0f0a18]',
    launchPath: '/apps/moveledger/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/moveledger',
    sourceRevision: '980bd3f8',
    demoNote:
      'Exact repository front end with browser-local persistence in place of MongoDB.',
    stack: ['JavaScript', 'Node.js', 'MongoDB', 'Sessions', 'OpenAI'],
    highlights: [
      'Customer-scoped moves, containers, items, and photos',
      'HTTP-only sessions with server-enforced ownership',
      'Searchable and printable inventory with QR records',
    ],
    runSteps: [
      'Copy .env.example to .env and configure MongoDB',
      'Run npm install, then npm start',
      'Open http://localhost:5510 and use the documented demo account',
    ],
  },
  {
    slug: 'north-sky-ballooning',
    title: 'North Sky Ballooning',
    folder: 'github.com/chadluman/flying-balloon',
    summary:
      'A React marketing and reservation site for hot air balloon booking.',
    description:
      'North Sky Ballooning combines a Tailwind and React front end with a lightweight Express backend. Visitors can book a flight through a popup reservation flow while admins review and respond to reservations.',
    imageLabel: 'Booking experience',
    previewImage: '/images/projects/north-sky-ballooning.png',
    previewAlt: 'Live demo screenshot of the North Sky Ballooning booking app',
    accent: 'from-[#6f7f8c] via-[#9b16f1] to-[#37045f]',
    launchPath: '/apps/north-sky-ballooning/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/flying-balloon',
    sourceRevision: '2bb07f70',
    demoNote:
      'Built directly from the repository source and connected to the portfolio reservation API.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express'],
    highlights: [
      'Popup booking form for flight reservations',
      'Express API for reservation management',
      'Admin route for reviewing requests',
    ],
    runSteps: [
      'npm install',
      'npm run server',
      'npm run dev',
      'Open http://localhost:5173/admin for admin review',
    ],
  },
  {
    slug: 'forbo-movement-systems',
    title: 'Forbo Movement Systems Sales Portal',
    folder: 'github.com/chadluman/ForboMovementSystems',
    summary:
      'An authenticated industrial sales workspace for customer lookup, product selection, conveyor configuration, and quote preparation.',
    description:
      'This internal sales portal brings customer records, purchase history, product comparison, conveyor configuration, engineering references, and draft quote workflows into one secure workspace backed by Express and MongoDB.',
    imageLabel: 'Industrial sales portal',
    previewImage: '/images/projects/forbo-movement-systems.png',
    previewAlt:
      'Live demo screenshot of the Forbo Movement Systems sales portal',
    accent: 'from-[#f6f6f4] via-[#d71920] to-[#232323]',
    launchPath: '/apps/forbo-movement-systems/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/ForboMovementSystems',
    sourceRevision: '6e175bfb',
    demoNote:
      'Exact repository front end with browser-local customer and quote data.',
    stack: ['JavaScript', 'Express 5', 'MongoDB', 'Mongoose', 'Secure cookies'],
    highlights: [
      'Authenticated customer lookup and quote history',
      'Product configuration and pull-force estimation',
      'Draft quote storage, print output, and JSON export',
    ],
    runSteps: [
      'Copy .env.example to .env and configure MongoDB and sales accounts',
      'Run npm install, then npm start',
      'Open http://localhost:3000 and sign in',
    ],
  },
  {
    slug: 'lyric-the-producer',
    title: 'Lyric the Producer',
    folder: 'github.com/chadluman/lyrictheproducer',
    summary:
      'An artist website for music releases, upcoming tracks, biography, booking, and streaming profiles.',
    description:
      'Lyric The Producer is a focused artist hub for current releases, upcoming music, personal background, streaming links, and direct booking inquiries. The portfolio demo mirrors the repository content and visual direction in a self-contained static experience.',
    imageLabel: 'Artist website',
    previewImage: '/images/projects/lyric-the-producer.png',
    previewAlt: 'Live demo screenshot of the Lyric The Producer artist website',
    accent: 'from-[#090909] via-[#a60bf6] to-[#ff3b30]',
    launchPath: '/apps/lyric-the-producer/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/lyrictheproducer',
    sourceRevision: 'f1742670',
    demoNote:
      'Static portfolio adaptation of the repository artist content, navigation, and visual system.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Spotify', 'Vercel'],
    highlights: [
      'Current and upcoming music release sections',
      'Spotify and Apple Music artist links',
      'Biography, booking details, and responsive navigation',
    ],
    runSteps: [
      'Install dependencies with npm install',
      'Configure artist content and streaming links in src/data/artist.ts',
      'Run npm run dev and open the local Next.js URL',
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
