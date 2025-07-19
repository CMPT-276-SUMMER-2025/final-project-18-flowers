import { useParams } from "react-router-dom";
import { cityInterestsData } from "../data/cityData";
import Attractions from "../components/Attractions";
import Hotels from "../components/Hotels";
import Restaurants from "../components/Restaurants";

/* REQS
----
- clicking on the card should link towards city interests page
  - get city name and match it 
- section 1: name of city with more descriptive text and year 
- section 2: thumbnail of the city 
- section 3: anchor nav bar that is fixed to the top once scroll to a certain point 
- section 4: lengthy description of the city -> handwrite might be the move or get from sources like wikipedia 
- section 5: the top 9 attractions in grid layout 
- section 6: four by four of restaurants in the city sorted by popularity
- section 7: four by four of restaurants in the city sorted by popularity

takeaways: 
- we must have a good way of storing locations especially since in interests, 
we are linking to attraction page directly so having a sorted database of links is important. Not to mention the search page as well. 
- the attraction page is very similar to the city interests page in retrospect since 
the only difference is a static map of the attraction and scheduling (get schedule information through getDetails())
*/

const CityInterests = () => {
  const { id } = useParams();  
  // taipei-city -> taipei city -> [taipei, city] 
  const wordsArr = id?.replace("-", " ").split(" ") ?? []; 
  // taipei => T + aipei and city => C + ity => Taipei City 
  const header = wordsArr.map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  console.log(header);

  const [imgSrc, description] = cityInterestsData[header as keyof typeof cityInterestsData] || ["", ""];
  
  console.log(imgSrc);
  console.log(description);

  return (
    <>
      <div>
        <h1 className="ci-header">{header}</h1>
        {/* <h1>ID: {id}</h1> */}
        <img src={imgSrc} alt={header} className="ci-thumb"></img>
        <p className="ci-description">{description}</p>
        {/* Display City Interests Content Here */}
      </div>
      <Attractions cityname={header}></Attractions>
      <div className="commodities-container">
        <Hotels cityname={header}></Hotels>
        <Restaurants cityname={header}></Restaurants>
      </div>
    </>
  )
}

export default CityInterests
