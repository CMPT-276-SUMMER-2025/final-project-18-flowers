import { useParams } from "react-router-dom";
import { cityCoordinates, cityInterestsData } from "../data/cityData"; 
import Attractions from "../components/Attractions"; // attractions component
import Hotels from "../components/Hotels"; // hotels component 
import Restaurants from "../components/Restaurants"; // restaurants component
import "../styles/city.css";

/**
 * This is the CityInterests page of the webstie.
 */

/**
 * Passes data to child components and renders the page containing all the details of the city.
 * @returns data and rendered page
 */
const CityInterests = () => {
  const { id } = useParams();
  
  const wordsArr = id?.replaceAll("-", " ").split(" ") ?? []; 
  const header = wordsArr.map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  const [imgSrc, description, region, tagline] = cityInterestsData[header as keyof typeof cityInterestsData] || ["", "", "", ""];
  const latLng = cityCoordinates[header as keyof typeof cityCoordinates] || { lat: 0, lng: 0 };
  
  return (
    <div>
      <div className="ci-header-container">
        <h3 className="ci-region">{region}</h3>
        <h1 className="ci-header">{header}</h1>
        <h2 className="ci-tagline">{tagline}</h2>
      </div>
      <img src={imgSrc} alt={header} className="ci-thumb"></img>
      <div className="container">
        <p className="ci-description">{description}</p>
        <Attractions cityname={header}></Attractions>
        <div className="commodities-container">
          <Hotels cityname={header} latLng={latLng}></Hotels>
          <Restaurants cityname={header} latLng={latLng}></Restaurants>
        </div>
      </div>
    </div>
  )
}

export default CityInterests;
