import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import NearbyHotels from '../NearbyHotels';

// Mock mockPlacesHotels
vi.mock('../data/cityData', () => ({
  mockPlacesHotels: [
    {
      id: 'mock-1',
      displayName: 'Mock Hotel 1',
      photoUrl: 'https://example.com/mock1.jpg',
      rating: 4.5,
    },
    {
      id: 'mock-2',
      displayName: 'Mock Hotel 2',
      photoUrl: 'https://example.com/mock2.jpg',
      rating: 4.2,
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
                id: 'id-1',
                displayName: 'English Hotel Name',
                photos: [{ getURI: () => 'https://example.com/english.jpg' }],
                rating: 4.1,
              },
              {
                id: 'id-2',
                displayName: '日月潭飯店', // non-English (should be filtered out)
                photos: [{ getURI: () => 'https://example.com/chinese.jpg' }],
                rating: 4.0,
              },
              {
                id: 'id-3',
                displayName: 'Another English Hotel',
                photos: [{ getURI: () => 'https://example.com/another.jpg' }],
                rating: 3.9,
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

describe('NearbyHotels', () => {
  const props = {
    lat: 25.033,
    lng: 121.5654,
  };

  it('renders heading correctly', () => {
    render(<NearbyHotels {...props} />);
    expect(screen.getByText('Nearby Hotels')).toBeInTheDocument();
  });

  it('renders nearby hotels from Google Maps API, filtering non-English names', async () => {
    render(<NearbyHotels {...props} />);
    
    await waitFor(() => {
      expect(screen.getByText('English Hotel Name')).toBeInTheDocument();
      expect(screen.getByText('Another English Hotel')).toBeInTheDocument();
    });

    // Check that only English hotels render (non-English is filtered)
    expect(screen.queryByText('日月潭飯店')).not.toBeInTheDocument();

    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBe(2);
    expect(imgs[0]).toHaveAttribute('src', 'https://example.com/english.jpg');
    expect(imgs[1]).toHaveAttribute('src', 'https://example.com/another.jpg');
  });

  it('renders mockPlacesHotels if saveAPICost is true', async () => {
    const mod = await import('../NearbyHotels.tsx');
    (mod as any).saveAPICost = true;

    render(<NearbyHotels {...props} />);

    await waitFor(() => {
      expect(screen.getByText('English Hotel Name')).toBeInTheDocument();
      expect(screen.getByText('Another English Hotel')).toBeInTheDocument();
    });

    (mod as any).saveAPICost = false; // Reset after test
  });

  it('logs warning if Google Maps is not loaded', () => {
    globalThis.google = undefined as any;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<NearbyHotels {...props} />);
    expect(warnSpy).toHaveBeenCalledWith('Google Maps JS API not yet loaded');

    warnSpy.mockRestore();
  });
});
