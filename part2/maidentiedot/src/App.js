import React, { useState, useEffect } from 'react'
import axios from 'axios'


const DisplaySingle = (props) => {
  const country = props.country
  const weather = props.weather
  if (weather == null) {
    return <p>Cannot read weather</p>
  }
  return (
      <div>
        <h3>{country.name}</h3>
        <p>
          Capital: {country.capital}
        </p>
        <p>
          Population: {country.population}
        </p>
        <h4>Languages</h4>
        {country.languages.map(lang => <p key={lang.name}>{lang.name}</p>)}
        <img src={country.flag} 
          alt={"Flag of " + country.name}
          style={{maxWidth: "300px"}}
          />

        <h3>Weather in {country.capital}</h3>
        <p><b>Temperature: </b>{weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} alt="Weather icon" />
        <p><b>Wind: </b>{weather.current.wind_speed} MPH, direction {weather.current.wind_dir}</p>
      </div>
    )

}

const Display = (props) => {
  if (props.shownCountries.length === 0) {
    return <p>No countries found</p>
  } else if ( props.shownCountries.length > 10) {
    return <p>Too many countries found</p>
  } else if (props.shownCountries.length <= 10 && props.shownCountries.length > 1) {
    return (
      <div>
        {props.shownCountries.map(country => <p key={country.name}>{country.name}  
        <button onClick={props.buttonHandler} value={country.name}>Show</button></p>)}
      </div>
    )
  } else {
    return <DisplaySingle country={props.shownCountries[0]} weather={props.weather} />
  }
}

const FilterField = (props) => {
  return (
    <input onChange={props.onChange}/>
    
  )
}

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
        setShownCountries(response.data)
      })

  }, [])

  useEffect(() => {
    if (shownCountries.length === 1) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${shownCountries[0].capital}`)
        .then(response => {
            setWeather(response.data)
        })
    }
   
  }, [shownCountries])

  const buttonHandler = (event) => {
    const name = event.target.value
    const newShownCountries = countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    setShownCountries(newShownCountries)
  }


  const handleFilterChange = (event) => {
    const name = event.target.value.toLowerCase()
    if (name === '') {
      setShownCountries(countries)
      return
    }
    const newShownCountries = countries
                               .filter(country => 
                                country.name.toLowerCase().includes(name))
    setShownCountries(newShownCountries)

  }


  return (
    <div>
      <h2>Maiden tiedot</h2>
    <p>
      <FilterField onChange={handleFilterChange} />
    </p>
      <Display countries={countries} shownCountries={shownCountries} buttonHandler={buttonHandler} 
      weather={weather}/>
    </div>

  )

}

export default App