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
    console.log("You just spent money!");

    async function getAttractions() {
      const { Place, SearchByTextRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        textQuery: `${cityname} tourist attractions locations`, // query 
        fields: ["id", "displayName", "photos"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedType: "tourist_attraction", // only request tourist attractions
        rankPreference: SearchByTextRankPreference.RELEVANCE, // only request relevant to query 
        minRating: 4.5, // only request places with 4.0 <= rating <= 5.0
        maxResultCount: 9, // only request 9 places total
        language: "en-US",
        region: 'us',
      }

      // oldName: newName 
      const { places: myPlaces } = await Place.searchByText(myRequest);

      const formattedPlaces = myPlaces.map((place) => {
        const firstPhoto = place.photos?.[0];
        return ({
          id: place.id || ' ',
          displayName: place.displayName,
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 })
        });
      });
      
      setPlaces(formattedPlaces);

    } 
    getAttractions();
  }, [cityname]);
  
  return (
    <>
      <h1 id="attraction-title">Attractions</h1>
      <div id="attraction-container">
        {places.map((place) => (
          <Link to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`}>
            <div key={place.id} className="attraction">
              {
                place.photoUrl && 
                <img src={place.photoUrl} 
                      alt={ place.displayName || 'Tourism Attraction' } 
                      loading="lazy"
                      className="attraction-photo"
                />
              }
              <h3 className='attraction-name'>{place.displayName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Attractions
