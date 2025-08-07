import InterestTypes from "../components/InterestTypes";
import "../styles/interestsTypes.css";

/**
 * This is the Interests page of the website.
 */

/**
 * Renders each section on the Rendered page.
 * @returns rendered Interests page sections
 */
const Interests = () => {
  return (
    <div>
      <h1 id="it-page-title">Find Your <strong>Interest</strong> at <strong>Taiwan</strong></h1>
      <InterestTypes cityname="Taiwan" type="shopping_mall"></InterestTypes>
      <InterestTypes cityname="Taiwan" type="amusement_park"></InterestTypes>
      <InterestTypes cityname="Taiwan" type="tourist_attraction"></InterestTypes>
      <InterestTypes cityname="Taiwan" type="historical_place"></InterestTypes>
    </div>
  )
}

export default Interests
