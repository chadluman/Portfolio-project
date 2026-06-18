(() => {
  const originalFetch = window.fetch.bind(window);
  const storageKey = 'task-manager-demo-data-v1';
  const team = { _id: 'team-demo', name: 'Portfolio Studio', slug: 'portfolio-studio' };
  const user = {
    _id: 'user-demo',
    id: 'user-demo',
    name: 'Demo Manager',
    email: 'demo@taskmanager.local',
    role: 'manager',
    team,
  };
  const teammate = {
    _id: 'user-teammate',
    id: 'user-teammate',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    role: 'member',
    team,
  };

  const seedTasks = [
    {
      _id: 'task-demo-1',
      title: 'Review the synchronized portfolio demos',
      priority: 'high',
      due: null,
      completed: false,
      archived: false,
      owner: user,
      assignedTo: user,
      assignedTeam: team,
      subtasks: [
        { _id: 'subtask-1', text: 'Open each project', completed: true },
        { _id: 'subtask-2', text: 'Exercise the main workflow', completed: false },
      ],
      history: [
        { _id: 'history-1', actor: user, action: 'created', detail: 'Created the task.', at: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  const readTasks = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || seedTasks;
    } catch {
      return seedTasks;
    }
  };
  const saveTasks = (tasks) => localStorage.setItem(storageKey, JSON.stringify(tasks));
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  const parseBody = (options) => {
    try {
      return JSON.parse(options?.body || '{}');
    } catch {
      return {};
    }
  };

  localStorage.setItem('task-manager-token', 'portfolio-demo-token');

  window.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, window.location.href);
    if (!url.pathname.startsWith('/api/')) return originalFetch(input, options);

    const method = (options.method || 'GET').toUpperCase();
    const body = parseBody(options);
    let tasks = readTasks();

    if (url.pathname === '/api/auth/me') return json({ user });
    if (url.pathname.startsWith('/api/auth/')) return json({ token: 'portfolio-demo-token', user });
    if (url.pathname === '/api/teams') return json({ teams: [team] });
    if (url.pathname === '/api/users') return json({ users: [user, teammate] });
    if (url.pathname === '/api/tasks' && method === 'GET') {
      const archived = url.searchParams.get('archived') === 'true';
      return json({ tasks: tasks.filter((task) => Boolean(task.archived) === archived) });
    }
    if (url.pathname === '/api/tasks' && method === 'POST') {
      const task = {
        _id: crypto.randomUUID(),
        title: body.title,
        priority: body.priority || 'medium',
        due: body.due || null,
        completed: false,
        archived: false,
        owner: user,
        assignedTo: body.assignedTo === teammate._id ? teammate : body.assignedTo ? user : null,
        assignedTeam: body.assignedTeam ? team : null,
        subtasks: [],
        history: [{ _id: crypto.randomUUID(), actor: user, action: 'created', detail: 'Created the task.', at: new Date().toISOString() }],
        createdAt: new Date().toISOString(),
      };
      tasks.unshift(task);
      saveTasks(tasks);
      return json({ task }, 201);
    }

    const match = url.pathname.match(/^\/api\/tasks\/([^/]+)(?:\/subtasks(?:\/([^/]+))?)?$/);
    if (!match) return json({ message: 'Demo API route not found.' }, 404);
    const task = tasks.find((item) => item._id === match[1]);
    if (!task) return json({ message: 'Task not found.' }, 404);

    if (!url.pathname.includes('/subtasks') && method === 'DELETE') {
      task.archived = true;
      task.history.push({ _id: crypto.randomUUID(), actor: user, action: 'archived', detail: 'Archived the task.', at: new Date().toISOString() });
      saveTasks(tasks);
      return json({ message: 'Task archived.' });
    }
    if (!url.pathname.includes('/subtasks') && method === 'PATCH') {
      Object.assign(task, body);
      if (body.completed) task.subtasks.forEach((subtask) => (subtask.completed = true));
      task.history.push({ _id: crypto.randomUUID(), actor: user, action: body.completed ? 'completed' : 'updated', detail: 'Updated in portfolio demo mode.', at: new Date().toISOString() });
    } else if (url.pathname.endsWith('/subtasks') && method === 'POST') {
      task.subtasks.push({ _id: crypto.randomUUID(), text: body.text, completed: false });
    } else if (url.pathname.endsWith('/subtasks') && method === 'PATCH') {
      task.subtasks = body.order.map((id) => task.subtasks.find((subtask) => subtask._id === id)).filter(Boolean);
    } else if (match[2] && method === 'PATCH') {
      Object.assign(task.subtasks.find((subtask) => subtask._id === match[2]), body);
    } else if (match[2] && method === 'DELETE') {
      task.subtasks = task.subtasks.filter((subtask) => subtask._id !== match[2]);
    }
    saveTasks(tasks);
    return json({ task });
  };
})();
