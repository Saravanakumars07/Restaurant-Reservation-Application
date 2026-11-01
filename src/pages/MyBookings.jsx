import React from "react";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  return (
    <div>
      <header>
        <h1>My Bookings</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>
      <main>
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <ul>
            {bookings.map((b, i) => (
              <li key={i}>
                {b.restaurantName || b.name} - {b.date} at {b.timeSlot || b.time}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default MyBookings;