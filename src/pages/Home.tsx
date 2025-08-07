import Regions from "../components/Regions";
import HomeInterestsSection from "../components/HomeInterestsSection";
import HomeAttractionsSection from "../components/HomeAttractionsSection";
import Booking from "../components/Booking";
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <div id="bg-image" className="justify-center md:justify-normal">
        <div id="home-title" className="md:w-[70%] md:mx-auto">
          <div className="w-fit text-center">
            <h3 className="text-gray-200 font-light text-4xl">Explore</h3>
            <h1 className="text-white font-bold text-7xl">Taiwan</h1>
          </div>
        </div>
      </div>
      <div className="home-content-container">
        <div className="home-c1">
          <HomeInterestsSection />
          <HomeAttractionsSection />
          <Regions></Regions>
        </div>
        <div className="hidden xl:block">
          <Booking />
        </div>
      </div>
      <div className="block xl:hidden w-[60%] mx-auto mb-24">
          <Booking />
      </div>
    </>
  )
}

export default Home
