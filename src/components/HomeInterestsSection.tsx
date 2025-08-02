import ViewButton from "./ViewButton";
import HomeInterest from "./HomeInterest";
import { homeInterests } from "../data/attractionData";

const HomeInterestsSection = () => {
  return (
    <>
      <div id="home-interests-container">
        <h1 className="home-interests-title">Interests</h1>
        <HomeInterest details={homeInterests[0]}></HomeInterest>
        <HomeInterest details={homeInterests[1]}></HomeInterest>
        <HomeInterest details={homeInterests[2]}></HomeInterest>
      </div>
      <div className="home-button-wrapper">
        <ViewButton path="/interests" direction="View More"></ViewButton>
      </div>
    </>
  )
}

export default HomeInterestsSection
