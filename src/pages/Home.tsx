import Regions from "../components/Regions";
import HomeInterestsSection from "../components/HomeInterestsSection";
import HomeAttractionsSection from "../components/HomeAttractionsSection";
import Booking from "../components/Booking";
import "../home.css";

const Home = () => {
  return (
    <>
      <div id="bg-image" className="justify-center md:justify-normal">
        <h1 id="home-title" className="text-white font-bold text-5xl static left-0 md:absolute md:left-30">Taiwan Explorers</h1>
      </div>
      <div className="home-content-container">
        <div className="home-c1">
          <HomeInterestsSection />
          <HomeAttractionsSection />
          <Regions></Regions>
        </div>
        <div className="home-c2">
          <Booking />
        </div>
      </div>
    </>
  )
}

export default Home
