import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AttractionDescription from '../AttractionDescription';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('AttractionDescription', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders title and generate button when no description yet', () => {
    render(<AttractionDescription placeName="Taipei 101" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ask ai for description/i })).toBeInTheDocument();
  });

  it('displays loading skeleton while fetching', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      new Promise(resolve => setTimeout(() => resolve({
        text: () => Promise.resolve('Mock description'),
      }), 500))
    ) as any);

    render(<AttractionDescription placeName="Taipei 101" />);
    fireEvent.click(screen.getByRole('button', { name: /ask ai for description/i }));

    expect(await screen.findByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.queryByText('Mock description')).not.toBeInTheDocument();
  });

  it('renders AI description after successful fetch', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('**Mock AI description**'),
      })
    ) as any);

    render(<AttractionDescription placeName="Sun Moon Lake" />);
    fireEvent.click(screen.getByRole('button', { name: /ask ai for description/i }));

    await waitFor(() => {
      expect(screen.getByText('Mock AI description', { exact: false })).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject('Fetch failed')));

    render(<AttractionDescription placeName="Alishan" />);
    fireEvent.click(screen.getByRole('button', { name: /ask ai for description/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch ai description/i)).toBeInTheDocument();
    });
  });

  it('does not call fetch if placeName is empty', async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);

  render(<AttractionDescription placeName="" />);

  const button = screen.getByRole('button', { name: /ask ai for description/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
});
