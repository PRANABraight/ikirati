import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { StoryModal } from './StoryModal';

const story = {
  image: 'test.jpg',
  title: 'The Ancient Festival',
  text: 'Once upon a time...',
  author: 'Hang',
};

describe('StoryModal', () => {
  it('renders nothing when no story has ever been provided', () => {
    render(<StoryModal isOpen={false} onClose={() => {}} story={null} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders the story content when open', () => {
    render(<StoryModal isOpen onClose={() => {}} story={story} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('The Ancient Festival')).toBeInTheDocument();
    expect(screen.getByText('Once upon a time...')).toBeInTheDocument();
  });

  it('keeps showing the story content while the parent clears it on close, until the exit animation finishes', async () => {
    const { rerender } = render(<StoryModal isOpen onClose={() => {}} story={story} />);
    expect(screen.getByText('The Ancient Festival')).toBeInTheDocument();

    // Parent's onClose typically nulls its selected-story state in the same
    // render that flips isOpen to false — content must not vanish early.
    rerender(<StoryModal isOpen={false} onClose={() => {}} story={null} />);
    expect(screen.getByText('The Ancient Festival')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<StoryModal isOpen onClose={onClose} story={story} />);
    screen.getByLabelText('Close story').click();
    expect(onClose).toHaveBeenCalled();
  });
});
