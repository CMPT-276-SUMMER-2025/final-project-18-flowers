import "../booking.css";

/**
 * This is a component for the car section of booking feature.
 */

/**
 * Provides a button that is linked to an external website for booking cars.
 * @returns booking button for cars
 */
const BookingCars = () => {
  return (
    
    <div className="booking-container">
      <div className="booking-form-container">
        <div className="booking-button-wrapper">
          <a
            href="https://www.klook.com/car-rentals/"
            target="_blank"
            rel="noopener noreferrer"
            className="booking-button"
          >
            Search cars
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingCars;
/*
const BookingCars = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");


  // Booking.com format: yyyy-mm-dd
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""; // or undefined/null, whichever you prefer
    return new Date(dateStr).toISOString().split("T")[0];
  };
  
  const url =
  "https://www.booking.com/cars/index.html?" +
  `location=${pickup}` +
  `&dropofflocation=${dropoff}` +
  `&pickup_date=${formatDate(pickupDate)}` +
  `&pickup_time=${pickupTime}` +
  `&dropoff_date=${formatDate(dropoffDate)}` +
  `&dropoff_time=${dropoffTime}`;


  return (
    <>
      <div className="booking-container">
        <div className="booking-form-container">
          <label>Pickup City:</label>
          <select onChange={(e) => setPickup(e.target.value)}>
            <option value="">-- Select --</option>
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

          <label>Drop-off City:</label>
          <select onChange={(e) => setDropoff(e.target.value)}>
            <option value="">-- Select --</option>
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

          <label>Pickup Date:</label>
          <input type="date" onChange={(e) => setPickupDate(e.target.value)} />

          <label>Pickup Time:</label>
          <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />

          <label>Drop-off Date:</label>
          <input type="date" onChange={(e) => setDropoffDate(e.target.value)} />
          
          <label>Drop-off Time:</label>
          <input type="time" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} />

        </div>
          
        <div className="booking-button-wrapper">
          <a href={url} target="_blank" className="booking-button">Search cars</a>
        </div>
      </div>
    </>
  );
};

export default BookingCars;
*/