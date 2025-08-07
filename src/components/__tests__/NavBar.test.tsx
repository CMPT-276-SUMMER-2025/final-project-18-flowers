import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import '@testing-library/jest-dom';

// Mock child components
vi.mock('../SearchBar', () => ({
  default: () => <div data-testid="search-bar">Mock SearchBar</div>,
}));

vi.mock('../NavBarSide', () => ({
  default: ({ isOpen }: { isOpen: boolean }) => (
    <div data-testid="nav-bar-side">{isOpen ? 'Open' : 'Closed'}</div>
  ),
}));

describe('NavBar', () => {
  it('renders logo and links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Taiwan Explorers')).toHaveLength(2); // one on desktop, one on mobile
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Destinations')).toBeInTheDocument();
    expect(screen.getByText('Interests')).toBeInTheDocument();
    expect(screen.getByText('Plan a trip')).toBeInTheDocument();
  });

  it('renders mocked SearchBar', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('toggles NavBarSide when button is clicked', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByRole('button');

    // Initially closed
    expect(screen.getByTestId('nav-bar-side')).toHaveTextContent('Closed');

    // Click to open
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('nav-bar-side')).toHaveTextContent('Open');

    // Click again to close
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('nav-bar-side')).toHaveTextContent('Closed');
  });
});
