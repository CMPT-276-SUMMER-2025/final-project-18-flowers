import { useState } from "react";
import "../booking.css";

const Booking = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");  
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");


  // const formatDate = (dateStr: string) => dateStr; // "YYYY-MM-DD" is accepted directly

  const url = `https://flights.booking.com/flights/${origin.toUpperCase()}.CITY-${destination.toUpperCase()}.CITY/` +
    `?type=ROUNDTRIP` +
    `&adults=${adults}` +
    `&children=${children}` +
    `&cabinClass=ECONOMY` +
    `&from=${origin.toUpperCase()}.CITY` +
    `&to=${destination.toUpperCase()}.CITY` +
    `&fromCountry=CA` +
    `&toCountry=TW` +
    // `&fromLocationName=${encodeURIComponent(fromLocationName)}` +
    // `&toLocationName=${encodeURIComponent(toLocationName)}` +
    `&depart=${checkIn}` +
    `&return=${checkOut}` +
    `&sort=BEST` +
    `&travelPurpose=leisure` +
    `&ca_source=flights_search_sb` +
    `&aid=304142&label=flights-booking-direct`;

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <label>From:</label>
        <select onChange={(e) => setOrigin(e.target.value)}>
          <option value="YVR">Vancouver (YVR)</option>
          <option value="YYZ">Toronto (YYZ)</option>
          <option value="LAX">Los Angeles (LAX)</option>
        </select>
        <label>To:</label>
        <select onChange={(e) => setDestination(e.target.value)}>
          <option value="tpe">Taipei Taoyuan International Airport</option>
          <option value="tsa">Taipei Songshan Airport</option>
          <option value="khh">Kaohsiung International Airport</option>
        </select>

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
          Search flights
        </a>
      </div>
    </div>
  );
};

export default Booking;
