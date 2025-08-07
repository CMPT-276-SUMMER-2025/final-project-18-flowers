import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Hotels from '../Hotels';
import { MemoryRouter } from 'react-router-dom';

// Mock cityData
vi.mock('../data/cityData', () => ({
  mockPlacesHotels: [
    {
      id: '1',
      displayName: 'Mock Hotel 1',
      photoUrl: 'https://example.com/mock1.jpg',
      rating: 4.5,
    },
    {
      id: '2',
      displayName: 'Mock Hotel 2',
      photoUrl: 'https://example.com/mock2.jpg',
      rating: 4.0,
    },
  ],
}));

// Mock Google Maps API
beforeEach(() => {
  globalThis.google = {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        Place: {
          searchNearby: vi.fn().mockResolvedValue({
            places: [
              {
                id: 'h1',
                displayName: 'Sun Moon Lake Hotel',
                photos: [{ getURI: () => 'https://example.com/photo1.jpg' }],
                rating: 4.3,
              },
              {
                id: 'h2',
                displayName: '台北大飯店', // Non-English, should be filtered
                photos: [{ getURI: () => 'https://example.com/photo2.jpg' }],
                rating: 4.2,
              },
              {
                id: 'h3',
                displayName: 'Hotel English Name',
                photos: [{ getURI: () => 'https://example.com/photo3.jpg' }],
                rating: 4.0,
              },
            ],
          }),
        },
        SearchNearbyRankPreference: {
          POPULARITY: 'POPULARITY',
        },
      }),
    },
  } as any;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Hotels', () => {
  const props = {
    cityname: 'Taipei City',
    latLng: { lat: 25.033, lng: 121.5654 },
  };

  it('renders Hotels heading', () => {
    render(<Hotels {...props} />, { wrapper: MemoryRouter });
    expect(screen.getByText('Hotels')).toBeInTheDocument();
  });

  it('renders hotels from mocked Places API (filters non-English)', async () => {
    render(<Hotels {...props} />, { wrapper: MemoryRouter });

    await waitFor(() => {
      // Filters out Chinese name, only 2 should show
      expect(screen.getByText('Sun Moon Lake Hotel')).toBeInTheDocument();
      expect(screen.getByText('Hotel English Name')).toBeInTheDocument();
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/photo3.jpg');

    const ratings = screen.getAllByText(/★/);
    expect(ratings[0].textContent).toMatch(/4.3/);
    expect(ratings[1].textContent).toMatch(/4.0/);
  });

  it('renders mockPlacesHotels if saveAPICost is true', async () => {
    // Temporarily override the saveAPICost flag (hacky override)
    const mod = await import('../Hotels.tsx');
    (mod as any).saveAPICost = true;

    render(<Hotels {...props} />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes('Sun Moon Lake Hotel'))).toBeInTheDocument();
      expect(screen.getByText((text) => text.includes('Hotel English Name'))).toBeInTheDocument();
    });

    (mod as any).saveAPICost = false; // Restore
  });

  it('shows warning if Google Maps API is not loaded', () => {
    globalThis.google = undefined as any;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Hotels {...props} />, { wrapper: MemoryRouter });
    expect(warnSpy).toHaveBeenCalledWith('Google Maps JS API not yet loaded');

    warnSpy.mockRestore();
  });
});
