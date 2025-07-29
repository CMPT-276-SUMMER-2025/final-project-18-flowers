import { HashLink } from "react-router-hash-link"

type HomeInterestProp = {
  hash: string,
  classColor: string,
  logoSrc: string,
  interestType: string,
  description: string, 
}

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
