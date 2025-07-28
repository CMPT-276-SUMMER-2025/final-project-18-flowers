import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockInterestData } from '../data/cityData';

type interestProps = { 
  cityname: string, // cityname
  type: string  // type of place (e.g., amusement_park, chinese_restaurant, etc.)
};

const saveAPICreditsMode = true;    

const InterestTypes = ({ cityname, type } : interestProps) => {

  // Record<Keys, Type> (utility type in TypeScript)
  const colorMap: Record<string, string> = {
    shopping_mall: "bg-blue-500",
    tourist_attraction: "bg-yellow-500",
    amusement_park: "bg-green-500",
    historical_place: "bg-pink-500",
  };
  
  const iconClass = colorMap[type] || "bg-blue-600";

  type Place = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
    editorialSummary?: string | null;
    description?: string; // ← this was missing
  };

  const [places, setPlaces] = useState<Place[]>([]);
  const [typeHeader, setTypeHeader] = useState('');


  // formats type into presentable header
  function formatHeader(header: string) {
    return header
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") + 's';
  }

  useEffect(() => {
    if (saveAPICreditsMode) { 
      const header = formatHeader(type);
      setTypeHeader(header);
      setPlaces(mockInterestData[type as keyof typeof mockInterestData]);
      return;
    }

    const formattedType = type.replace(/_/g, " ");
    const header = formatHeader(type);
    setTypeHeader(header);

    /* ---- */
    const isEnglish = (text: string | undefined | null) =>
      text ? /^[\x00-\x7F]*$/.test(text) : false; // checks if the result in cache is valid by checking if result is in ASCII characters 

    const cacheKey = `attractions-${cityname}-${type}`;
    const cachedData = localStorage.getItem(cacheKey);

    // if (cachedData) {
    //   const parsed = JSON.parse(cachedData) as Place[];
    //   const valid = parsed.filter(p => isEnglish(p.displayName));
    //   if (valid.length >= 6) {
    //     setPlaces(valid.slice(0, 6)); //Only show the first 6 valid results in cache
    //     return;
    //   }
    // }
    /* ---- */

    async function getAttractions() {
      const { Place, SearchByTextRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        textQuery: `${cityname} ${formattedType}`, // query 
        fields: ["id", "displayName", "photos"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedType: type, // only request tourist attractions
        rankPreference: SearchByTextRankPreference.RELEVANCE, // only request relevant to query 
        minRating: 3.5, // only request places with 4.0 <= rating <= 5.0
        maxResultCount: 15, // only request 15 places total
        useStrictTypeFiltering: true,
      }

      // oldName: newName 
      const { places: myPlaces } = await Place.searchByText(myRequest) as { places: google.maps.places.Place[] };

      /* ---- */
      const isEnglish = (text: string | undefined) =>
        text ? /^[\x00-\x7F]*$/.test(text) : false; // checks if the result in cache is valid by checking if result is in ASCII characters 
      
      const filteredPlaces = myPlaces.filter( // filters the 6 results with english results and results without the word "tour" in them
        (place) => {
          const name = place.displayName;
          return (
            typeof name === "string" &&
            isEnglish(name) &&
            !name.toLowerCase().includes("tour")
          );
        }
      );

      /* ---- */

      const formattedPlaces = filteredPlaces.slice(0, 6).map((place) => { //Only show the first 6 valid results
        const firstPhoto = place.photos?.[0];
        return ({
          id: place.id || ' ',
          displayName: place.displayName,
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 }),
          editorialSummary: place.editorialSummary,
        });
      });
      
      setPlaces(mockInterestData[type as keyof typeof mockInterestData]);
      localStorage.setItem(cacheKey, JSON.stringify(formattedPlaces));
    } 
    getAttractions();
  }, [cityname, type]);
  
  return (
    <>
      <div id="it-container">
        <h1 className="it-title" id={type}><strong>{typeHeader}</strong></h1>
        <div className="it-element-container">
          {places.map((place) => (
            <Link to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
              <div className="it-element">
                {
                  place.photoUrl && 
                  <img src={place.photoUrl} 
                        alt={ place.displayName || 'Interest Attraction' } 
                        loading="lazy"
                        className="it-photo"
                  />
                }
                <h3 className='it-name'>{place.displayName}</h3>
                <img src={`/assets/interest-types/${type}.png`} className={`type-icon ${iconClass}`} alt={typeHeader}/>
                <p className='it-description'>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default InterestTypes
