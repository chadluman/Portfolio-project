(() => {
  const originalFetch = window.fetch.bind(window);
  const quoteKey = 'forbo-sales-demo-quotes-v1';
  const rep = {
    name: 'Demo Sales Representative',
    email: 'sales@forbo.local',
    phone: '+1 704 948 0800',
    role: 'sales-representative',
  };
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  const readQuotes = () => {
    try {
      return JSON.parse(localStorage.getItem(quoteKey)) || [];
    } catch {
      return [];
    }
  };

  window.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, window.location.href);
    if (!url.pathname.startsWith('/api/')) return originalFetch(input, options);
    const method = (options.method || 'GET').toUpperCase();

    if (url.pathname === '/api/auth/me' || url.pathname === '/api/auth/login') return json({ rep });
    if (url.pathname === '/api/auth/logout') return json({ ok: true });
    if (url.pathname === '/api/products/sync') return json({ ok: true });
    if (url.pathname === '/api/customers/search') {
      const quotes = readQuotes();
      const hasQuery = url.searchParams.get('company') || url.searchParams.get('email');
      return json(
        hasQuery
          ? {
              customer: {
                company: 'Northwind Foods',
                contact: 'Morgan Lee',
                phone: '+1 555 014 2200',
                email: 'morgan@northwind.example',
                address: '210 Market Street, Charlotte, NC',
                application: 'Food processing conveyor',
                customerNumber: 'NW-1042',
                rep: rep.name,
              },
              purchases: quotes,
              quotes,
            }
          : { customer: null, purchases: [], quotes: [] },
      );
    }
    if ((url.pathname === '/api/quotes' || url.pathname === '/api/purchases') && method === 'POST') {
      const quotes = readQuotes();
      const savedAt = new Date().toISOString();
      const quoteNumber = `DEMO-${String(quotes.length + 1).padStart(4, '0')}`;
      quotes.unshift({ ...JSON.parse(options.body || '{}'), quoteNumber, savedAt, createdAt: savedAt });
      localStorage.setItem(quoteKey, JSON.stringify(quotes));
      return json({ ok: true, quoteNumber, savedAt }, 201);
    }
    return json({ error: 'Demo API route not found.' }, 404);
  };

  document.addEventListener(
    'error',
    (event) => {
      if (event.target instanceof HTMLImageElement && !event.target.dataset.demoFallback) {
        event.target.dataset.demoFallback = 'true';
        event.target.src = 'assets/products/product-02.png';
      }
    },
    true,
  );

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href$=".pdf"], a[href$=".xlsm"]').forEach((link) => {
      const file = link.getAttribute('href');
      link.href = `https://github.com/chadluman/ForboMovementSystems/blob/main/${encodeURI(file)}`;
      link.target = '_blank';
      link.rel = 'noreferrer';
    });
  });
})();
