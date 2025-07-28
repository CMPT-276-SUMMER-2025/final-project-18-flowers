import { useState } from "react";
import "../booking.css";

const BookingCars = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

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
    `&dropoff_date=${formatDate(dropoffDate)}`;

  return (
    <>
      <div className="booking-container">
        <div className="booking-form-container">
          <label>Pickup City:</label>
          <select onChange={(e) => setPickup(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Taipei">Taipei</option>
            <option value="Hualien">Hualien</option>
            <option value="Tainan">Tainan</option>
            <option value="Yilan">Yilan</option>
            <option value="Taichung">Taichung</option>
            <option value="New Taipei">New Taipei</option>
          </select>

          <label>Drop-off City:</label>
          <select onChange={(e) => setDropoff(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Taipei">Taipei</option>
            <option value="Hualien">Hualien</option>
            <option value="Tainan">Tainan</option>
            <option value="Yilan">Yilan</option>
            <option value="Taichung">Taichung</option>
            <option value="New Taipei">New Taipei</option>
          </select>

          <label>Pickup Date:</label>
          <input type="date" onChange={(e) => setPickupDate(e.target.value)} />

          <label>Drop-off Date:</label>
          <input type="date" onChange={(e) => setDropoffDate(e.target.value)} />
        </div>

        <div className="booking-button-wrapper">
          <a href={url} target="_blank" className="booking-button">Search cars</a>
        </div>
      </div>
    </>
  );
};

export default BookingCars;
