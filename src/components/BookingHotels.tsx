
import { useState } from "react";
import "../booking.css";

const Booking = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");  
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const getYear = (dateStr : string) => new Date(dateStr).getFullYear();
  const getMonth = (dateStr : string) => new Date(dateStr).getMonth();
  const getDate = (dateStr : string) => new Date(dateStr).getDate();

  const url =
    "https://www.booking.com/searchresults.html?" +
    `ss=${destination}` +
    `&checkin_year=${getYear(checkIn)}` +
    `&checkin_month=${getMonth(checkIn)}` +
    `&checkin_monthday=${getDate(checkIn)}` +
    `&checkout_year=${getYear(checkOut)}` +
    `&checkout_month=${getMonth(checkOut)}` +
    `&checkout_monthday=${getDate(checkOut)}` +
    `&group_adults=${adults}` +
    `&group_children=${children}`
  ;

  return (
    <>
      <div className="booking-container">
        <div className="booking-form-container">
          <label>City:</label>
          <select name="cities" id="cities" onChange={ (e) => setDestination(e.target.value) }>
            <option value="">-- Select an option --</option>
            <option value="taipei">Taipei</option>
            <option value="hualien">Hualien</option>
            <option value="tainan">Tianan</option>
            <option value="yilan">Yilan</option>
            <option value="taichung">Taichung</option>
            <option value="newtaipei">New Taipei</option>
          </select>

          <label>Check-in:</label>
          <input type="date" onChange={ (e) => setCheckIn(e.target.value) }></input>

          <label>Nights:</label>
          <input type="date" onChange={ (e) => setCheckOut(e.target.value) }></input>

          <label>Adults:</label>
          <select name="adults" id="adults" onChange={ (e) => setAdults(e.target.value) }>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <label>Children:</label>
          <select name="children" id="children" onChange={ (e) => setChildren(e.target.value) }>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="booking-button-wrapper">
          <a href={url} target="_blank" className="booking-button">Search stays</a>
        </div>
      </div>
    </>
  )
}

export default Booking
