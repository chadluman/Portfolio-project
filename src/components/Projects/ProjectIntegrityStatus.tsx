'use client';

import { useEffect, useState } from 'react';

type IntegrityResponse = {
  checkedAt: string;
  statuses: Array<{
    slug: string;
    title: string;
    current: boolean;
    available: boolean;
  }>;
};

const ProjectIntegrityStatus = () => {
  const [result, setResult] = useState<IntegrityResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/projects/status', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Integrity status unavailable');
        return response.json() as Promise<IntegrityResponse>;
      })
      .then(setResult)
      .catch((error) => {
        if (error.name !== 'AbortError') setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const unavailable =
    result?.statuses.filter((status) => !status.available) || [];
  const stale =
    result?.statuses.filter((status) => status.available && !status.current) ||
    [];
  const current =
    result?.statuses.filter((status) => status.current).length || 0;
  const healthy = result && unavailable.length === 0 && stale.length === 0;

  return (
    <div
      className='mt-8 flex flex-col gap-2 border border-white/15 bg-white/4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'
      aria-live='polite'
    >
      <div className='flex items-center gap-3'>
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            healthy
              ? 'bg-[#d8ff3e]'
              : stale.length
                ? 'bg-amber-400'
                : 'bg-white/35'
          }`}
          aria-hidden='true'
        />
        <p className='text-sm text-[#d7d4ca]'>
          {!result && !failed && 'Checking demos against GitHub...'}
          {failed && 'GitHub integrity status is temporarily unavailable.'}
          {healthy &&
            `${current}/${result.statuses.length} demos match the latest GitHub revisions.`}
          {stale.length > 0 &&
            `${stale.length} demo${stale.length === 1 ? '' : 's'} need synchronization.`}
          {!stale.length &&
            unavailable.length > 0 &&
            'Some repository checks are temporarily unavailable.'}
        </p>
      </div>
      {result && (
        <time
          className='font-mono text-[10px] tracking-[0.12em] text-[#77756e] uppercase'
          dateTime={result.checkedAt}
        >
          Verified {new Date(result.checkedAt).toLocaleString()}
        </time>
      )}
    </div>
  );
};

export default ProjectIntegrityStatus;
