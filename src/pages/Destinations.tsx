import { useState } from 'react';
import CityCard from '../components/CityCard';
import CityCardMobile from '../components/CityCardMobile';
import Regions from "../components/Regions";
import taipeiThumbnail from "/assets/destinations/destination-thumb.jpg";
import "../styles/destinations.css";

/**
 * This is the Destination page of the webstie.
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
];

/**
 * Passes data to child components and renders the page containing cities of Taiwan and a map.
 * @returns data and rendered page
 */
const Destinations = () => {

  const [showMore, setShowMore] = useState(false);
  
  const initShow = 6;

  return (
    <>
      <h1 className="dest-title mt-10 mb-10"><strong>Taiwan</strong><br></br>Find Your Destination</h1>
      <div>
        <img src={taipeiThumbnail} alt="Thumbnail of Destination Page" id="dest-thumb" />
      </div>

      <h1 className='dest-title mt-10'>Top <strong>Destinations</strong> in Taiwan</h1>
      <h2 id="dest-sub-title">Recommended by Taiwan Explorers</h2>
      <div id="" className="dest-grid hidden sm:grid">
        {(cityNames)
          .slice(0, showMore ? cityNames.length : initShow)
          .map((name, index) => (
            <CityCard key={name} cityname={name} ranking={index + 1} />
        ))}
      </div>

      <div className="dest-grid grid sm:hidden">
        {(cityNames)
          .slice(0, showMore ? cityNames.length : initShow)
          .map((name, index) => (
            <CityCardMobile key={name} cityname={name} ranking={index + 1} />
        ))}
      </div>
      
      <div id="dest-button-container">
        { !showMore && <button id="dest-show-button" onClick={ 
          () => { 
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
