import { useState, useEffect } from "react";

type Props = { attract: string; }
type TPhoto = { url: string; };


const AttractionPhotos = ({ attract }: Props) => {
  const [photos, setPhotos] = useState<TPhoto[]>([]);
  const [loading, setLoading] = useState(true);

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
          url: photo.getURI({ maxWidth: 400, maxHeight: 300 }),
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
