import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const owner = 'chadluman';
const root = process.cwd();
const manifest = JSON.parse(
  await readFile(path.join(root, 'project-demos.json'), 'utf8'),
);
const failures = [];

const request = async (url, accept = 'application/vnd.github+json') => {
  const headers = { Accept: accept, 'User-Agent': 'portfolio-demo-verifier' };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(url, {
    headers,
  });
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);
  return response;
};

const digest = (value) =>
  createHash('sha256')
    .update(value.toString('utf8').replaceAll('\r\n', '\n'))
    .digest('hex');

for (const project of manifest) {
  try {
    await access(path.join(root, project.demo));
    const screenshot = await readFile(path.join(root, project.screenshot));
    const isPng = screenshot.subarray(1, 4).toString('ascii') === 'PNG';
    const width = isPng ? screenshot.readUInt32BE(16) : 0;
    const height = isPng ? screenshot.readUInt32BE(20) : 0;
    if (!isPng || width !== 1280 || height !== 800) {
      failures.push(`${project.name}: screenshot must be a 1280x800 PNG.`);
    }
    const repository = await (
      await request(
        `https://api.github.com/repos/${owner}/${project.repository}`,
      )
    ).json();
    const commit = await (
      await request(
        `https://api.github.com/repos/${owner}/${project.repository}/commits/${repository.default_branch}`,
      )
    ).json();

    if (!commit.sha.startsWith(project.revision)) {
      failures.push(
        `${project.name}: manifest ${project.revision} is behind ${commit.sha.slice(0, 8)}.`,
      );
    }

    for (const [remotePath, localPath] of Object.entries(project.files || {})) {
      const remote = Buffer.from(
        await (
          await request(
            `https://raw.githubusercontent.com/${owner}/${project.repository}/${commit.sha}/${remotePath}`,
            'text/plain',
          )
        ).arrayBuffer(),
      );
      const local = await readFile(path.join(root, localPath));
      if (digest(remote) !== digest(local)) {
        failures.push(
          `${project.name}: ${localPath} differs from ${remotePath}.`,
        );
      }
    }

    console.log(
      `PASS ${project.name} (${project.revision}, ${project.mode}, ${width}x${height} screenshot)`,
    );
  } catch (error) {
    failures.push(`${project.name}: ${error.message}`);
  }
}

if (failures.length) {
  console.error('\nProject demo verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('\nAll project demos match their recorded GitHub revisions.');
}
