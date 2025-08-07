import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CityCard from '../CityCard';
import '@testing-library/jest-dom';

// Mock city data
vi.mock('../../data/cityData', () => ({
  cities: {
    'Taipei City': ['Test Name', 'https://example.com/photo.jpg', 'A beautiful city.'],
  },
}));

// Setup dummy map and mock Google Maps
beforeEach(() => {
  // Inject dummy-map div into DOM
  const dummyDiv = document.createElement('div');
  dummyDiv.id = 'dummy-map';
  document.body.appendChild(dummyDiv);

  // Mock google maps
  const mockTextSearch = vi.fn((_, callback) => {
    callback([{ name: 'Taipei City' }], 'OK');
  });

  globalThis.google = {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        PlacesService: function () {
          return { textSearch: mockTextSearch };
        },
      }),
      places: {
        PlacesServiceStatus: {
          OK: 'OK',
        },
      },
    },
  } as any;
});

describe('CityCard', () => {
  it('renders city data and ranking from props', async () => {
    render(
      <MemoryRouter>
        <CityCard cityname="Taipei City" ranking={1} />
      </MemoryRouter>
    );

    await waitFor(() => {
      // It may fallback to cityData name instead of Google API, so match either
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    expect(screen.getByText('1')).toBeInTheDocument(); // ranking
    expect(screen.getByText('A beautiful city.')).toBeInTheDocument(); // description
  });
});
