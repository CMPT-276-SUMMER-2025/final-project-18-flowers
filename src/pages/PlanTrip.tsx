import ItineraryGenerator from "../components/ItineraryGenerator"

/**
 * This is the Plan a Trip page of the website.
 */

/**
 * Renders each section on the Rendered page.
 * @returns rendered page sections
 */
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