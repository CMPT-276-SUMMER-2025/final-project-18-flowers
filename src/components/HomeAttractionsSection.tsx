import ViewButton from "./ViewButton";
import HomeAttraction from "./HomeAttraction";
import { topAttractions } from "../data/attractionData";

const HomeAttractionsSection = () => {
  return (
    <>

      <h1 className="home-section-title">Top <strong>Attractions</strong> 2025</h1>

        <div id="home-attractions-container">
          <div id="card-wrapper">
            <HomeAttraction details={topAttractions[0]}></HomeAttraction>
            <HomeAttraction details={topAttractions[1]}></HomeAttraction>
            <HomeAttraction details={topAttractions[2]}></HomeAttraction>
          </div>
        </div>
        <div className="home-button-wrapper">
          <ViewButton path="/interests" direction="Discover more"></ViewButton>
        </div>
    </>
  )
}

export default HomeAttractionsSection
