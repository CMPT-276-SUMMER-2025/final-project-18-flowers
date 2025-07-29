import { useState } from "react";
import BookingFlights from "../components/BookingFlights";
import BookingHotels from "../components/BookingHotels";
// import BookingCars from "../components/BookingCars";

const Booking = () => {

  // const [select, setSelect] = useState<"flights" | "hotels" | "cars">("flights"); 
  const [select, setSelect] = useState<"flights" | "hotels">("flights"); 


  const labels = {
    flights: "flight",
    hotels: "hotel",
    // cars: "car",
  };

  const ReturnForm = () => {
    switch (select) {
      case "flights":
        return <BookingFlights></BookingFlights>
      case "hotels":
        return <BookingHotels></BookingHotels>
      // case "cars":
      //   return <BookingCars></BookingCars>
      default:
        console.log("ERROR: could not determine which type to choose for booking form");
        return null;
    };
  }

  return (
    <div>
      <div className="booking-title">
        <h1>Book your <strong>{labels[select]}</strong></h1>
        <div>
          <button className="booking-button-type" onClick={() => {setSelect("flights")}}><img src="/assets/booking/flights.svg" alt="flights"></img></button>
          <button className="booking-button-type" onClick={() => {setSelect("hotels")}}><img src="/assets/booking/hotels.svg" alt="hotels"></img></button>
          {/* <button className="booking-button-type" onClick={() => {setSelect("cars")}}><img src="/assets/booking/cars.svg" alt="cars"></img></button> */}
        </div>
      </div>
      <div>
        <ReturnForm></ReturnForm>
      </div>
    </div>
  );
}

export default Booking;


