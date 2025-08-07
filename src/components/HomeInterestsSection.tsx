import ViewButton from "./ViewButton";
import HomeInterest from "./HomeInterest";
import { homeInterests } from "../data/attractionData";

/**
 * This is a component for displaying the Interests section of Home page.
 */

/**
 * Uses stored data and displays the Interests section of Home page with a title, a list of interests and a View More button.
 * @returns Interests section of Home page
 */
const HomeInterestsSection = () => {
  return (
    <>
      <div id="home-interests-container">
        <h1 className="home-section-title"><strong>Interests</strong></h1>
        <HomeInterest details={homeInterests[0]}></HomeInterest>
        <HomeInterest details={homeInterests[1]}></HomeInterest>
        <HomeInterest details={homeInterests[2]}></HomeInterest>
      </div>
      <div className="home-button-wrapper">
        <ViewButton path="/interests" direction="View More ➤"></ViewButton>
      </div>
    </>
  )
}

export default HomeInterestsSection
