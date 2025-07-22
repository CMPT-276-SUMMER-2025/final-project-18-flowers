/// <reference types="vitest/globals" />
import { render, screen, /*waitFor*/ } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NearbyHotels from '../NearbyHotels';
import * as cityData from '../../data/cityData';

//Test if the NearbyHotels component renders correctly with mock data (with saveAPICost 
//set to true)
describe('NearbyHotels Component', () => {
  const mockPlaces = [
    {
      id: 'h1',
      displayName: 'Grand Hotel Taipei',
      photoUrl: '/assets/hotels/hotel-1.jpg',
    },
    {
      id: 'h2',
      displayName: 'Taipei Garden',
      photoUrl: '/assets/hotels/hotel-2.jpg',
    },
    {
      id: 'h3',
      displayName: 'CitizenM Taipei North Gate',
      photoUrl: '/assets/hotels/hotel-3.jpg',
    },
  ];

  beforeEach(() => {
    // Override the mockPlacesHotels import
    vi.spyOn(cityData, 'mockPlacesHotels', 'get').mockReturnValue(mockPlaces);
  });

  it('renders NearbyHotels with mock data', async () => {
    render(<NearbyHotels lat={25.0330} lng={121.5654} />);

    for (const hotel of mockPlaces) {
      expect(await screen.findByText(hotel.displayName)).toBeInTheDocument();
      expect(await screen.findByAltText(hotel.displayName)).toHaveAttribute('src', hotel.photoUrl);
    }

    expect(screen.getByText('Nearby Hotels')).toBeInTheDocument();
  });

  it('renders links to Google Maps with correct URLs', () => {
    render(<NearbyHotels lat={25.0330} lng={121.5654} />);

    for (const hotel of mockPlaces) {
      const link = screen.getByText(hotel.displayName)?.closest('a');
      expect(link).toHaveAttribute(
        'href',
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.displayName)}`
      );
    }
  });
});


/*
// Mock global google.maps structure (with saveAPICost set to false) 
const mockSearchNearby = vi.fn();
const mockGetURI = vi.fn(() => `'/assets/attractions/attraction-1.jpg'`);

globalThis.google = {
  maps: {
    importLibrary: vi.fn(async (lib: string) => {
      if (lib === 'places') {
        return {
          Place: {
            searchNearby: mockSearchNearby,
          },
          SearchNearbyRankPreference: {
            POPULARITY: 'POPULARITY',
          },
        };
      }
      return {};
    }),
  },
} as any;

describe('NearbyHotels Component (API behavior)', () => {
  const mockApiPlaces = [
    {
      id: 'hotel_1',
      displayName: 'API Hotel',
      photos: [
        {
          getURI: mockGetURI,
        },
      ],
    },
  ];

  beforeEach(() => {
    mockSearchNearby.mockResolvedValue({
      places: mockApiPlaces,
    });
  });

  it('fetches hotel data from Google Maps API when saveAPICost = false', async () => {
    // Temporarily force saveAPICost = false by mocking module and re-importing
    vi.doMock('../data/cityData', () => ({
      mockPlacesHotels: [],
    }));

    render(<NearbyHotels lat={25.0340} lng={121.5645} />);

    await waitFor(() => {
      expect(mockSearchNearby).toHaveBeenCalled();
    });

    expect(await screen.findByText('API Hotel')).toBeInTheDocument();
    expect(await screen.findByAltText('API Hotel')).toHaveAttribute(
      'src',
      expect.stringContaining('/assets/hotels/hotel-1.jpg')
    );
  });
});
*/
