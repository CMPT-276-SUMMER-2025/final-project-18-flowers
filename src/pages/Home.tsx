import Regions from "../components/Regions";
import HomeInterestsSection from "../components/HomeInterestsSection";
import HomeAttractionsSection from "../components/HomeAttractionsSection";
import "../home.css";

const Home = () => {
  return (
    <>
      <div id="bg-image" className="justify-center md:justify-normal">
        <h1 id="home-title" className="text-white font-bold text-5xl static left-0 md:absolute md:left-30">Taiwan Explorers</h1>
      </div>
      <div>
        <HomeInterestsSection />
      </div>
      <div>
        <HomeAttractionsSection />
      </div>
      <Regions></Regions>
    </>
  )
}

export default Home
