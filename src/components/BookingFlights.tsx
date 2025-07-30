import { useState, useMemo } from "react";
import "../booking.css";

const BookingFlights = () => {
  const [origin, setOrigin] = useState("YVR");
  const [destination, setDestination] = useState("tpe");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const url = useMemo(() => {
    if (!origin || !destination || !checkIn || !checkOut) return "#"; // stay in taiwan explorers
    return (
      `https://flights.booking.com/flights/.${origin}-.${destination}/?type=ROUNDTRIP&adults=${adults}&children=${children}&cabinClass=ECONOMY&from=${origin}&to=${destination}&fromCountry=CA&toCountry=TW&fromLocationName=${origin}&toLocationName=${destination}&depart=${checkIn}&return=${checkOut}&sort=BEST&travelPurpose=leisure`
    )
  }, [origin, destination, checkIn, checkOut, adults, children]);

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <label>From:</label>
        <select onChange={(e) => setOrigin(e.target.value)} defaultValue="YVR">
          <option value="YVR">Vancouver (YVR)</option>
          <option value="YYZ">Toronto (YYZ)</option>
          <option value="LAX">Los Angeles (LAX)</option>
        </select>

        <label>To:</label>
        <select onChange={(e) => setDestination(e.target.value)} defaultValue="tpe">
          <option value="tpe">Taipei Taoyuan International Airport</option>
          <option value="tsa">Taipei Songshan Airport</option>
          <option value="khh">Kaohsiung International Airport</option>
        </select>

        <label>Departure Date:</label>
        <input type="date" onChange={(e) => setCheckIn(e.target.value)} />

        <label>Return Date:</label>
        <input type="date" onChange={(e) => setCheckOut(e.target.value)} />

        <label>Adults:</label>
        <select onChange={(e) => setAdults(e.target.value)} defaultValue="1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="3">4</option>
        </select>

        <label>Children:</label>
        <select onChange={(e) => setChildren(e.target.value)} defaultValue="0">
          <option value="">0</option>
          <option value="3">1</option>
          <option value="3%2C3">2</option>
          <option value="3%2C3%2C3">3</option>
          <option value="3%2C3%2C3%2C3">4</option>
        </select>
      </div>

      <div className="booking-button-wrapper">
        <a
          href={url}
          target="_blank"
          className="booking-button"
          style={{ // inform user that they need to provide input
            pointerEvents: url === "#" ? "none" : "auto", 
            opacity: url === "#" ? 0.5 : 1 
          }}
        >
          Search flights
        </a>
      </div>
    </div>
  );
};

export default BookingFlights;
