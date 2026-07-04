import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
