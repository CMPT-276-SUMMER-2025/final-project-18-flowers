import { Map } from "@vis.gl/react-google-maps";

type Coord = {
  lat: number,
  lng: number,
}

const AttractionMap = (latLng: Coord) => {
  return (
    <div>
      <Map
        zoom={4}
        center={latLng}
      ></Map>
    </div>
  )
}

export default AttractionMap
