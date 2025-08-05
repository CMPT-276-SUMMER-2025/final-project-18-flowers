import { useState, useEffect } from "react";

/**
 * This is a component for the attraction photos on an attraction page.
 */

type Props = { attract: string; }
type TPhoto = { url: string; };

/**
 * Loads and displays photos of as attraction in Taiwan based on the provided attraction name
 * @param attract containing the attraction name
 * @returns photos of the attraction
 */
const AttractionPhotos = ({ attract }: Props) => {
  const [photos, setPhotos] = useState<TPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches photos of the attraction using Google Places API and sets the state with the fetched photos
   */
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

        const request = {
          textQuery: attract,
          fields: ["photos"],
          language: "en-US",
          maxResultCount: 1,
        };

        const { places } = await Place.searchByText(request);
        const place = places?.[0];
        const placePhotos = place?.photos || [];
        const imageUrls = placePhotos.map((photo) => ({
          url: photo.getURI(),
        }));

        setPhotos(imageUrls.slice(0,2)); // number of photos
        
      } catch (err) {
        console.error("Failed to fetch attraction photos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  
  }, [attract]);

  if (loading) return <p>Loading photos...</p>;
  if (photos.length === 0) return <p>No photos available.</p>;

  return (
    <div className="attraction-photo-gallery">
      {/* Renders photos one by one from the photos array */}
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo.url}
          alt={`Photo of ${attract}`}
          className="attraction-photo"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default AttractionPhotos;
