/* eslint-disable @typescript-eslint/no-require-imports */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const WebSocket = require('next/dist/compiled/ws');

const baseUrl = process.env.DEMO_BASE_URL || 'http://localhost:3001';
const requireLiveWeather = process.env.SMOKE_REQUIRE_WEATHER !== 'false';
const port = 9300 + Math.floor(Math.random() * 400);
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) =>
  fs.existsSync(candidate),
);

if (!chromePath) {
  console.error('Chrome or Edge is required for project demo smoke tests.');
  process.exit(1);
}

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-demo-smoke-'));
const browser = spawn(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--disable-extensions',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { detached: false, stdio: 'ignore', windowsHide: true },
);

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const waitForBrowser = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await delay(100);
  }
  throw new Error('Headless browser did not start.');
};

const createSession = async () => {
  const response = await fetch(
    `http://127.0.0.1:${port}/json/new?about:blank`,
    { method: 'PUT' },
  );
  const target = await response.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.once('open', resolve);
    socket.once('error', reject);
  });
  let sequence = 0;
  const pending = new Map();
  const exceptions = [];
  socket.on('message', (buffer) => {
    const message = JSON.parse(buffer.toString());
    if (message.method === 'Runtime.exceptionThrown') {
      exceptions.push(message.params.exceptionDetails.text);
    }
    if (!message.id || !pending.has(message.id)) return;
    const handler = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  await send('Runtime.enable');
  await send('Page.enable');
  return { socket, send, exceptions };
};

const tests = [
  {
    name: 'Projects gallery screenshots',
    path: '/projects',
    screenshot: 'projects-gallery.png',
    fullPage: true,
    expression: `(async () => {
      const images = [...document.querySelectorAll('img[alt^="Live demo screenshot"]')];
      for (const image of images) {
        image.scrollIntoView({ block: 'center' });
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      return images.length === 6 && images.every((image) => image.complete && image.naturalWidth > 0);
    })()`,
  },
  {
    name: 'Task Manager',
    path: '/apps/task-manager/index.html',
    screenshot: 'task-manager.png',
    expression: `(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const input = document.querySelector('#task-input');
      input.value = 'Browser smoke task';
      document.querySelector('#task-form').requestSubmit();
      await new Promise((resolve) => setTimeout(resolve, 250));
      return document.body.innerText.includes('Demo Manager') && document.body.innerText.includes('Browser smoke task');
    })()`,
  },
  {
    name: 'MoveLedger',
    path: '/apps/moveledger/index.html',
    screenshot: 'moveledger.png',
    expression: `(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      document.querySelector('#moveName').value = 'Browser Smoke Move';
      document.querySelector('#moveOrigin').value = 'Nashville, TN';
      document.querySelector('#moveDestination').value = 'Clarksville, TN';
      document.querySelector('#moveDate').value = '2026-07-01';
      document.querySelector('#moveForm').requestSubmit();
      await new Promise((resolve) => setTimeout(resolve, 250));
      return document.body.innerText.includes('Demo Customer') && document.body.innerText.includes('Browser Smoke Move');
    })()`,
  },
  {
    name: 'North Sky Ballooning',
    path: '/apps/north-sky-ballooning/index.html',
    screenshot: 'north-sky-ballooning.png',
    expression: `(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const button = [...document.querySelectorAll('button')].find((item) => item.textContent.includes('Book a Flight'));
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 150));
      return document.body.innerText.includes('Send reservation request');
    })()`,
  },
  {
    name: 'Forbo Movement Systems',
    path: '/apps/forbo-movement-systems/index.html',
    screenshot: 'forbo-movement-systems.png',
    wait: 4500,
    expression: `(async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const gatewayReady = !document.querySelector('#customerGateway').hidden;
      document.querySelector('#newCustomerButton').click();
      await new Promise((resolve) => setTimeout(resolve, 150));
      return gatewayReady && !document.querySelector('#appShell').hidden && document.querySelector('#salespersonName').value === 'Demo Sales Representative';
    })()`,
  },
  {
    name: 'Lyric The Producer',
    path: '/apps/lyric-the-producer/index.html',
    screenshot: 'lyric-the-producer.png',
    expression: `(() => {
      document.querySelector('.menu-button').click();
      return document.querySelector('#site-nav').classList.contains('open') && document.body.innerText.includes('Cinematic beats');
    })()`,
  },
  {
    name: 'Weather Dashboard',
    path: '/weather-dashboard/index.html',
    screenshot: 'weather-dashboard.png',
    expression: `(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (!${requireLiveWeather}) return document.body.innerText.includes('Weather Dashboard');
      const input = document.querySelector('input');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'Nashville');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('form').requestSubmit();
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return document.body.innerText.includes('Nashville') && document.body.innerText.includes('Humidity');
    })()`,
  },
];
const selectedTests = process.env.SMOKE_PROJECT
  ? tests.filter((test) =>
      test.name.toLowerCase().includes(process.env.SMOKE_PROJECT.toLowerCase()),
    )
  : tests;

(async () => {
  try {
    await waitForBrowser();
    const session = await createSession();
    for (const test of selectedTests) {
      session.exceptions.length = 0;
      await session.send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await session.send('Page.navigate', { url: `${baseUrl}${test.path}` });
      await delay(test.wait || 1400);
      const result = await session.send('Runtime.evaluate', {
        expression: test.expression,
        awaitPromise: true,
        returnByValue: true,
      });
      const value = result.result.value;
      const passed =
        (value === true || value?.passed === true) &&
        session.exceptions.length === 0;
      console.log(`${passed ? 'PASS' : 'FAIL'} ${test.name}`);
      if (passed && test.screenshot) {
        const metrics = test.fullPage
          ? await session.send('Page.getLayoutMetrics')
          : null;
        const capture = await session.send('Page.captureScreenshot', {
          format: 'png',
          fromSurface: true,
          captureBeyondViewport: Boolean(test.fullPage),
          ...(metrics
            ? {
                clip: {
                  x: 0,
                  y: 0,
                  width: metrics.cssContentSize.width,
                  height: metrics.cssContentSize.height,
                  scale: 1,
                },
              }
            : {}),
        });
        fs.writeFileSync(
          path.join(
            process.cwd(),
            'public',
            'images',
            'projects',
            test.screenshot,
          ),
          Buffer.from(capture.data, 'base64'),
        );
      }
      if (!passed) {
        console.error(
          `  result=${JSON.stringify(result.result.value)} exceptions=${JSON.stringify(session.exceptions)}`,
        );
        process.exitCode = 1;
      }
    }
    session.socket.close();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    browser.kill();
  }
})();
