import { Link } from "react-router-dom"

/**
 * This is a component for the individual attractions of Home page.
 */

type HomeAttractionProp = {
  path: string,
  imgPath: string,
  name: string,
  visits: string,
  rating: string,
  rank: number;
}

/**
 * Styles and displays attraction details with a link to the Attraction page.
 * @param detail containing the details of the attraction
 * @returns styled individual attraction details with a link to the Attraction page
 */
const HomeAttraction = ({ details } : { details : HomeAttractionProp }) => {
  return (
    <div>
       <Link to={`/destinations/taipei-city/${details.path}`}>
          <div className="attraction-box">
            <img src={`/assets/home/${details.imgPath}`} className="top-attraction-photo"></img>
            <p className="text-white font-extrabold inline-block bg-blue-500 px-3 py-1 rounded-4xl absolute top-[124px] left-[20px]">{details.rank}</p>  
            <div className="top-attract-text-content">
              <h3 className="top-attraction-name">{details.name}</h3>
              <p className="num-visits">{details.visits}</p>
              <p className="top-rating">{details.rating}</p>
            </div>             
          </div>
        </Link>
    </div>
  )
}

export default HomeAttraction
