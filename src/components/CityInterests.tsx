import { useParams } from "react-router-dom";

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

  console.log("ID CHECK: " + id);

  // async function getAttractions() {
  //   const {Place} = await google.maps.importLibrary("places");

  //   const options = { 
  //     id: "place ID goes here",
  //     requestedLanguage: "en",
  //   }

  //   const service = new Place({
  //     options,
  //   });


  // }

  return (
    <div>
      <h1>City Interests Page for Item: {id}</h1>
      <h1>{id}</h1>
      {/* Display City Interests Content Here */}
    </div>
  )
}

export default CityInterests
