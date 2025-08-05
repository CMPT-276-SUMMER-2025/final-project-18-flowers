import { useState } from "react";
import BookingFlights from "../components/BookingFlights";
import BookingHotels from "../components/BookingHotels";

/**
 * This is a component for the booking feature.
 */

/**
 * Displays an interface with booking options for flights or hotels.
 * @returns an interface with booking options
 */
const Booking = () => {
  const [select, setSelect] = useState<"flights" | "hotels">("flights"); 

  const labels = {
    flights: "flight",
    hotels: "hotel",
  };

  /**
   * Renders the selected booking form based on the user's choice.
   * @returns the selected booking form component
   */
  const ReturnForm = () => {
    switch (select) {
      case "flights":
        return <BookingFlights></BookingFlights>
      case "hotels":
        return <BookingHotels></BookingHotels>
      default:
        return null;
    };
  }

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="booking-title">Book your <strong>{labels[select]}</strong></h1>
        <div className="booking-buttons-container">
          { /* Highlights the selected button and shows the flights booking form when clicked. */}
          <button className={`booking-icon ${select === "flights" ? "selected" : "not-selected"}`} onClick={() => {setSelect("flights")}}>
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.36 18"/>
              <path d="M42 32v-4l-16-10v-11c0-1.66-1.34-3-3-3s-3 1.34-3 3v11l-16 10v4l16-5v11l-4 3v3l7-2 7 2v-3l-4-3v-11l16 5z"/>
              <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
            <p className="booking-type">Flights</p>
          </button>
          { /* Highlights the selected button and shows the hotels booking form when clicked. */}
          <button className={`booking-icon ${select === "hotels" ? "selected" : "not-selected"}`} onClick={() => {setSelect("hotels")}}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M22 11v9h-2v-3H4v3H2V4h2v10h8V7h6a4 4 0 0 1 4 4zm-2 3v-3a2 2 0 0 0-2-2h-4v5h6zM8 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <p className="booking-type">Hotels</p>
          </button>
        </div>
        <ReturnForm></ReturnForm>
      </div>
    </div>
  );
}

export default Booking;


