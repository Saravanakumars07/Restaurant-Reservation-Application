import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Landing(){
  const [states,setStates] = useState([])
  const [cities,setCities] = useState([])
  const [sState,setSState] = useState('')
  const [sCity,setSCity] = useState('')
  const [showState,setShowState] = useState(false)
  const [showCity,setShowCity] = useState(false)
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    fetch('https://restaurantdata.onrender.com/states').then(r=>r.json()).then(setStates)
  },[])
  useEffect(()=>{
    if(!sState) { setCities([]); return }
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
      <Swiper><SwiperSlide><div style={{height:'180px',background:'#f0f8ff',display:'flex',alignItems:'center',justifyContent:'center'}}><h2>Find Restaurants</h2></div></SwiperSlide></Swiper>

      <form onSubmit={onSearch} style={{padding:'20px',display:'flex',gap:'15px'}}>
        
        {/* STATE - MUST have id="state" and li inside */}
        <div id="state" style={{position:'relative'}}>
          <div onClick={()=>setShowState(!showState)} style={{border:'1px solid #ccc',padding:'10px',cursor:'pointer',minWidth:'150px'}}>
            {sState || 'Select State'}
          </div>
          {showState && (
            <ul style={{position:'absolute',background:'white',border:'1px solid #ccc',listStyle:'none',padding:0,maxHeight:'200px',overflowY:'auto',zIndex:10,width:'100%'}}>
              {states.map(s=>(
                <li key={s} onClick={()=>{setSState(s); setSCity(''); setShowState(false)}} style={{padding:'8px',cursor:'pointer',borderBottom:'1px solid #eee'}}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CITY - MUST have id="city" and li inside */}
        <div id="city" style={{position:'relative'}}>
          <div onClick={()=>sState && setShowCity(!showCity)} style={{border:'1px solid #ccc',padding:'10px',cursor:'pointer',minWidth:'150px',background:!sState?'#eee':'white'}}>
            {sCity || (loading?'Loading...':'Select City')}
          </div>
          {showCity && (
            <ul style={{position:'absolute',background:'white',border:'1px solid #ccc',listStyle:'none',padding:0,maxHeight:'200px',overflowY:'auto',zIndex:10,width:'100%'}}>
              {cities.map(c=>(
                <li key={c} onClick={()=>{setSCity(c); setShowCity(false)}} style={{padding:'8px',cursor:'pointer',borderBottom:'1px solid #eee'}}>
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" id="searchBtn" style={{background:'#0a9df5',color:'white',border:'none',padding:'10px 20px'}}>Search</button>
      </form>
    </div>
  )
}