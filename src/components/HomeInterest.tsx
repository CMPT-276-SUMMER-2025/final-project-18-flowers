import { HashLink } from "react-router-hash-link"

/**
 * This is a component for displaying the Interests on Home page.
 */

type HomeInterestProp = {
  hash: string,
  classColor: string,
  logoSrc: string,
  interestType: string,
  description: string, 
}

/**
 * Styles and displays interests details with a link to the Interests page.
 * @param detail containing the details of the attraction
 * @returns styled interests details with a link to the Interests page
 */
const HomeInterest = ({ details } : { details : HomeInterestProp }) => {
  return (
    <HashLink to={`/interests#${details.hash}`}>
      <div className="interest-box">
        <div className={`box-logo-container ${details.classColor}`}>
          <img src={details.logoSrc} className="box-logo"></img>
        </div>
        <div className="interest-box-text">
          <h3>{details.interestType}</h3>
          <p>{details.description}</p>
        </div>
      </div>
    </HashLink>
  )
}

export default HomeInterest
