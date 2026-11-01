import { Link } from 'react-router-dom'
export default function Navbar(){
  return (
    <nav style={{display:'flex',gap:'20px',padding:'15px',borderBottom:'1px solid #ddd'}}>
      <Link to="/">Find Restaurants</Link>
      <Link to="/">Locations</Link>
      <Link to="/my-bookings">Reservations</Link>
      <Link to="/my-bookings">My Bookings</Link>
    </nav>
  )
}