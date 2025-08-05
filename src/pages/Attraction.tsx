import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttractionMap from "../components/AttractionMap";
import NearbyHotels from "../components/NearbyHotels";
import NearbyRestaurants from "../components/NearbyRestaurants";
import AttractionPhotos from "../components/AttractionPhotos";
import AttractionTimetable from "../components/AttractionTimetable";
import AttractionDescription from "../components/AttractionDescription";
import Booking from "../components/Booking";
import NavBarAnchor from "../components/NavBarAnchor";

type Coord = { lat: number; lng: number };

const Attraction = () => {
  const { attract } = useParams();

  function formatAttractionName(slug: string | undefined) {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const [coord, setCoord] = useState<Coord | null>(null);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    async function getAttractionInfo() { 
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

      const request = {
        textQuery: attract,
        fields: [
          "displayName", 
          "formattedAddress", 
          "id", 
          "editorialSummary",  
          "location", 
          "regularOpeningHours",
        ],
        locationBias: { lat: 25.033964, lng: 121.564468 },
        language: "en-US",
        maxResultCount: 1,
      };

      const { places } = await Place.searchByText(request); 
      const myAttraction = places[0];
      const summary = myAttraction.editorialSummary;
      const placeLatLng = myAttraction.location;
      const hours = myAttraction.regularOpeningHours;

      setDescription(summary || null);

      if (placeLatLng) {
        setCoord({ lat: placeLatLng.lat(), lng: placeLatLng.lng(), });
      } else {
        setCoord(null);
      }

      if (hours?.weekdayDescriptions) {
      setOpeningHours(hours.weekdayDescriptions);
      }
    }
    getAttractionInfo();
  }, [attract]);  

  return (
    <>
      <div className="attraction-content-container">
        <div className="attraction-c1">
        {/* Attraction Page Title & 3 Attraction Photos */}
        <div className="">
            <h1 className="attraction-title">{formatAttractionName(attract)}</h1>
            <AttractionPhotos attract={formatAttractionName(attract)}></AttractionPhotos>
          </div>

          {/* Anchor Navigation Bar */}
         <NavBarAnchor />

          <div className="">
            <div className="commodities-container">
              <div className="attraction-description">
                <h2 className="attraction-sub-titles">Overview</h2>
                {description && (
                  <p>{description}</p>
                )}
                <div id="ai-description">
                  <AttractionDescription placeName={formatAttractionName(attract)}/>
                </div>
                <div className="attraction-map-container">
                  <div id="attraction-map">
                    <h2 className="attraction-sub-titles">Map</h2>
                    {coord && <AttractionMap lat={coord.lat} lng={coord.lng}></AttractionMap>}
                  </div>
                </div>
              </div>  
            </div>

            <div id="hours">
              <AttractionTimetable hours={openingHours} />
            </div>

            <div className="commodities-container">
              <div id="hotels">
                {coord && <NearbyHotels lat={coord.lat} lng={coord.lng}></NearbyHotels>}
              </div>
              <div id="restaurants">
                {coord && <NearbyRestaurants lat={coord.lat} lng={coord.lng}></NearbyRestaurants>}
              </div>
            </div>

          </div>
        </div>
        {/* Booking component when screen is large */} 
        <div className="attraction-c2 hidden xl:block">
          <Booking />
        </div> 
      </div>

      <div className="block xl:hidden w-[90%] max-w-[44rem] mx-auto mb-24">
        <Booking />
      </div>
    </>
  )
}

export default Attraction;


