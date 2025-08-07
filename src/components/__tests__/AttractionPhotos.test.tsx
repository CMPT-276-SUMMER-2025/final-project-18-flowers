import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AttractionPhotos from '../AttractionPhotos';

// Mock google.maps
beforeEach(() => {
  globalThis.google = {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        Place: {
          searchByText: vi.fn().mockResolvedValue({
            places: [{
              photos: [
                { getURI: () => 'https://example.com/photo1.jpg' },
                { getURI: () => 'https://example.com/photo2.jpg' },
                { getURI: () => 'https://example.com/photo3.jpg' }
              ]
            }]
          })
        }
      })
    }
  } as any;
});

describe('AttractionPhotos', () => {
  it('renders loading message initially', () => {
    render(<AttractionPhotos attract="Taipei 101" />);
    expect(screen.getByText(/Loading photos.../i)).toBeInTheDocument();
  });

  it('renders photos after fetching', async () => {
    render(<AttractionPhotos attract="Taipei 101" />);
    
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(2);
    });

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/photo2.jpg');
  });

  it('renders message when no photos are found', async () => {
    (google.maps.importLibrary as any).mockResolvedValueOnce({
      Place: {
        searchByText: vi.fn().mockResolvedValue({ places: [{ photos: [] }] })
      }
    });

    render(<AttractionPhotos attract="Nonexistent Place" />);

    await waitFor(() => {
      expect(screen.getByText(/Loading photos.../i)).toBeInTheDocument();

    });
  });

  it('shows no error if Google Maps API not loaded', async () => {
    globalThis.google = undefined as any;

    render(<AttractionPhotos attract="Taipei Zoo" />);
    await waitFor(() => {
      expect(screen.getByText(/Loading photos.../i)).toBeInTheDocument();

    });
  });
});
