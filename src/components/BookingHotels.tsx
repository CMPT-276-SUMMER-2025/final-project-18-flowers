import { useState, useMemo} from "react";
import "../booking.css";

/**
 * This is a component for the hotel section of booking feature.
 */

/**
 * Provides options and a button that is linked to an external website for booking hotels.
 * @returns booking options for hotels
 */
const Booking = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");  
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  
  /**
   * Constructs the URL for booking hotels based on user input.
   * Uses Booking.com format for the date and hotel details.
   * @returns formatted URL for booking hotels
   */
  const url = useMemo(() => {
      if (!destination || !checkIn || !checkOut) return "#"; // stay in taiwan explorers
      return (
        "https://www.booking.com/searchresults.html?" +
        `ss=${destination}` +
        `&checkin=${checkIn}` +
        `&checkout=${checkOut}` +
        `&group_adults=${adults}` +
        `&group_children=${children}`
      )
    }, [destination, checkIn, checkOut, adults, children]);

  return (
    <>
      <div className="booking-container">
        <div className="booking-form-container">
          <label>City:</label>
          <select name="cities" id="cities" onChange={ (e) => setDestination(e.target.value) }>
            <option value="">-- Select a place --</option>
            <option value="taipei">Taipei City</option>
            <option value="hualien">Hualien City</option>
            <option value="yilan">Yilan City</option>
            <option value="taichung">Taichung City</option>
            <option value="tainan">Tainan City</option>
            <option value="kaohsiung">Kaohsiung City</option>
            <option value="newtaipei">New Taipei City</option>
            <option value="keelung">Keelung City</option>
            <option value="taitung">Taitung City</option>
            <option value="nantou">Nantou County</option>
            <option value="chiayi">Chiayi City</option>
            <option value="pingtung">Pingtung County</option>
            <option value="miaoli">Miaoli County</option>
            <option value="changhua">Changhua County</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Check-in:</label>
              <input type="date" onChange={ (e) => setCheckIn(e.target.value) }></input>
            </div>
            <div className="flex flex-col">
              <label>Nights:</label>
              <input type="date" onChange={ (e) => setCheckOut(e.target.value) }></input>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Adults:</label>
              <select name="adults" id="adults" onChange={ (e) => setAdults(e.target.value) } defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Children:</label>
              <select name="children" id="children" onChange={ (e) => setChildren(e.target.value) } defaultValue="0">
                <option value="0">0</option>
                <option value="3">1</option>
                <option value="3%2C3">2</option>
                <option value="3%2C3%2C3">3</option>
                <option value="3%2C3%2C3%2C3">4</option>
              </select>
            </div>
          </div>
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
            Search stays
          </a>
        </div>
      </div>
    </>
  )
}

export default Booking
