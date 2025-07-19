import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockPlacesHotels } from '../data/cityData';


type Props = { cityname: string };

const saveAPICost = true;

const Commodities = ({ cityname } : Props) => {
  // type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
  };


  const [places, setPlaces] = useState<TPlace[]>([]);
  const { id } = useParams();  
  console.log(id);

  const placeRadius = 3000;

  useEffect(() => {
    if (saveAPICost) { 
      setPlaces(mockPlacesHotels);
      return; 
    }
    async function getHotels() {
      const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        locationRestriction: { 
          center: { lat: 24.7571, lng: 121.7539 }, 
          radius: placeRadius,
        },
        fields: ["id", "displayName", "photos"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedTypes: ["hotel", "resort_hotel"], 
        rankPreference: SearchNearbyRankPreference.POPULARITY, // only request relevant to query 
        maxResultCount: 4, // only request 9 places total
        language: "en-US",
        region: 'us',
      }

      // oldName: newName 
      const { places: myPlaces } = await Place.searchNearby(myRequest);

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
    getHotels();
  }, [cityname]);
  
  return (
    <div id="hotel-container">
      {places.map((place) => (
        <Link key={place.id} to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`}>
          <div>
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
  )
}

export default Commodities
