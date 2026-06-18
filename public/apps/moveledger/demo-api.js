(() => {
  const originalFetch = window.fetch.bind(window);
  const storageKey = 'moveledger-demo-data-v1';
  const user = { id: 'demo-user', name: 'Demo Customer', email: 'demo@moveledger.app' };
  const emptyData = () => ({ users: [user], moves: [], containers: [], items: [], photos: [], settings: { openAiApiKey: '' } });
  const readData = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || emptyData();
    } catch {
      return emptyData();
    }
  };
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  window.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, window.location.href);
    if (!url.pathname.startsWith('/api/')) return originalFetch(input, options);
    const method = (options.method || 'GET').toUpperCase();
    if (url.pathname === '/api/session') return json({ user, data: readData() });
    if (url.pathname === '/api/auth/logout') return json({ ok: true });
    if (url.pathname.startsWith('/api/auth/')) return json({ user, data: readData() });
    if (url.pathname === '/api/data' && method === 'PUT') {
      localStorage.setItem(storageKey, options.body || JSON.stringify(emptyData()));
      return json({ ok: true });
    }
    return json({ error: 'Demo API route not found.' }, 404);
  };
})();
