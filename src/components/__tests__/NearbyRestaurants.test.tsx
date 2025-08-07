import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import NearbyRestaurants from '../NearbyRestaurants';

// Mock fallback data
vi.mock('../data/cityData', () => ({
  mockPlacesRestaurants: [
    {
      id: 'mock-r1',
      displayName: 'Mock Restaurant 1',
      photoUrl: 'https://example.com/mock1.jpg',
      rating: 4.6,
    },
    {
      id: 'mock-r2',
      displayName: 'Mock Restaurant 2',
      photoUrl: 'https://example.com/mock2.jpg',
      rating: 4.3,
    },
  ],
}));

// Google Maps API mock
beforeEach(() => {
  globalThis.google = {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        Place: {
          searchNearby: vi.fn().mockResolvedValue({
            places: [
              {
                id: 'r1',
                displayName: 'Dan’s Noodles',
                photos: [{ getURI: () => 'https://example.com/noodles.jpg' }],
                rating: 4.2,
              },
              {
                id: 'r2',
                displayName: 'Sunrise Resort', // Should be filtered out by hotel keyword
                photos: [{ getURI: () => 'https://example.com/resort.jpg' }],
                rating: 4.5,
              },
              {
                id: 'r3',
                displayName: '一芳水果茶', // Non-English, should be filtered
                photos: [{ getURI: () => 'https://example.com/tea.jpg' }],
                rating: 4.1,
              },
              {
                id: 'r4',
                displayName: 'Taco Bar',
                photos: [{ getURI: () => 'https://example.com/taco.jpg' }],
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

describe('NearbyRestaurants', () => {
  const props = {
    lat: 25.034,
    lng: 121.564,
  };

  it('renders the Nearby Restaurants title', () => {
    render(<NearbyRestaurants {...props} />);
    expect(screen.getByText('Nearby Restaurants')).toBeInTheDocument();
  });

  it('renders filtered restaurants from API (filters out hotels & non-English)', async () => {
    render(<NearbyRestaurants {...props} />);

    await waitFor(() => {
      expect(screen.getByText("Dan’s Noodles")).toBeInTheDocument();
      expect(screen.getByText("Taco Bar")).toBeInTheDocument();
    });

    // Hotel & non-English should not show
    expect(screen.queryByText("Sunrise Resort")).not.toBeInTheDocument();
    expect(screen.queryByText("一芳水果茶")).not.toBeInTheDocument();

    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBe(2);
    expect(imgs[0]).toHaveAttribute('src', 'https://example.com/noodles.jpg');
    expect(imgs[1]).toHaveAttribute('src', 'https://example.com/taco.jpg');
  });

  it('renders mockPlacesRestaurants if saveAPICost = true', async () => {
    const mod = await import('../NearbyRestaurants.tsx');
    (mod as any).saveAPICost = true;

    render(<NearbyRestaurants {...props} />);
    await waitFor(() => {
      expect(screen.getByText('Dan’s Noodles')).toBeInTheDocument();
      expect(screen.getByText('Taco Bar')).toBeInTheDocument();
    });

    (mod as any).saveAPICost = false;
  });

  it('logs warning if Google Maps API is not loaded', () => {
    globalThis.google = undefined as any;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<NearbyRestaurants {...props} />);
    expect(warnSpy).toHaveBeenCalledWith('Google Maps JS API not yet loaded');

    warnSpy.mockRestore();
  });
});
