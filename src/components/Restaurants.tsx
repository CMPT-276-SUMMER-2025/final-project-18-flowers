import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockPlacesRestaurants } from '../data/cityData';

type Props = { 
  cityname: string,
  latLng: { lat: number, lng: number }
};

const saveAPICost = false;

const Restaurants = ({ cityname, latLng } : Props) => {
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
  console.log("cityname: " + cityname);

  const placeRadius = 3000; 

  useEffect(() => {
    if (saveAPICost) { 
      setPlaces(mockPlacesRestaurants);
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
        includedTypes: ["restaurant"], 
        rankPreference: SearchNearbyRankPreference.POPULARITY, // only request relevant to query 
        maxResultCount: 12, // only request 4 places total
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

      const isMostlyEnglish = (text: string | undefined | null) => { // checks if more than 70% of the characters are English
        if (!text) {
          return false;
        }
        const englishCharacters = text.match(/[\x00-\x7F]/g)?.length ?? 0; // Count of ASCII characters
        const totalCharacters = text.length; // Total characters in the string
        return englishCharacters / totalCharacters > 0.7; // More than 70% English characters
      };

      const isNotHotel = (text: string | undefined | null) => { // filters out places with keywords related to hotels
        if (!text) {
          return false;
        }
        const lower = text.toLowerCase();
        const hotelKeywords = [ "hotel", "inn", "resort", "motel", "villa", "homestay"];
        return !hotelKeywords.some((keyword) => lower.includes(keyword)); // returns true if none of the keywords are found
      };
      
      const filteredPlaces = formattedPlaces.filter((place) =>
        typeof place.displayName === "string" &&
        isMostlyEnglish(place.displayName) &&
        isNotHotel(place.displayName)
      ).slice(0, 4); // Only show the first 4 valid results

      setPlaces(filteredPlaces);

    } 
    getHotels();
  }, [cityname]);
  
  return (
    <>
      <div className="commodity-container">
        <h1 className="commodity-title">Restaurants</h1>
        {places.map((place) => (
          <a 
            key = {place.id}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName + ' ' + cityname)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='commodity-content'>
              {
                place.photoUrl && 
                <img src={place.photoUrl} 
                      alt={ place.displayName || 'Restaurant' } 
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

export default Restaurants
