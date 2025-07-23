import { Link } from "react-router-dom";

const HomeAttractionsSection = () => {
  return (
    <>
      <h1 className="home-section-title">Top <strong>Attractions</strong> 2025</h1>
      <div id="home-attractions-container">
        <Link to="/destinations/taipei-city/taipei-101-observatory">
          <div className="attraction-box">
            <img src="/assets/home/taipei-101.jpg" className="top-attraction-photo"></img>
            <h3>Taipei 101 Observatory</h3>
            <p>1M+ Visits</p>
            <p>4.5 Star Rating (70,000+)</p>
          </div>
        </Link>
        <Link to="/destinations/taipei-city/daan-park">
          <div className="attraction-box">
            <img src="/assets/home/daan-park.jpg" className="top-attraction-photo"></img>
            <h3>Daan Park</h3>
            <p>1M+ Visits</p>
            <p>4.5 Star Rating (70,000+)</p>
          </div>
        </Link>
        <Link to="/destinations/taipei-city/chiang-kai-shek-memorial-hall">
          <div className="attraction-box">
            <img src="/assets/home/cksmh.jpg" className="top-attraction-photo"></img>
            <h3>Chiang Kai Shek Memorial Hall</h3>
            <p>1M+ Visits</p>
            <p>4.5 Star Rating (70,000+)</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default HomeAttractionsSection
