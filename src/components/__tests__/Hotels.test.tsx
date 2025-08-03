// tests/Hotels.test.tsx
import { render, screen } from '@testing-library/react';
import Hotels from '../Hotels';
import { mockPlacesHotels } from '../../data/cityData';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Hotels component', () => {
  it('renders mock hotel data when saveAPICost is true', async () => {
    render(
      <MemoryRouter initialEntries={[`/hotels/123`]}>
        <Routes>
          <Route 
            path="/hotels/:id" 
            element={<Hotels cityname="Yilan" latLng={{ lat: 24.7571, lng: 121.7539 }} />}
          />        
        </Routes>
      </MemoryRouter>
    );

    for (const hotel of mockPlacesHotels) {
      const name = hotel.displayName || 'Hotel';
      expect(await screen.findByText(name)).toBeInTheDocument();
    }
  });
});