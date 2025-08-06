import ViewButton from "./ViewButton";
import HomeAttraction from "./HomeAttraction";
import { topAttractions } from "../data/attractionData";

/**
 * This is a component for displaying the Top Attractions section of Home page.
 */

/**
 * Uses stored data and displays the Top Attractions section of Home page with a title, a list of attractions and a Discover More button.
 * @returns Top Attractions section of Home page
 */
const HomeAttractionsSection = () => {
  return (
    <>
      <h1 className="home-section-title">Top <strong>Attractions</strong></h1>

        <div id="home-attractions-container">
          <div id="card-wrapper">
            <HomeAttraction details={topAttractions[0]}></HomeAttraction>
            <HomeAttraction details={topAttractions[1]}></HomeAttraction>
            <HomeAttraction details={topAttractions[2]}></HomeAttraction>
          </div>
        </div>
        <div className="home-button-wrapper">
          <ViewButton path="/interests" direction="Discover More ➤"></ViewButton>
        </div>
    </>
  )
}

export default HomeAttractionsSection
