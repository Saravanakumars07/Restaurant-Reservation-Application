import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Landing(){
  const [states,setStates] = useState([])
  const [cities,setCities] = useState([])
  const [sState,setSState] = useState('')
  const [sCity,setSCity] = useState('')
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    fetch('https://restaurantdata.onrender.com/states').then(r=>r.json()).then(setStates)
  },[])
  useEffect(()=>{
    if(!sState) return
    setLoading(true)
    fetch(`https://restaurantdata.onrender.com/cities/${sState}`).then(r=>r.json()).then(d=>{setCities(d);setLoading(false)})
  },[sState])

  const onSearch = (e)=>{
    e.preventDefault()
    if(!sState || !sCity) return
    nav(`/search?state=${sState}&city=${sCity}`)
  }

  return (
    <div>
      <div className="top-bar">Get 20% OFF on your first order - Use coupon SAVE20</div>

      <div className="hero">
        <div className="hero-text">
          <h1>Discover The Best<br/>Restaurant <span>Online</span><br/>Table Reservation</h1>
          <p style={{margin:'15px 0',color:'#666'}}>Search your favourite restaurant by state and city and book your table</p>
          
          <form onSubmit={onSearch} className="search-box">
            <div id="state">
              <select value={sState} onChange={e=>{setSState(e.target.value); setSCity('')}}>
                <option value="">Select State</option>
                {states.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div id="city">
              <select value={sCity} onChange={e=>setSCity(e.target.value)} disabled={!sState}>
                <option value="">{loading?'Loading...':'Select City'}</option>
                {cities.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" id="searchBtn">Search</button>
          </form>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/706/706164.png" width="280" alt="chef" />
      </div>

      <div className="feature-strip">
        <div>🍽️ Free Reservation</div>
        <div>⏰ 24/7 Support</div>
        <div>💳 Secure Payment</div>
      </div>

      <Swiper style={{margin:'20px 5%'}}>
        <SwiperSlide><div className="offer-grid"><div className="offer-card" style={{background:'#ff8a65'}}>50% OFF<br/>Delicious Food</div><div className="offer-card" style={{background:'#4db6ac'}}>50% OFF<br/>Super Food</div></div></SwiperSlide>
      </Swiper>

      <div style={{textAlign:'center',padding:'40px'}}>
        <h2>Read Our Latest News</h2>
        <p>Stay updated with latest offers</p>
      </div>

      <div style={{background:'#e3f2fd',padding:'40px 5%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2>Download the<br/>Restaurant Booking App</h2>
          <p>Get app for easy booking</p>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" width="180" alt="phone"/>
      </div>
    </div>
  )
}