import InterestTypes from "../components/InterestTypes";
import "../interestsTypes.css";

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
