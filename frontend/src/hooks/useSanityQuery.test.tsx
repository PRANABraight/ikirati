import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useSanityQuery } from './useSanityQuery';
import { sanityClient } from '../lib/sanity';

vi.mock('../lib/sanity', () => ({
  sanityClient: { fetch: vi.fn() },
}));

const mockFetch = vi.mocked(sanityClient.fetch);

describe('useSanityQuery', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('returns data after a successful fetch', async () => {
    mockFetch.mockResolvedValueOnce([{ title: 'A' }]);
    const { result } = renderHook(() => useSanityQuery<{ title: string }[]>('*[_type=="story"]'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ title: 'A' }]);
    expect(result.current.error).toBeNull();
  });

  it('surfaces fetch errors instead of hanging', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network down'));
    const { result } = renderHook(() => useSanityQuery('*[_type=="story"]'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error?.message).toBe('network down');
    expect(result.current.data).toBeNull();
  });

  it('retry() re-runs the query after an error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('boom'));
    mockFetch.mockResolvedValueOnce(['ok']);
    const { result } = renderHook(() => useSanityQuery<string[]>('q'));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.data).toEqual(['ok']));
    expect(result.current.error).toBeNull();
  });
});
