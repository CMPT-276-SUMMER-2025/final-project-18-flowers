import { useEffect } from 'react';
import { cityCard } from '../components/CityCard';

/* 
Notice on why you might see content doubled!
----
React 19 (the React version we're working with) in Strict Mode (look in App.tsx) intentionally runs the useEffect() function twice in development only, not in production so no worries.
*/

const Destinations = () => {
  useEffect(() => {
    cityCard("Taipei City");
    cityCard("Hualien City");
    cityCard("Yilan City");
    cityCard("Kaohsiung City");
    cityCard("Tainan City");
    cityCard("Taichung City");
  }, [])

  return (
    <>
      <div id="bg-image-half-size"></div>
      <h1 id="destinations-title">Destinations</h1>
      <div id="destinations-grid"></div>
      <div id="dummy-map"></div>
    </>
  );
}

export default Destinations
