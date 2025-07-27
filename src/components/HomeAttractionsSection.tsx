import { Link } from "react-router-dom";

const HomeAttractionsSection = () => {
  return (
    <>
      <h1 className="home-section-title">Top <strong>Attractions</strong> 2025</h1>
      <div id="home-attractions-container">
        <div id="card-wrapper">
          <Link to="/destinations/taipei-city/taipei-101-observatory">
            <div className="attraction-box">
              <img src="/assets/home/taipei-101.jpg" className="top-attraction-photo"></img>
              <p className="text-white font-extrabold inline-block bg-blue-500 px-3 py-1 rounded-4xl absolute top-[150px] left-[20px]">1</p>  
              <div className="top-attract-text-content">
                <h3 className="top-attraction-name">Taipei 101 Observatory</h3>
                <p className="num-visits">1.29M Visitors (2023)</p>
                <p className="top-rating">4.5 (70K)</p>
              </div>             
            </div>
          </Link>
          <Link to="/destinations/taipei-city/daan-park">
            <div className="attraction-box">
              <img src="/assets/home/daan-park.jpg" className="top-attraction-photo"></img>
              <p className="text-white font-extrabold inline-block bg-blue-500 px-3 py-1 rounded-4xl absolute top-[150px] left-[20px]">2</p>  
              <div className="top-attract-text-content">
                <h3 className="top-attraction-name">Daan Park</h3>
                <p className="num-visits">800K Visitors (2023)</p>
                <p className="top-rating">4.6 (41K)</p>
              </div>      
            </div>
          </Link>
          <Link to="/destinations/taipei-city/chiang-kai-shek-memorial-hall">
            <div className="attraction-box">
              <img src="/assets/home/sun-moon-lake.jpg" className="top-attraction-photo"></img>
              <p className="text-white font-extrabold inline-block bg-blue-500 px-3 py-1 rounded-4xl absolute top-[150px] left-[20px]">3</p>  
              <div className="top-attract-text-content">
                <h3 className="top-attraction-name">Sun Moon Lake</h3>
                <p className="num-visits">600K Visitors (2023)</p>
                <p className="top-rating">4.2 (2.7K)</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomeAttractionsSection
