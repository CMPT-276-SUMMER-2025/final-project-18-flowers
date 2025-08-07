import { render, screen } from '@testing-library/react';
import PlanTripMap from '../PlanTripMap';
import { vi, beforeEach, describe, it, expect } from 'vitest';

// Mock @vis.gl/react-google-maps components
vi.mock('@vis.gl/react-google-maps', async () => {
  const actual = await vi.importActual('@vis.gl/react-google-maps');
  return {
    ...actual,
    Map: (props: any) => <div data-testid="mock-map">{props.children}</div>,
    APIProvider: (props: any) => <div>{props.children}</div>,
    useMap: () => null,
    ColorScheme: {
      LIGHT: 'light',
    },
  };
});

// Mock window.google.maps before each test
beforeEach(() => {
  global.window.google = {
    maps: {
      TravelMode: {
        DRIVING: 'DRIVING',
        WALKING: 'WALKING',
        TRANSIT: 'TRANSIT',
        BICYCLING: 'BICYCLING',
      },
      ControlPosition: {
        TOP_RIGHT: 'TOP_RIGHT',
      },
    },
  } as any;
});

describe('PlanTripMap', () => {
  it('renders the map component when Google Maps is ready', async () => {
    render(<PlanTripMap routeCoordinates={[]} resetTrigger={0} />);
    expect(await screen.findByTestId('mock-map')).toBeInTheDocument();
  });
});
