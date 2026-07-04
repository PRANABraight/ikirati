import { useEffect } from 'react';

const SITE_NAME = 'Kirati Heart';
const DEFAULT_DESCRIPTION =
  'Kirati Heart preserves the cultural heritage of the Kirati people of the eastern Himalayas: stories, songs, recipes, language recordings, crafts, and an interactive historical timeline.';

// Lightweight per-page <title> + meta description management for the SPA.
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Kirati Cultural Heritage`;

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description ?? DEFAULT_DESCRIPTION;
  }, [title, description]);
}
