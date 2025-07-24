import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockPlacesAttractions } from '../data/cityData';

type Props = { cityname: string };

const saveAPICost = true;

const Attractions = ({ cityname } : Props) => {
  // type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
  };

  const [places, setPlaces] = useState<TPlace[]>([]);
  const { id } = useParams();  
  console.log(id);

  useEffect(() => {
    if (saveAPICost) { 
      setPlaces(mockPlacesAttractions);
      return; 
    }

    const isEnglish = (text: string | undefined | null) =>
      text ? /^[\x00-\x7F]*$/.test(text) : false; //Checks if the result in cache is valid by checking if the result is in ASCII characters

    const cacheKey = `attractions-${cityname}`;
    const cachedData = localStorage.getItem(cacheKey);

    // if (cachedData) {
    //   const parsed = JSON.parse(cachedData) as TPlace[];
    //   const valid = parsed.filter(p => isEnglish(p.displayName));
    //   if (valid.length >= 9) {
    //     setPlaces(valid.slice(0, 9)); //Only show the first 9 valid results in cache
    //     return;
    //   }
    // }

    async function getAttractions() {
      const { Place, SearchByTextRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        textQuery: `${cityname} tourist attractions locations`, // query 
        fields: ["id", "displayName", "photos"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedType: "tourist_attraction", // only request tourist attractions
        rankPreference: SearchByTextRankPreference.RELEVANCE, // only request relevant to query 
        minRating: 3.5, // only request places with 4.0 <= rating <= 5.0
        maxResultCount: 15, // requests 15 places total, in case there are invalid results that includes non-english titles
        language: "en",
        region: 'us',
        useStrictTypeFiltering: true,
      }

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
        // DEBUG
        console.log(place.photos);
        console.log(firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 }));
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
  }, [cityname]);
  
  return (
    <>
      <h1 id="attractions-title">Attractions</h1>
      <div id="attractions-container">
        {places.map((place) => (
          <Link to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
            <div className="attractions">
              {
                place.photoUrl && 
                <img src={place.photoUrl} 
                      alt={ place.displayName || 'Tourism Attraction' } 
                      loading="lazy"
                      className="attractions-photo"
                />
              }
              <h3 className='attractions-name'>{place.displayName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Attractions
