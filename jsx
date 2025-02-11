import React, { useState } from 'react';
import './App.css'; // Assuming the CSS is in App.css

const App = () => {
  const [seatsLeft, setSeatsLeft] = useState(50); // Starting with 50 seats available
  const [reservations, setReservations] = useState([]);

  // Handle reservation form submission
  const handleReservation = (event) => {
    event.preventDefault();
    const guestCount = parseInt(event.target.guestCount.value);

    // Check if there are enough seats
    if (guestCount <= seatsLeft) {
      // Update the number of seats available
      setSeatsLeft(seatsLeft - guestCount);

      // Add reservation to the list
      setReservations([
        ...reservations,
        {
          name: event.target.name.value,
          phone: event.target.phone.value,
          guestCount,
          checkInTime: new Date().toLocaleTimeString(),
          checkoutStatus: false,
        },
      ]);

      event.target.reset();
    } else {
      alert("Not enough seats available!");
    }
  };

  // Handle checkout
  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkoutStatus = true;

    // Update the number of seats when customer checks out
    setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
    setReservations(updatedReservations);
  };

  // Handle reservation deletion
  const handleDelete = (index) => {
    const updatedReservations = [...reservations];
    const guestCount = updatedReservations[index].guestCount;
    updatedReservations.splice(index, 1);

    setSeatsLeft(seatsLeft + guestCount);
    setReservations(updatedReservations);
  };

  return (
    <div className="container">
      <h1>Restaurant Reservation</h1>
      <p>Seats Left: {seatsLeft}</p>

      {/* Reservation Form */}
      <form onSubmit={handleReservation}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="phone" placeholder="Phone" required />
        <input type="number" name="guestCount" placeholder="Guest Count" required min="1" />
        <button type="submit" className={seatsLeft === 0 ? 'move' : ''}>Reserve Table</button>
      </form>

      {/* Reservation Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Check-In Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.name}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.checkInTime}</td>
              <td>{reservation.checkoutStatus ? 'Checked Out' : 'Not Checked Out'}</td>
              <td>
                {!reservation.checkoutStatus && (
                  <button onClick={() => handleCheckout(index)}>Click to Checkout</button>
                )}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
