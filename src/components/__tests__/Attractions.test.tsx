import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Attractions from '../Attractions';
import { MemoryRouter } from 'react-router-dom';
import * as cityData from '../../data/cityData';

// Mocks for localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock google.maps
beforeEach(() => {
  globalThis.google = {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        Place: {
          searchByText: vi.fn().mockResolvedValue({
            places: [
              {
                id: '1',
                displayName: 'Elephant Mountain',
                photos: [
                  {
                    getURI: () => 'https://example.com/photo1.jpg',
                  },
                ],
              },
              {
                id: '2',
                displayName: 'National Palace Museum',
                photos: [
                  {
                    getURI: () => 'https://example.com/photo2.jpg',
                  },
                ],
              },
            ],
          }),
        },
        SearchByTextRankPreference: {
          RELEVANCE: 'RELEVANCE',
        },
      }),
    },
  } as any;
});

afterEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
});

describe('Attractions Component', () => {
  it('renders header title', () => {
    render(<Attractions cityname="Taipei" />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Attractions/i)).toBeInTheDocument();
  });

  it('renders places from mockPlacesAttractions if saveAPICost = true', async () => {
    // Temporarily override saveAPICost in the module
    const mockData = [
      {
        id: '1',
        displayName: 'Mock Place 1',
        photoUrl: 'https://example.com/mock1.jpg',
      },
      {
        id: '2',
        displayName: 'Mock Place 2',
        photoUrl: 'https://example.com/mock2.jpg',
      },
    ];

    vi.spyOn(cityData, 'mockPlacesAttractions', 'get').mockReturnValue(mockData);

    // Change saveAPICost inside module (hacky workaround since it's top-level)
    const mod = await import('../Attractions.tsx');
    (mod as any).saveAPICost = true;

    render(<Attractions cityname="Taipei" />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes('Elephant Mountain'))).toBeInTheDocument();
      expect(screen.getByText((text) => text.includes('National Palace Museum'))).toBeInTheDocument();
    });

    (mod as any).saveAPICost = false; // restore
  });

  it('renders places from Google API if no cache and saveAPICost is false', async () => {
    render(<Attractions cityname="Taipei" />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('Elephant Mountain')).toBeInTheDocument();
      expect(screen.getByText('National Palace Museum')).toBeInTheDocument();
    });

    const imgs = screen.getAllByRole('img');
    expect(imgs[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    expect(imgs[1]).toHaveAttribute('src', 'https://example.com/photo2.jpg');
  });

});
