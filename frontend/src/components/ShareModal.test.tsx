import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareModal } from './ShareModal';

const props = {
  isOpen: true,
  onClose: () => {},
  title: 'Kinema (Fermented Soybean Curry)',
  content: 'A traditional fermented soybean product with a strong aroma.',
  ingredients: ['Soybeans', 'Salt', 'Water'],
  prep: ['Boil the soybeans', 'Ferment for 3 days'],
};

describe('ShareModal', () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows ingredients and preparation steps in the preview', () => {
    render(<ShareModal {...props} />);
    expect(screen.getByText('Soybeans')).toBeInTheDocument();
    expect(screen.getByText('Boil the soybeans')).toBeInTheDocument();
  });

  it('Copy Content includes ingredients and preparation, not just the description', async () => {
    render(<ShareModal {...props} />);
    fireEvent.click(screen.getByText('Copy Content'));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const copied = writeText.mock.calls[0][0];
    expect(copied).toContain(props.content);
    expect(copied).toContain('Soybeans');
    expect(copied).toContain('Boil the soybeans');
  });

  it('Copy Link only copies the URL, not the recipe content', async () => {
    render(<ShareModal {...props} />);
    fireEvent.click(screen.getByText('Copy Link'));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const copied = writeText.mock.calls[0][0];
    expect(copied).toBe(window.location.href);
    expect(copied).not.toContain('Soybeans');
  });

  it('Email includes ingredients and preparation in the mailto body', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ShareModal {...props} />);
    fireEvent.click(screen.getByText('Email'));

    expect(openSpy).toHaveBeenCalled();
    const url = openSpy.mock.calls[0][0] as string;
    expect(decodeURIComponent(url)).toContain('Soybeans');
    expect(decodeURIComponent(url)).toContain('Boil the soybeans');
  });

  it('Share falls back to clipboard with full content when the Web Share API is unavailable', async () => {
    const originalShare = (navigator as unknown as { share?: unknown }).share;
    // @ts-expect-error - simulating a browser without the Web Share API
    delete navigator.share;

    render(<ShareModal {...props} />);
    fireEvent.click(screen.getByText('Share'));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const copied = writeText.mock.calls[0][0];
    expect(copied).toContain('Soybeans');
    expect(copied).toContain('Boil the soybeans');

    (navigator as unknown as { share?: unknown }).share = originalShare;
  });

  it('Share uses the Web Share API with full content when available', async () => {
    const shareSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { share: shareSpy });

    render(<ShareModal {...props} />);
    fireEvent.click(screen.getByText('Share'));

    await waitFor(() => expect(shareSpy).toHaveBeenCalled());
    const arg = shareSpy.mock.calls[0][0];
    expect(arg.text).toContain('Soybeans');
    expect(arg.text).toContain('Boil the soybeans');
  });

  it('shows "Copied!" feedback after a successful copy', async () => {
    render(<ShareModal {...props} />);
    fireEvent.click(screen.getByText('Copy Content'));
    await waitFor(() => expect(screen.getByText('Copied!')).toBeInTheDocument());
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<ShareModal {...props} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close share dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders without ingredients/prep for non-recipe content', () => {
    render(<ShareModal isOpen onClose={() => {}} title="A Story" content="Once upon a time." />);
    expect(screen.queryByText('Ingredients')).toBeNull();
    expect(screen.queryByText('Preparation')).toBeNull();
  });
});
