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
    previewAlt: 'Screenshot of the Weather Dashboard app',
    accent: 'from-[#f7fbff] via-[#6f7f8c] to-[#9b16f1]',
    launchPath: '/weather-dashboard/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/weather-dashboard',
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
    previewAlt: 'Screenshot of the Task Manager app',
    accent: 'from-[#eef4f7] via-[#b548ff] to-[#4f078a]',
    launchPath: '/apps/task-manager/index.html',
    launchLabel: 'Open interface preview',
    repositoryUrl: 'https://github.com/chadluman/Task_Manager',
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
    previewAlt: 'Screenshot of the MoveLedger inventory app',
    accent: 'from-[#f7fbff] via-[#9b16f1] to-[#0f0a18]',
    launchPath: '/apps/moveledger/index.html',
    launchLabel: 'Open interface preview',
    repositoryUrl: 'https://github.com/chadluman/moveledger',
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
    previewAlt: 'Screenshot of the North Sky Ballooning booking app',
    accent: 'from-[#6f7f8c] via-[#9b16f1] to-[#37045f]',
    launchPath: '/apps/north-sky-ballooning/index.html',
    launchLabel: 'Open live demo',
    repositoryUrl: 'https://github.com/chadluman/flying-balloon',
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
    previewImage: '/images/projects/forbo-movement-systems.svg',
    previewAlt: 'Graphic preview of the Forbo Movement Systems sales portal',
    accent: 'from-[#f6f6f4] via-[#d71920] to-[#232323]',
    launchPath: 'https://github.com/chadluman/ForboMovementSystems',
    launchLabel: 'View repository',
    repositoryUrl: 'https://github.com/chadluman/ForboMovementSystems',
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
      'A Next.js and TypeScript AI tools project with content generators, authentication, payments, and documentation.',
    description:
      'Lyric the Producer is a Next.js application built from an AI tools foundation. It demonstrates prompt-driven generators alongside account, payment, documentation, and deployment integrations in a production-style TypeScript project.',
    imageLabel: 'AI production toolkit',
    previewImage: '/images/projects/lyric-the-producer.svg',
    previewAlt: 'Graphic preview of the Lyric the Producer AI tools site',
    accent: 'from-[#11110f] via-[#7c3aed] to-[#d8ff3e]',
    launchPath: 'https://github.com/chadluman/lyrictheproducer',
    launchLabel: 'View repository',
    repositoryUrl: 'https://github.com/chadluman/lyrictheproducer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI', 'Vercel'],
    highlights: [
      'Prompt-driven content and naming tools',
      'Integrated authentication and payment surfaces',
      'Vercel-ready Next.js application structure',
    ],
    runSteps: [
      'Install dependencies with npm install',
      'Set OPENAI_API_KEY for server-side generation',
      'Run npm run dev and open the local Next.js URL',
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
