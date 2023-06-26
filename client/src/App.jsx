import { useEffect, useState } from 'react'
import './App.scss'
import useFetch from './useFetch'
import axios from 'axios'

function App() {
  const [ data ] = useFetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
  const [ dateList ] = useFetch('/weather/all')
  const [ weatherIcon,setweatherIcon ] = useState('cloudy')
  const [ weatherData,setweatherData ] = useState()
  const [ message, setMessage ] = useState('')
  const [ date, time ] = weatherData?.current_weather?.time && (weatherData?.current_weather?.time).split('T') || ['no Date','no Time']

  const setWeatherIconFn = () => {
    if(weatherData?.current_weather?.weathercode <= 49){
      setweatherIcon('snow')
      return
    }else if(weatherData?.current_weather?.weathercode <= 69){
      setweatherIcon('rain')
      return
    }else if(weatherData?.current_weather?.weathercode <= 90){
      setweatherIcon('fog')
      return
    }else if(weatherData?.current_weather?.weathercode <= 99){
      setweatherIcon('thunderstorm')
      return
    }else {
      setweatherIcon('cloudy')
      return
    }
  }

  useEffect(
    ()=>{
      setweatherData(data)
      setWeatherIconFn()
    },[data,message]
  )

  

  const saveWeatherInfo = async () => {
    try{

      const response = await axios.post('/weather/store', weatherData)
      const jsonData = await response.data
      setMessage(jsonData.message)
      setTimeout(
        ()=>{
          setMessage('')
        },3000
      )
    }catch(err){
      console.log(err.response.data.error)
      setMessage(err.response.data.error)
      setTimeout(
        ()=>{
          setMessage('')
        },3000
      )
    }
  }

  return (
    <>
    <div className='container'>
      <section className='left-panel'>
        <h1>Date List</h1>
        <hr/><hr/>
        <div className='button-group'>
          {
            dateList && dateList.map(
              date => {
                const [ d, t ] = date.current_weather.time.split('T')
                return (
                  <button key={date._id} onClick={()=>setweatherData(date)}>{d} {t}</button>
                  )
              }
            )
          }
          
        </div>
      </section>
      <section className="widget">
        <h1>Weather Info</h1>
        <div className="weatherIcon"><i className={`wi wi-day-${weatherIcon}`}></i></div>
        <div className="weatherInfo">
          <div className="temperature"><span>{weatherData?.current_weather?.temperature}{weatherData?.hourly_units?.temperature_2m}</span></div>
          <div className="description">    
            <div className="weatherCondition">Place</div>    
            <div className="place">lat: {weatherData?.latitude} </div>
            <div className="place">long: {weatherData?.longitude} </div>
          </div>
          <div className="description">    
            <div className="weatherCondition">Wind</div>    
            <div className="place">Speed: {weatherData?.current_weather?.windspeed}{weatherData?.hourly_units?.windspeed_10m} </div>
          </div>
        </div>
        <div className="date">{`${date} ${time}`}</div>
        <button className="btn" onClick={saveWeatherInfo}>Save</button>
        { message && <h1>{message}</h1>}
      </section>
    </div>
    </>
  )
}

export default App
