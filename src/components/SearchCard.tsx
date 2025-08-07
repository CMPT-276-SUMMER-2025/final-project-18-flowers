import { Link } from "react-router-dom";

/**
 * This is a component that displays the search results on the Search page.
 */

type dataProp = {
  id: number,
  name: string,
  imgPath: string,
  location: string,
  description: string,
  path: string,
}

//Displays object dataProp into a properly formatted search result.
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