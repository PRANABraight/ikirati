// Extract a YouTube video ID from watch, share (youtu.be), embed, shorts,
// and live URLs, tolerating extra query params.
export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1).split('/')[0] || null;
    }
    if (u.hostname === 'youtube.com' || u.hostname.endsWith('.youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const match = u.pathname.match(/^\/(embed|shorts|live)\/([^/?]+)/);
      if (match) return match[2];
    }
    return null;
  } catch {
    return null;
  }
}
