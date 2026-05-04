export type Project = {
  slug: string;
  title: string;
  folder: string;
  summary: string;
  description: string;
  imageLabel: string;
  accent: string;
  launchPath: string;
  stack: string[];
  highlights: string[];
  runSteps: string[];
};

export const projects: Project[] = [
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    folder: "other projects/Weather-Dashboard",
    summary:
      "A React and Tailwind weather app with city search, current conditions, and API-driven forecast data.",
    description:
      "Weather Dashboard is a Vite-powered React project that connects to OpenWeatherMap. It includes reusable search, weather card, and error message components so users can look up weather quickly from a responsive interface.",
    imageLabel: "Live weather search",
    accent: "from-sky-400 via-cyan-300 to-emerald-300",
    launchPath: "/weather-dashboard/index.html",
    stack: ["React", "Vite", "Tailwind CSS", "OpenWeatherMap API"],
    highlights: [
      "Component-based search and result cards",
      "Environment-based API key configuration",
      "Responsive Tailwind layout",
    ],
    runSteps: [
      "Set OPENWEATHER_API_KEY on the portfolio server",
      "Open /weather-dashboard/index.html",
    ],
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    folder: "other projects/Task-Manager",
    summary:
      "A lightweight task tracking app built with plain HTML, CSS, and JavaScript.",
    description:
      "Task Manager focuses on the fundamentals: managing tasks in the browser with direct DOM interactions, clean styling, and a small footprint. It is a practical front-end project for organizing simple daily work.",
    imageLabel: "Task workflow board",
    accent: "from-amber-300 via-rose-300 to-red-400",
    launchPath: "/apps/task-manager/index.html",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "No-framework browser implementation",
      "Simple task workflow interactions",
      "Compact static project structure",
    ],
    runSteps: ["Open index.html in a browser"],
  },
  {
    slug: "moveledger",
    title: "MoveLedger",
    folder: "other projects/moveledger-vscode-ready",
    summary:
      "A browser-storage MVP for moving, packing, and logging inventory details.",
    description:
      "MoveLedger is packaged as a VS Code-ready local web app. It includes app files, a small static server, demo login details, and local browser storage for testing moving and inventory workflows.",
    imageLabel: "Inventory logging app",
    accent: "from-lime-300 via-teal-300 to-blue-400",
    launchPath: "/apps/moveledger/index.html",
    stack: ["HTML", "CSS", "JavaScript", "Node.js"],
    highlights: [
      "Local static server for development",
      "Demo login flow for quick testing",
      "Browser-storage MVP architecture",
    ],
    runSteps: ["npm install", "npm run start", "Open http://localhost:5500"],
  },
  {
    slug: "north-sky-ballooning",
    title: "North Sky Ballooning",
    folder: "other projects/hot air balloon",
    summary:
      "A React marketing and reservation site for hot air balloon booking.",
    description:
      "North Sky Ballooning combines a Tailwind and React front end with a lightweight Express backend. Visitors can book a flight through a popup reservation flow while admins review and respond to reservations.",
    imageLabel: "Booking experience",
    accent: "from-orange-300 via-fuchsia-300 to-indigo-400",
    launchPath: "/apps/north-sky-ballooning/index.html",
    stack: ["React", "Vite", "Tailwind CSS", "Express"],
    highlights: [
      "Popup booking form for flight reservations",
      "Express API for reservation management",
      "Admin route for reviewing requests",
    ],
    runSteps: ["npm install", "npm run server", "npm run dev", "Open http://localhost:5173/admin for admin review"],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
