import { Link } from "react-router-dom";

type dataProp = {
  id: number,
  name: string,
  imgPath: string,
  location: string,
  description: string,
  path: string,
}

// PARAM: object with property data where data is of type dataProp
export default function SearchCard({ data }: { data : dataProp }) {
  return (
    <div className="search-card-container">
      <Link to={data.path} className="search-card" key={data.id}> 
        <img className="search-image" src={data.imgPath}></img>
        <div className="search-card-text">
          <h1 className="search-name">{data.name}</h1>
          <h3 className="search-location">{data.location}</h3>
          <p className="search-description">{data.description}</p>
        </div>
      </Link>
    </div>
  );
}