import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} label="Test dialog">
        <p>content</p>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders an accessible dialog when open', () => {
    render(
      <Modal isOpen onClose={() => {}} label="Test dialog">
        <p>content</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Test dialog');
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} label="Test dialog">
        <button>inside</button>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on overlay click but not on panel click', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} label="Test dialog">
        <button>inside</button>
      </Modal>
    );
    fireEvent.click(screen.getByText('inside'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('plays an exit animation before removing the dialog on close', async () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}} label="Test dialog">
        <p>content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(
      <Modal isOpen={false} onClose={() => {}} label="Test dialog">
        <p>content</p>
      </Modal>
    );

    // Still present immediately after the isOpen flip: the close animation
    // hasn't completed yet, so the dialog shouldn't vanish synchronously.
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('locks body scroll while open and restores on close', () => {
    const { unmount } = render(
      <Modal isOpen onClose={() => {}} label="Test dialog">
        <p>content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
