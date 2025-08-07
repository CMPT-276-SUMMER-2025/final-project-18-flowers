import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Restaurants from '../Restaurants';

// Mock mockPlacesRestaurants
vi.mock('../data/cityData', () => ({
  mockPlacesRestaurants: [
    {
      id: 'mock-r1',
      displayName: 'Mock Resto 1',
      photoUrl: 'https://example.com/mock1.jpg',
      rating: 4.7,
    },
    {
      id: 'mock-r2',
      displayName: 'Mock Resto 2',
      photoUrl: 'https://example.com/mock2.jpg',
      rating: 4.3,
    },
  ],
}));

// Google Maps mock
beforeEach(() => {
  globalThis.google = {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        Place: {
          searchNearby: vi.fn().mockResolvedValue({
            places: [
              {
                id: 'r1',
                displayName: 'Sun Diner',
                photos: [{ getURI: () => 'https://example.com/sundiner.jpg' }],
                rating: 4.5,
              },
              {
                id: 'r2',
                displayName: 'Sun Moon Lake Resort', // hotel keyword → filtered
                photos: [{ getURI: () => 'https://example.com/resort.jpg' }],
                rating: 4.6,
              },
              {
                id: 'r3',
                displayName: '老張牛肉麵', // mostly non-English → filtered
                photos: [{ getURI: () => 'https://example.com/beefnoodle.jpg' }],
                rating: 4.2,
              },
              {
                id: 'r4',
                displayName: 'Ocean Bites',
                photos: [{ getURI: () => 'https://example.com/oceanbites.jpg' }],
                rating: 4.1,
              },
            ]
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

describe('Restaurants', () => {
  const props = {
    cityname: 'Tainan City',
    latLng: { lat: 22.9999, lng: 120.227 },
  };

  it('renders heading and filters valid restaurants from API', async () => {
    render(<Restaurants {...props} />);

    await waitFor(() => {
      expect(screen.getByText('Sun Diner')).toBeInTheDocument();
      expect(screen.getByText('Ocean Bites')).toBeInTheDocument();
    });

    // Should NOT appear
    expect(screen.queryByText('Sun Moon Lake Resort')).not.toBeInTheDocument();
    expect(screen.queryByText('老張牛肉麵')).not.toBeInTheDocument();

    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBe(2);
    expect(imgs[0]).toHaveAttribute('src', 'https://example.com/sundiner.jpg');
    expect(imgs[1]).toHaveAttribute('src', 'https://example.com/oceanbites.jpg');
  });

  it('renders mock data if saveAPICost = true', async () => {
    const mod = await import('../Restaurants.tsx');
    (mod as any).saveAPICost = true;

    render(<Restaurants {...props} />);

    await waitFor(() => {
      expect(screen.getByText('Sun Diner')).toBeInTheDocument();
      expect(screen.getByText('Ocean Bites')).toBeInTheDocument();
    });

    (mod as any).saveAPICost = false; // Reset
  });

  it('logs warning if Google Maps is not loaded', () => {
    globalThis.google = undefined as any;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Restaurants {...props} />);
    expect(warnSpy).toHaveBeenCalledWith('Google Maps JS API not yet loaded');

    warnSpy.mockRestore();
  });
});
