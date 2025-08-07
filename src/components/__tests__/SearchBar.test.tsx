// src/components/__tests__/SearchBar.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('SearchBar', () => {
  it('renders input with correct placeholder', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
  });

  it('navigates to correct URL when submitted', () => {
    const mockedNavigate = vi.fn();
    (useNavigate as unknown as vi.Mock).mockReturnValue(mockedNavigate);

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'Taipei 101' } });

    const form = input.closest('form')!;
    fireEvent.submit(form);

    expect(mockedNavigate).toHaveBeenCalledWith('/search?query=Taipei%20101');
  });

  it('does not navigate when input is empty', () => {
    const mockedNavigate = vi.fn();
    (useNavigate as unknown as vi.Mock).mockReturnValue(mockedNavigate);

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: '     ' } });

    const form = input.closest('form')!;
    fireEvent.submit(form);

    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
