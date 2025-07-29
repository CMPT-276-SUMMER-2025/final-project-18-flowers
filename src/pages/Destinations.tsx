import { useState } from 'react';
import CityCard from '../components/CityCard';
import Regions from "../components/Regions";
import taipeiThumbnail from "/assets/taipei-night.jpeg";

/* 
Note: somtimes you might see content doubled
----
React 19 (the React version we're working with) in Strict Mode (look in App.tsx) intentionally runs the useEffect() function twice in development only, 
not in production
*/

// array of names of the places we're working with 
const cityNames = [
  "Taipei City", 
  "Hualien City", 
  "Yilan City", 
  "Kaohsiung City", 
  "Tainan City", 
  "Taichung City",
  // newly added
  "New Taipei City",
  "Keelung City",
  "Taitung City",
  "Nantou County",
  "Chiayi City",
  "Pingtung County",
  "Miaoli County",
  "Changhua County"
];

const Destinations = () => {

  const [showMore, setShowMore] = useState(false);
  
  const initShow = 6;

  return (
    <>
      <div>
        <img src={taipeiThumbnail} alt="Thumbnail of Destination Page" id="dest-thumb" />
      </div>

      <h1 id="dest-title">Find Your <strong>Destination</strong></h1>
      <div id="dest-grid" className="grid grid-cols-[repeat(2,auto)] lg:grid-cols-[repeat(3,auto)]">
        {(cityNames)
          .slice(0, showMore ? cityNames.length : initShow)
          .map((name, index) => (
            <CityCard key={name} cityname={name} ranking={index + 1} />
        ))}
      </div>
      
      <div id="dest-button-container">
        { !showMore && <button id="dest-show-button" onClick={ 
          () => { 
            console.log(showMore);
            setShowMore(!showMore); 
          }
        }>View more</button>}
      </div>

      <div id="dummy-map"></div>
      
      <Regions />
    </>
  );
};

export default Destinations
