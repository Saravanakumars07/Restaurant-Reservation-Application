import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookingModal({restaurant, onClose}){
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const navigate = useNavigate()

  // Today to Today+7
  const today = new Date()
  const minDate = today.toISOString().split('T')[0]
  const max = new Date()
  max.setDate(today.getDate()+7)
  const maxDate = max.toISOString().split('T')[0]

  const timeSlots = {
    Today: ['11:00 AM','11:30 AM'],
    Morning: ['9:00 AM','10:00 AM','11:00 AM'],
    Afternoon: ['12:00 PM','1:00 PM','2:00 PM','3:00 PM'],
    Evening: ['6:00 PM','7:00 PM','8:00 PM','9:00 PM']
  }

  const handleBook = ()=>{
    if(!date || !time) return alert('Select date and time')
    const bookings = JSON.parse(localStorage.getItem('bookings')||'[]')
    bookings.push({
      id: Date.now(),
      restaurantName: restaurant.name || restaurant.restaurantName,
      address: restaurant.address,
      city: restaurant.city,
      state: restaurant.state,
      date,
      time
    })
    localStorage.setItem('bookings', JSON.stringify(bookings))
    onClose()
    navigate('/my-bookings')
  }

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{background:'#fff',padding:'20px',width:'90%',maxWidth:'500px'}}>
        <h2>{restaurant.name || restaurant.restaurantName}</h2>
        <p>{restaurant.address}</p>
        
        <label>Select Date (Today to next 7 days):</label>
        <input type="date" min={minDate} max={maxDate} value={date} onChange={e=>setDate(e.target.value)} />

        <div>
          {/* p tags REQUIRED */}
          {Object.keys(timeSlots).map(section=>(
            <div key={section}>
              <p>{section}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
                {timeSlots[section].map(t=>(
                  <button key={t} onClick={()=>setTime(t)} style={{background: time===t?'black':'#eee',color:time===t?'white':'black'}}>{t}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleBook}>Confirm Booking</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}