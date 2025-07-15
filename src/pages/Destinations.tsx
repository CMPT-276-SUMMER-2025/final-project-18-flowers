import { useEffect } from 'react';
import { cityCard } from '../components/CityCard';
import Regions from "../components/Regions"

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
      <div><img src="assets/taipei-night.jpeg" alt="destination-thumbnail" id="destination-thumb"/></div>
      <h1 id="destinations-title">Find Your Destination</h1>
      <div id="destinations-grid" className='grid grid-cols-[repeat(2,auto)] lg:grid-cols-[repeat(3,auto)]'></div>
      <div id="dummy-map"></div>
      <Regions></Regions>
    </>
  );
}

export default Destinations
