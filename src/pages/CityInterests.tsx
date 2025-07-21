import { useParams } from "react-router-dom";
import { cityInterestsData } from "../data/cityData"; 
import Attractions from "../components/Attractions"; // attractions component
import Hotels from "../components/Hotels"; // hotels component 
import Restaurants from "../components/Restaurants"; // restaurants component

const CityInterests = () => {
  const { id } = useParams();  
  
  const wordsArr = id?.replace("-", " ").split(" ") ?? []; 
  const header = wordsArr.map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  const [imgSrc, description] = cityInterestsData[header as keyof typeof cityInterestsData] || ["", ""];
  
  return (
    <div>
      <div className="ci-header-container">
        <h1 className="ci-header">{header}</h1>
      </div>
      <img src={imgSrc} alt={header} className="ci-thumb"></img>
      <div className="container">
        <p className="ci-description">{description}</p>
        <Attractions cityname={header}></Attractions>
        <div className="commodities-container">
          <Hotels cityname={header}></Hotels>
          <Restaurants cityname={header}></Restaurants>
        </div>
      </div>
    </div>
  )
}

export default CityInterests;
