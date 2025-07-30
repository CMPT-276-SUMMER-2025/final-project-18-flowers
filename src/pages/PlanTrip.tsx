// import PlanTripMap from "../components/PlanTripMap"
import ItineraryGenerator from "../components/ItineraryGenerator"

const PlanTrip = () => {
  return (

    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <ItineraryGenerator />
      </main>
    </div>
  )
}

export default PlanTrip;