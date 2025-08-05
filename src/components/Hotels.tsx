import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockPlacesHotels } from '../data/cityData';

type Props = { 
  cityname: string,
  latLng: { lat: number, lng: number }
};

const saveAPICost = false;

const Hotels = ({ cityname, latLng } : Props) => {
  // type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
    rating?: number | null;
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
          center: latLng, 
          radius: placeRadius,
        },
        fields: ["id", "displayName", "photos", "rating"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedTypes: ["hotel"], 
        rankPreference: SearchNearbyRankPreference.POPULARITY, // only request relevant to query 
        maxResultCount: 9, // only request 9 places total
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
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 }),
          rating: place.rating ?? null,
        });
      });
      
      const isMostlyEnglish = (text: string | undefined | null) => {
        if (!text) {
          return false;
        }
        const englishChars = text.match(/[\x00-\x7F]/g)?.length ?? 0;
        const totalChars = text.length;
        return englishChars / totalChars > 0.7;
      };
      
      const filteredPlaces = formattedPlaces.filter((place) =>
        typeof place.displayName === "string" && isMostlyEnglish(place.displayName) 
      ).slice(0, 4); // Only show the first 4 valid results

      setPlaces(filteredPlaces);

    } 
    getHotels();
  }, [cityname]);
  
  return (
    <>
      <div className="commodity-container">
        <h1 className="commodity-title">Hotels</h1>
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
              <div className="commodity-text">
                <h3 className='commodity-name'>{place.displayName}</h3>

                {place.rating !== undefined && place.rating !== null && (
                  <p className="commodity-rating">
                    ★ {place.rating.toFixed(1)} / 5
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

export default Hotels
