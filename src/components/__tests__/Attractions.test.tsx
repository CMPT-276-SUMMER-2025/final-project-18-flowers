import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Attractions from '../Attractions';
import { MemoryRouter } from 'react-router-dom';



beforeEach(() => {
  globalThis.google = {
    maps: {
      importLibrary: vi.fn(async () => ({
        Place: {
          searchByText: vi.fn(async () => ({
            places: Array.from({ length: 9 }, (_, i) => ({
              id: `place-${i}`,
              displayName: `Attraction ${i}`,
              photos: [
                {
                  getURI: () => `https://example.com/photo-${i}.jpg`
                }
              ]
            }))
          }))
        },
        SearchByTextRankPreference: {
          RELEVANCE: 'RELEVANCE'
        }
      }))
    }
  } as any;
});


function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}


describe('Attractions Component', () => {
  it('renders 9 attractions when API returns valid data', async () => {
    renderWithRouter(<Attractions cityname="Taipei" />);

    // Wait for async rendering
    const attractionTitles = await screen.findAllByRole('heading', {
      name: /Attraction \d/
    });

    expect(attractionTitles).toHaveLength(9);
  });
});