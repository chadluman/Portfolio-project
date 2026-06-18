import { projects } from '@/data/projects';

export default function sitemap() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);
  const routes = ['', '/about', '/projects', ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
