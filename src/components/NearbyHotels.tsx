import { useEffect, useState } from 'react';
import { mockPlacesHotels } from '../data/cityData';

type Props = {
  lat: number,
  lng: number,
 };

const saveAPICost = false;

const NearbyHotels = ({ lat, lng }  : Props) => {
  // type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
  };


  const [places, setPlaces] = useState<TPlace[]>([]);
  const placeRadius = 3000;

  useEffect(() => {
    if (saveAPICost) { 
      setPlaces(mockPlacesHotels);
      return; 
    }
    console.log("You just spent money!");
    async function getHotels() {
      const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      
      const myRequest = {
        locationRestriction: { 
          center: { lat, lng }, 
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
  }, [lat, lng]);

  
  return (
    <>
      <div className="commodity-container">
        <h1 className="attraction-sub-titles">Nearby Hotels</h1>
        {places.map((place) => (
          <a 
            key = {place.id}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName || '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='commodity-content'>
              {
                place.photoUrl && 
                <img src={place.photoUrl} 
                      alt={ place.displayName || 'Hotel' } 
                      loading="lazy"
                      className="commodity-photo"
                />
              }
              <h3 className='commodity-name'>{place.displayName}</h3>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

export default NearbyHotels;
