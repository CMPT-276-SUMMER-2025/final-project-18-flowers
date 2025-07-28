import { useState } from "react";
import "../booking.css";

const Booking = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");  
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const origin = "TPE"; // you can let user choose this later

  const formatDate = (dateStr: string) => dateStr; // "YYYY-MM-DD" is accepted directly

  const url = `https://flights.booking.com/flights/?` +
              `origin=${origin}` +
              `&destination=${destination.toUpperCase()}` +
              `&depart_date=${formatDate(checkIn)}` +
              `&return_date=${formatDate(checkOut)}` +
              `&adults=${adults}` +
              `&children=${children}`;

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <label>Destination Airport Code:</label>
        <input 
          type="text" 
          placeholder="e.g. KHH, TSA" 
          onChange={(e) => setDestination(e.target.value)} 
        />

        <label>Departure Date:</label>
        <input type="date" onChange={(e) => setCheckIn(e.target.value)} />

        <label>Return Date:</label>
        <input type="date" onChange={(e) => setCheckOut(e.target.value)} />

        <label>Adults:</label>
        <select onChange={(e) => setAdults(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <label>Children:</label>
        <select onChange={(e) => setChildren(e.target.value)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      <div className="booking-button-wrapper">
        <a href={url} target="_blank" className="booking-button">
          Search Flights
        </a>
      </div>
    </div>
  );
};

export default Booking;
