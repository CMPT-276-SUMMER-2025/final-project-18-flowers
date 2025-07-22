import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../NavBar';

describe('NavBar', () => {
  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Check brand link
    expect(screen.getByText('Taiwan Explorers')).toBeInTheDocument();

    // Check menu links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Destinations')).toBeInTheDocument();
    expect(screen.getByText('Interests')).toBeInTheDocument();
    expect(screen.getByText('Plan a trip')).toBeInTheDocument();

    // Check search label
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('contains correct link hrefs', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('Taiwan Explorers').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Destinations').closest('a')).toHaveAttribute('href', '/destinations');
    expect(screen.getByText('Interests').closest('a')).toHaveAttribute('href', '/interests');
    expect(screen.getByText('Plan a trip').closest('a')).toHaveAttribute('href', '/plantrip');
  });
});
