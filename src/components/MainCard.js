
import React, { useState } from 'react';
import './mainCardStyle.css';
import Clear from './images/clear.png';
import Clouds from './images/clouds.png';
import Drizzle from './images/drizzle.png';
import Humidity from './images/humidity.png';
import Haze from './images/humidity.png';
import Mist from './images/mist.png';
import Rain from './images/rain.png';
import Search from './images/search.png';
import Snow from './images/snow.png';
import Wind from './images/wind.png';
import search from './images/search.jpg';
import cnf from './images/cnf.png';

import rainv from './assets/rainv.mp4';
import clearv from './assets/clearv.mp4';
import cloudsv from './assets/cloudsv.mp4';
import drizzlev from './assets/drizzlev.mp4';
import humidityv from './assets/humidityv.mp4';
import mistv from './assets/mistv.mp4';
import snowv from './assets/snowv.mp4';
import windv from './assets/windv.mp4';
import hazev from './assets/hazev.mp4';

export default function MainCard() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [flag, setFlag] = useState(false);

    const api = {
        key: "8391b2d91857ae37c0ce48a1634ae29f",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()]
        let date = d.getDate();
        let month = months[d.getMonth()]
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`

    }

    const searchy = () => {
        if (query !== null) {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setFlag(true);
                    setQuery('');
                    console.log(result)
                })
        }

    }

    const arr = [Clear, Clouds, Drizzle, Humidity, Mist, Rain, Search, Snow, Wind, Haze]
    const arrs = ["Clear", "Clouds", "Drizzle", "Humidity", "Mist", "Rain", "Search", "Snow", "Wind", "Haze"]
    const arrv = [clearv, cloudsv, drizzlev, humidityv, mistv, rainv, "search", snowv, windv, hazev]

    return (
        <>

            {/* {typeof weather.main !== 'undefined' ? <video src={arrv[arrs.indexOf(weather.weather[0].main) - 1]} autoPlay loop muted /> : ('')} */}
            {typeof weather.main !== 'undefined' ? <video src={arrv[arrs.indexOf(weather.weather[0].main)]} autoPlay loop muted /> : ('')}

            <div className="maincontain">
                <input type="text" className='inpy comm' onChange={e => setQuery(e.target.value)} vale={query} placeholder='Search...' />
                <img className="spec" onClick={searchy} src={search} alt="search"></img>
            </div>

            {typeof weather.main !== 'undefined' ? (
                <div className="maincontain">
                    <div className="container">
                        <div className="contain">

                            <h2 className='country'>{flag ? weather.name + ',' + weather.sys.country : null}</h2>
                            {/* <h1 className='image' ><img src={`http://openweathermap.org/img/w/${'50n'}.png`} alt="IconImage" className='icon' /></h1> */}
                            <h1 className='image' ><img src={arr[arrs.indexOf(weather.weather[0].main)]} alt="IconImage" className='icon' /></h1>
                            {/* <h2 className='degree comm'>{flag ? weather.main.temp + '°C' : null}<h8 className='sun'>{flag ? weather.weather[0].main : null}</h8></h2> */}
                            {/* EXTRA */}
                            <h2 className='degree comm'>
                                {flag ? weather.main.temp + '°C' : null}
                                <h4 className='sun'>{flag ? weather.weather[0].main : null}</h4>
                                <img src={Humidity} className='eximg' alt="humid" />
                                <h2 className='ex'>humidity : {weather.main.humidity}</h2>
                                <img src={Wind} className='eximg' alt="wind" />
                                <h2 className='ex'>wind speed : {weather.wind.speed}</h2>

                            </h2>
                            {/* EXTRA */}
                            <h2 className='day'>{dateBuilder(new Date())}</h2>

                        </div>
                    </div>
                </div >) : (
                <div>
                    <img src={cnf} className='cnfy' alt="cnf" />
                    <h3 className='cnfyT'>City not Found</h3>
                </div>
            )
            }

        </>
    )
}

// For Contain ->    linear-gradient(134deg, rgb(0 0 0 / 32%), rgba(255, 255, 255, 0))
// For Small ->    linear-gradient(134deg, rgb(255 255 255 / 0%), rgba(255, 255, 255, 0))