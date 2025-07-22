/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NearbyRestaurants from '../NearbyRestaurants';
import * as cityData from '../../data/cityData';

//Test if the NearbyRestaurants component renders correctly with mock data (with saveAPICost 
//set to true)
describe('NearbyRestaurants Component', () => {
  const mockPlaces = [
    {
      id: 'r1',
      displayName: 'A Joy',
      photoUrl: '/assets/restaurants/res-1.jpg',
    },
    {
      id: 'r2',
      displayName: 'Wind City Moon',
      photoUrl: '/assets/restaurants/res-2.jpg',
    },
    {
      id: 'r3',
      displayName: 'Liaoning Street Night Market',
      photoUrl: '/assets/restaurants/res-3.jpg',
    },
  ];

  beforeEach(() => {
    // Override the mockPlacesHotels import
    vi.spyOn(cityData, 'mockPlacesRestaurants', 'get').mockReturnValue(mockPlaces);
  });

  it('renders NearbyRestaurants with mock data', async () => {
    render(<NearbyRestaurants lat={25.0330} lng={121.5654} />);

    for (const restaurant of mockPlaces) {
      expect(await screen.findByText(restaurant.displayName)).toBeInTheDocument();
      expect(await screen.findByAltText(restaurant.displayName)).toHaveAttribute('src', restaurant.photoUrl);
    }

    expect(screen.getByText('Nearby Restaurants')).toBeInTheDocument();
  });

  it('renders links to Google Maps with correct URLs', () => {
    render(<NearbyRestaurants lat={25.0330} lng={121.5654} />);

    for (const restaurant of mockPlaces) {
      const link = screen.getByText(restaurant.displayName)?.closest('a');
      expect(link).toHaveAttribute(
        'href',
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.displayName)}`
      );
    }
  });
});
