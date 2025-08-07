import { useState } from "react";
import BookingFlights from "../components/BookingFlights";
import BookingHotels from "../components/BookingHotels";
import BookingCars from "../components/BookingCars";

/**
 * This is a component for the booking feature.
 */

/**
 * Displays an interface with booking options for flights, hotels or cars.
 * @returns an interface with booking options
 */
const Booking = () => {
  const [select, setSelect] = useState<"flights" | "hotels" | "cars">("flights"); 

  const labels = {
    flights: "flight",
    hotels: "hotel",
    cars: "car",
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
      case "cars":
        return <BookingCars></BookingCars>
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
          { /* Highlights the selected button and shows the cars booking form when clicked. */}
          <button
            className={`booking-icon ${select === "cars" ? "selected" : "not-selected"}`}
            onClick={() => setSelect("cars")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="48"
              height="48"
              viewBox="0 0 256 256"
              xmlSpace="preserve"
            >
              <g
                transform="translate(1.41 1.41) scale(2.81 2.81)"
              >
                <circle
                  cx="70.735"
                  cy="56.775"
                  r="1.955"
                />
                <circle
                  cx="19.765"
                  cy="56.775"
                  r="1.955"
                />
                <path
                  d="M 75.479 36.045 l -7.987 -1.22 l -2.35 -2.574 c -5.599 -6.132 -13.571 -9.649 -21.874 -9.649 h -6.245 c -1.357 0 -2.696 0.107 -4.016 0.296 c -0.022 0.004 -0.044 0.006 -0.066 0.01 c -7.799 1.133 -14.802 5.468 -19.285 12.106 C 5.706 37.913 0 45.358 0 52.952 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545 s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c 3.254 0 5.9 -2.646 5.9 -5.9 C 90 44.441 83.894 37.331 75.479 36.045 z M 43.269 26.602 c 7.065 0 13.848 2.949 18.676 8.094 H 39.464 l -3.267 -8.068 c 0.275 -0.009 0.55 -0.026 0.826 -0.026 H 43.269 z M 32.08 27.118 l 3.068 7.578 H 18.972 C 22.429 30.813 27.018 28.169 32.08 27.118 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C 77.36 60.427 74.39 63.397 70.738 63.397 z"
                />
              </g>
            </svg>
            <p className="booking-type">Cars</p>
          </button>
        </div>
        
        <ReturnForm></ReturnForm>
      </div>
    </div>
  );
}

export default Booking;



