import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { beforeEach, test, expect } from 'vitest';
import Games from './games';

// simple helper to fake fetch
function mockFetch(data) {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(data) })
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

test('shows categories by default and toggles off', async () => {
  const fakeData = {
    games: [
      { title: 'Game A', url: '/a', img: '/a.png', category: 'Fun' },
      { title: 'Game B', url: '/b', img: '/b.png', category: 'Fun' },
      { title: 'Puzzle One', url: '/p1', img: '/p1.png', category: 'Puzzle' },
    ],
  };

  mockFetch(fakeData);

  render(<Games />);

  // initial loading state shows skeleton
  expect(screen.getByText(/Games Collection/i)).toBeInTheDocument();

  // wait for items to load
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  // There should be details elements for each category
  expect(screen.getByText(/Fun \(2\)/)).toBeInTheDocument();
  expect(screen.getByText(/Puzzle \(1\)/)).toBeInTheDocument();

  const toggle = screen.getByLabelText(/Show categories/i);
  expect(toggle).toBeChecked();

  // click toggle to hide categories
  fireEvent.click(toggle);
  expect(toggle).not.toBeChecked();

  // categories should disappear: the grid should show game items directly
  expect(screen.queryByText(/Fun \(2\)/)).not.toBeInTheDocument();
  expect(screen.getByText(/Game A/)).toBeInTheDocument();

  // preference should be stored
  expect(localStorage.getItem('scg_showCategories')).toBe('false');
});
