import { render, screen, fireEvent } from '@testing-library/react';
import Regions from '../Regions';
import { vi } from 'vitest';

// Mock city data
vi.mock('../../data/cityData', () => ({
  citiesLatLng: [
    { id: 'taipei', coord: { lat: 25.033964, lng: 121.564468 }, header: 'Taipei City' },
    { id: 'taichung', coord: { lat: 24.147736, lng: 120.673648 }, header: 'Taichung City' },
  ],
}));

// Mock RegionContent
vi.mock('../RegionContent', () => ({
  default: ({ cityname }: { cityname: string }) => <div>Region: {cityname}</div>,
}));

// Mock Google Maps components
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: any) => <div>{children}</div>,
  Map: ({ children }: any) => <div>{children}</div>,
  Marker: ({ onClick, ...props }: any) => (
    <img role="img" onClick={onClick} data-testid={`marker-${props.position.lat}`} />
  ),
  ColorScheme: {
    LIGHT: 'light',
    DARK: 'dark',
  },
}));

describe('Regions Page', () => {
  it('displays region content when a marker is clicked', () => {
    render(<Regions />);
    const markers = screen.getAllByRole('img');
    expect(markers.length).toBeGreaterThan(0);

    fireEvent.click(markers[1]); // Click on Taichung marker
    expect(screen.getByText('Region: Taichung City')).toBeInTheDocument();
  });
});
