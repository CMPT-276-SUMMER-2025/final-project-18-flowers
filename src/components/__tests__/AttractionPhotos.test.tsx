import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AttractionPhotos from '../AttractionPhotos';
import '@testing-library/jest-dom';


// Mock photo object with getURI
const mockPhotos = Array.from({ length: 5 }, (_, i) => ({
  getURI: vi.fn().mockReturnValue(`https://example.com/photo${i + 1}.jpg`),
}));

// Mock Place.searchByText to return mocked photo data
const mockSearchByText = vi.fn().mockResolvedValue({
  places: [{ photos: mockPhotos }],
});

beforeEach(() => {
  vi.stubGlobal('google', {
    maps: {
      importLibrary: vi.fn().mockResolvedValue({
        Place: { searchByText: mockSearchByText },
      }),
    },
  });
});

describe('AttractionPhotos Component', () => {
  it('renders loading state initially', () => {
    render(<AttractionPhotos attract="Taipei 101" />);
    expect(screen.getByText(/loading photos/i)).toBeInTheDocument();
  });

  it('renders up to 4 photos when API call succeeds', async () => {
    render(<AttractionPhotos attract="Taipei 101" />);
    
    // Wait for photos to be loaded
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(4);
      expect(images[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    });
  });

  it('renders fallback message when no photos available', async () => {
    // Update mock to return no photos
    mockSearchByText.mockResolvedValueOnce({
      places: [{ photos: [] }],
    });

    render(<AttractionPhotos attract="Some Place with No Photos" />);
    
    await waitFor(() => {
      expect(screen.getByText(/no photos available/i)).toBeInTheDocument();
    });
  });
});
