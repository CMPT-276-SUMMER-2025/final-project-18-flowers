// tests/Restaurants.test.tsx
import { render, screen } from '@testing-library/react';
import Restaurants from '../Restaurants';
import { mockPlacesRestaurants } from '../../data/cityData';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Restaurants component', () => {
  it('renders mock Restaurant data when saveAPICost is true', async () => {
    render(
      <MemoryRouter initialEntries={[`/Restaurants/123`]}>
        <Routes>
          <Route path="/Restaurants/:id" element={<Restaurants cityname="Yilan" />} />
        </Routes>
      </MemoryRouter>
    );

    for (const Restaurant of mockPlacesRestaurants) {
      const name = Restaurant.displayName || 'Restaurant';
      expect(await screen.findByText(name)).toBeInTheDocument();
    }
  });
});