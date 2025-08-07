import { useEffect, useState } from 'react';
import { mockPlacesHotels } from '../data/cityData';

/**
 * This is a component for displaying the Nearby Hotels section of Attraction page.
 */

type Props = {
  lat: number,
  lng: number,
 };

const saveAPICost = false;

/**
 * Displays a list of hotels based on a attraction's name and coordinates using Google Places API.
 * @param lat the latitude of the attraction
 * @param lng the longitude of the attraction
 * @returns 
 */
const NearbyHotels = ({ lat, lng }  : Props) => {
  //type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
    rating?: number | null;
  };

  const [places, setPlaces] = useState<TPlace[]>([]);
  const placeRadius = 3000;

  useEffect(() => {
    //Checks if Google Maps JS API is not yet loaded.
    if (!window.google || !google.maps) {
      console.warn("Google Maps JS API not yet loaded");
      return;
    }
    //If true, use mock data instead of API calls.
    if (saveAPICost) { 
      setPlaces(mockPlacesHotels);
      return; 
    }

    /**
     * Fetches hotels near the given coordinates using Google Places API and sets the places to be the fetched hotels.
     */
    async function getHotels() {
      const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      
      const myRequest = {
        locationRestriction: { 
          center: { lat, lng }, 
          radius: placeRadius,
        },
        fields: ["id", "displayName", "photos", "rating"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedTypes: ["hotel", "resort_hotel"], 
        rankPreference: SearchNearbyRankPreference.POPULARITY, // only request relevant to query 
        maxResultCount: 9, // only request 9 places total
        language: "en-US",
        region: 'us',
      }

      // oldName: newName 
      const { places: myPlaces } = await Place.searchNearby(myRequest);

      //Transforms the places into a more usable format.
      const formattedPlaces = myPlaces.map((place) => {
        const firstPhoto = place.photos?.[0];
        return ({
          id: place.id || ' ',
          displayName: place.displayName,
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 }),
          rating: place.rating ?? null,
        });
      });

      /**
       * Checks if more than 70% of the characters in a place name are ASCII (English characters).
       * @param text containing the text for checking
       * @returns {boolean} true if the text is mostly in English, false otherwise or if text does not exist
       */
      const isMostlyEnglish = (text: string | undefined | null) => {
        if (!text) {
          return false;
        }
        const englishChars = text.match(/[\x00-\x7F]/g)?.length ?? 0;
        const totalChars = text.length;
        return englishChars / totalChars > 0.7;
      };
      
      const filteredPlaces = formattedPlaces.filter((place) =>
        typeof place.displayName === "string" && 
        isMostlyEnglish(place.displayName)
      ).slice(0, 4); // Only show the first 4 valid results

      setPlaces(filteredPlaces);

    } 
    getHotels();
  }, [lat, lng]);

  
  return (
    <>
      <div className="commodity-container">
        <h3 className="attraction-sub-titles">Nearby Hotels</h3>
        {/* Creates a clickable container for each place, with its photo, name and rating. */}
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

export default NearbyHotels;
