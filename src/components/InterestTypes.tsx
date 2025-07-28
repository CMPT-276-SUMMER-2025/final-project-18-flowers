import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockInterestData } from '../data/cityData';

type interestProps = { 
  cityname: string, // cityname
  type: string  // type of place (e.g., amusement_park, chinese_restaurant, etc.)
};

const saveAPICreditsMode = false;    

// const interestTypesArr = ["shopping mall", "tourist_attraction", "amusement_park"];

const InterestTypes = ({ cityname, type } : interestProps) => {

  type Place = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
  };

  const [places, setPlaces] = useState<Place[]>([]);
  const [typeHeader, setTypeHeader] = useState('');

  useEffect(() => {
    if (saveAPICreditsMode) { 
      const formattedType = type.replace(/_/g, " "); 
      const newFormattedType = formattedType
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

      setTypeHeader(newFormattedType + "s");
      setPlaces(mockInterestData[type as keyof typeof mockInterestData]);
      return; 
    }

    /* ---- */
    const isEnglish = (text: string | undefined | null) =>
      text ? /^[\x00-\x7F]*$/.test(text) : false; // checks if the result in cache is valid by checking if result is in ASCII characters 

    const cacheKey = `attractions-${cityname}-${type}`;
    const cacheTimeKey = `${cacheKey}-timestamp`;
    const maxAge = 1000 * 60 * 60 * 6; // Set the cache to expire after 6 hours
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = Number(localStorage.getItem(cacheTimeKey));

    if (cachedData && Date.now() - cachedTime < maxAge) {
      try { // If the cache is valid, parse it
        const parsed = JSON.parse(cachedData) as Place[];
        const filtered = parsed.filter(p =>
          typeof p.id === 'string' &&
          typeof p.displayName === 'string' &&
          isEnglish(p.displayName) &&
          typeof p.photoUrl === 'string' &&
          p.photoUrl.startsWith('https://')
        );

        if (filtered.length >= 6) {
          setPlaces(filtered.slice(0, 6));
          return;
        }
      } catch (err) { // If parsing fails, we assume the cache is invalid
        console.warn("Invalid interest cache format. Refetching...");
      }
    }

    // Clear the cache if it's invalid or expired
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheTimeKey);
    /* ---- */

    const formattedType = type.replace(/_/g, " "); 
    const newFormattedType = formattedType
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    setTypeHeader(newFormattedType + "s");

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
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 })
        });
      });
      
      setPlaces(formattedPlaces);
      localStorage.setItem(cacheKey, JSON.stringify(formattedPlaces));
    } 
    getAttractions();
  }, [cityname, type]);
  
  return (
    <>
      <div id="it-container">
        <h1 className="it-title" id={type}>{typeHeader}</h1>
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
                <img src="/assets/interest-types/shopping.png" className='type-icon' alt={typeHeader}/>
                <p className='it-description'>I'm a description</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default InterestTypes
