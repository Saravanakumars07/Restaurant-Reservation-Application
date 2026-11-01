import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || localStorage.getItem("myBookings") || "[]");
    setBookings(stored);
  }, []);

  return (
    <div>
      <header>
        <h1>My Bookings</h1>
      </header>
      <main>
        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>{booking.restaurantName || booking.name || booking.restaurant?.name}</h3>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.timeSlot || booking.time || booking.slot}</p>
              <p>Guests: {booking.guests || booking.people || 2}</p>
              <p>Location: {booking.location || booking.city}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default MyBookings;