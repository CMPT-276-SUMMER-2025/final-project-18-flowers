import { Map } from "@vis.gl/react-google-maps";

type Coord = {
  lat: number,
  lng: number,
}

const AttractionMap = ({ lat, lng }: Coord) => {
  return (
    <div className='border-0 rounded-4xl overflow-hidden m-6' style={{ width: "600px", height: "400px" }}>
      <Map
        zoom={15}
        center={{ lat, lng }}
      ></Map>
    </div>
  )
}

export default AttractionMap
