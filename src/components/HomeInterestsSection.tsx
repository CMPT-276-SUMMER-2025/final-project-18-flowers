import { HashLink } from "react-router-hash-link"

const HomeInterestsSection = () => {
  return (
    <>
      <h1 className="home-section-title">Interests</h1>
      <HashLink to="/interests#shopping_mall">
        <div className="interest-box">
          <div className="box-logo-container bg-emerald-500">
            <img src="logo.png" className="box-logo"></img>
          </div>
          <div className="interest-box-text">
            <h3>Shopping</h3>
            <p>Discover popular shopping centers to fulfill your desires.</p>
          </div>
        </div>
      </HashLink>
      <HashLink to="/interests#amusement_park">
        <div className="interest-box">
          <div className="box-logo-container bg-blue-600">
            <img src="logo.png" className="box-logo"></img>
          </div>
          <div className="interest-box-text">
            <h3>Shopping</h3>
            <p>Discover popular shopping centers to fulfill your desires.</p>
          </div>
        </div>
      </HashLink>
      <HashLink to="/interests#tourist_attraction">
        <div className="interest-box">
          <div className="box-logo-container bg-amber-400">
            <img src="logo.png" className="box-logo"></img>
          </div>
          <div className="interest-box-text">
            <h3>Shopping</h3>
            <p>Discover popular shopping centers to fulfill your desires.</p>
          </div>
        </div>
      </HashLink>
    </>
  )
}

export default HomeInterestsSection
