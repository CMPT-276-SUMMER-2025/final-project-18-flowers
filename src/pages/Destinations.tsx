import CityCard from '../components/CityCard';
import Regions from "../components/Regions";
import taipeiThumbnail from "/assets/taipei-night.jpeg";

/* 
Note: somtimes you might see content doubled
----
React 19 (the React version we're working with) in Strict Mode (look in App.tsx) intentionally runs the useEffect() function twice in development only, 
not in production
*/

// array of names of the 6 cities we're working with 
const cityNames = ["Taipei City", "Hualien City", "Yilan City", "Kaohsiung City", "Tainan City", "Taichung City"];

const Destinations = () => {
  return (
    <>
      <div>
        <img src={taipeiThumbnail} alt="Thumbnail of Destination Page" id="dest-thumb" />
      </div>

      <h1 id="dest-title">Find Your <strong>Destination</strong></h1>
      <div id="dest-grid" className="grid grid-cols-[repeat(2,auto)] lg:grid-cols-[repeat(3,auto)]">
        {cityNames.map(name => (
          <CityCard key={name} cityname={name} />
        ))}
      </div>

      <div id="dummy-map"></div>
      
      <Regions />
    </>
  );
};

export default Destinations
