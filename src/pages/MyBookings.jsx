export default function MyBookings(){
  const bookings = JSON.parse(localStorage.getItem('bookings')||'[]')
  return (
    <div style={{display:'flex',gap:'20px',padding:'20px 5%'}}>
      <div style={{flex:2}}>
        <h1>My Bookings</h1>
        {bookings.length===0 ? <p>No bookings yet</p> : bookings.map(b=>(
          <div key={b.id} className="restaurant-card">
            <div>
              <h3>{b.restaurantName}</h3>
              <p>{b.address}</p>
              <p>Date: {b.date} | Time: {b.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{flex:1,background:'#fff3e0',padding:'20px',borderRadius:'12px',height:'400px'}}>
        <h3>Special Offer</h3>
        <p>50% OFF on next booking</p>
        <img src="https://cdn-icons-png.flaticon.com/512/706/706164.png" width="120" alt="offer"/>
      </div>
    </div>
  )
}