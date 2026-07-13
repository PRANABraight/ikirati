import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimelinePage } from './TimelinePage';
import { timeline } from '../data';

describe('TimelinePage icon lookup', () => {
  it('renders a matching lucide icon for every timeline entry, not just the Mountain fallback', () => {
    const { container } = render(<TimelinePage />);

    const iconNameFor: Record<string, string> = {
      Mountain: 'lucide-mountain',
      BookOpen: 'lucide-book-open',
      Users: 'lucide-users',
      Heart: 'lucide-heart',
      Calendar: 'lucide-calendar',
      Sword: 'lucide-sword',
      World: 'lucide-globe',
      Decrease: 'lucide-trending-down',
    };

    const iconNamesUsed = new Set(timeline.map((entry) => entry.icon));
    expect(iconNamesUsed.size).toBeGreaterThan(1);

    for (const iconName of iconNamesUsed) {
      const expectedClass = iconNameFor[iconName];
      expect(expectedClass, `no lucide class mapping for icon "${iconName}"`).toBeDefined();
      expect(
        container.querySelector(`.${expectedClass}`),
        `expected an icon with class ${expectedClass} for timeline icon "${iconName}"`
      ).not.toBeNull();
    }

    // The 3 icons that previously fell through to the Mountain default.
    expect(container.querySelector('.lucide-sword')).not.toBeNull();
    expect(container.querySelector('.lucide-globe')).not.toBeNull();
    expect(container.querySelector('.lucide-trending-down')).not.toBeNull();
  });
});
