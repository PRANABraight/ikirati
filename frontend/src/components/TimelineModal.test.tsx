import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TimelineModal } from './TimelineModal';

const event = {
  year: 'Ancient Times',
  event: 'Origins and early settlements',
  icon: 'Mountain',
  description: 'A long time ago...',
};

describe('TimelineModal', () => {
  it('renders nothing when no event has ever been provided', () => {
    render(<TimelineModal isOpen={false} onClose={() => {}} event={null} icon={null} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders the event content when open', () => {
    render(<TimelineModal isOpen onClose={() => {}} event={event} icon={<svg data-testid="icon" />} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Ancient Times')).toBeInTheDocument();
    expect(screen.getByText('Origins and early settlements')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('keeps showing the event content while the parent clears it on close, until the exit animation finishes', async () => {
    const icon = <svg data-testid="icon" />;
    const { rerender } = render(<TimelineModal isOpen onClose={() => {}} event={event} icon={icon} />);
    expect(screen.getByText('Ancient Times')).toBeInTheDocument();

    rerender(<TimelineModal isOpen={false} onClose={() => {}} event={null} icon={null} />);
    expect(screen.getByText('Ancient Times')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<TimelineModal isOpen onClose={onClose} event={event} icon={null} />);
    screen.getByLabelText('Close detail').click();
    expect(onClose).toHaveBeenCalled();
  });
});
