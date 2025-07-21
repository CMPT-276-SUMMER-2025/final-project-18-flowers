import { Map } from "@vis.gl/react-google-maps";

type Coord = {
  lat: number,
  lng: number,
}

const AttractionMap = ({ lat, lng }: Coord) => {
  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Map
        zoom={15}
        center={{ lat, lng }}
      ></Map>
    </div>
  )
}

export default AttractionMap
