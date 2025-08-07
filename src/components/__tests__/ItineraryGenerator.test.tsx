import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ItineraryGenerator from '../ItineraryGenerator';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ItineraryGenerator', () => {
  it('renders all form fields correctly', () => {
    renderWithRouter(<ItineraryGenerator />);

    expect(
        screen.getByText((_, element) => element?.textContent?.trim() === 'Itinerary Generator' || false)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/How long is your trip/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adults/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Children/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What is your budget/i)).toBeInTheDocument();
  });


  it('clears form when Clear button is clicked', () => {
    renderWithRouter(<ItineraryGenerator />);
    const daysSelect = screen.getByLabelText(/How long is your trip/i);
    fireEvent.change(daysSelect, { target: { value: '3 days' } });

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect((daysSelect as HTMLSelectElement).value).toBe('');
  });
});
