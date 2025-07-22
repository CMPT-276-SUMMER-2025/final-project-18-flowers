import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPlacesAttractions } from '../data/cityData';

type Props = { cityname: string, type: string };

const saveAPICost = false;

const InterestTypes = ({ cityname, type } : Props) => {
  // type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
  };

  const [places, setPlaces] = useState<TPlace[]>([]);

  useEffect(() => {
    if (saveAPICost) { 
      setPlaces(mockPlacesAttractions);
      return; 
    }

    const isEnglish = (text: string | undefined | null) =>
      text ? /^[\x00-\x7F]*$/.test(text) : false; //Checks if the result in cache is valid by checking if the result is in ASCII characters

    const cacheKey = `attractions-${cityname}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsed = JSON.parse(cachedData) as TPlace[];
      const valid = parsed.filter(p => isEnglish(p.displayName));
      if (valid.length >= 9) {
        setPlaces(valid.slice(0, 9)); //Only show the first 9 valid results in cache
        return;
      }
    }

    console.log("You just spent money! (aka there goes Alex's money)");

    const formattedType = type.replace(/_/g, " ");

    async function getAttractions() {
      const { Place, SearchByTextRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        textQuery: `${cityname} ${formattedType}`, // query 
        fields: ["id", "displayName", "photos"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedType: type, // only request tourist attractions
        rankPreference: SearchByTextRankPreference.RELEVANCE, // only request relevant to query 
        minRating: 3.5, // only request places with 4.0 <= rating <= 5.0
        maxResultCount: 6, // only request 9 places total
        useStrictTypeFiltering: true,
      }

      console.log("Hi: " + type);

      // oldName: newName 
      const { places: myPlaces } = await Place.searchByText(myRequest) as { places: google.maps.places.Place[] };

      const isEnglish = (text: string | undefined) =>
        text ? /^[\x00-\x7F]*$/.test(text) : false; //Checks if the result is in English by checking if the result is in ASCII characters

      const filteredPlaces = myPlaces.filter( //Filters the 15 results with only english results
        (place) =>
          typeof place.displayName === "string" &&
          isEnglish(place.displayName)
      );

      const formattedPlaces = filteredPlaces.slice(0, 9).map((place) => { //Only show the first 9 valid results
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
    <div id="it-container">
      <h1 className="it-title">{type}</h1>
      <div className="it-element-container">
        {places.map((place) => (
          <Link to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
            <div className="it-element">
              {
                place.photoUrl && 
                <img src={place.photoUrl} 
                      alt={ place.displayName || 'Tourism Attraction' } 
                      loading="lazy"
                      className="attractions-photo"
                />
              }
              <h3 className='attractions-name'>{place.displayName}</h3>
              <p>I'm a description</p>
              <img src=""></img>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default InterestTypes
