import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookingModal from '../components/BookingModal'

export default function Search(){
  const [params] = useSearchParams()
  const state = params.get('state')
  const city = params.get('city')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    if(!state || !city) return
    setLoading(true)
    fetch(`https://restaurantdata.onrender.com/restaurants?state=${state}&city=${city}`)
      .then(r=>r.json())
      .then(d=> {
        // API can return array OR { restaurants: [] } OR { data: [] }
        let list = []
        if(Array.isArray(d)) list = d
        else if(d.restaurants) list = d.restaurants
        else if(d.data) list = d.data
        else if(d.result) list = d.result
        else list = []

        console.log('API response:', d) // check in console
        setRestaurants(list)
        setLoading(false)
      })
      .catch(()=> setLoading(false))
  },[state,city])

  if(loading) return <p>Loading... Backend may take 60 seconds</p>

  return (
    <div style={{padding:'20px'}}>
      {/* REQUIRED: h1 with exact format */}
      <h1>{restaurants.length} restaurants available in {city}</h1>
      
      <div style={{display:'grid',gap:'15px'}}>
        {restaurants.map((r,idx)=>{
          // Handle all possible field names
          const name = r.name || r.restaurantName || r.RestaurantName || r.Restaurant_Name || r.restaurant_name || 'Restaurant'
          const address = r.address || r.Address || r.streetAddress || ''
          const rCity = r.city || r.City || city || ''
          const rState = r.state || r.State || state || ''
          const rating = r.rating || r.overallRating || r.OverallRating || r.Overall_Rating || r.overall_rating || '4.5'

          return (
            <div key={r.id || idx} style={{border:'1px solid #ccc',padding:'15px'}}>
              <h3>{name}</h3>
              <p>{address}</p>
              <p>{rCity}, {rState}</p>
              <p>Rating: {rating}</p>
              <button onClick={()=>setSelected({...r, name, address, city: rCity, state: rState, rating})}>
                Book FREE Reservation
              </button>
            </div>
          )
        })}
      </div>

      {restaurants.length === 0 && !loading && <p>No restaurants found</p>}

      {selected && <BookingModal restaurant={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}