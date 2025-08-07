import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AttractionMap from '../AttractionMap';

// Mock the @vis.gl/react-google-maps components
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: any) => <div data-testid="mock-api">{children}</div>,
  Map: ({ children }: any) => <div data-testid="mock-map">{children}</div>,
  Marker: ({ position, icon }: any) => (
    <div data-testid="mock-marker">
      Marker at {position.lat}, {position.lng} with icon {JSON.stringify(icon)}
    </div>
  ),
}));

describe('AttractionMap', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('renders the map and marker with given coordinates', async () => {
    render(<AttractionMap lat={25.033964} lng={121.564468} />);

    // Map and marker should be rendered
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();

    // Wait a moment for symbol to be set
    const marker = await screen.findByTestId('mock-marker');
    expect(marker).toHaveTextContent(/25\.033964/);
    expect(marker).toHaveTextContent(/121\.564468/);
  });
});
