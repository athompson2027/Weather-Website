"use client"
import react, { useState, useEffect } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { borderColor, color, margin, padding } from '@mui/system';

import './globals.css';
import { fetchWeatherApi } from 'openmeteo';


export default function Home() {

  const [dark, setDark] = useState(true);
  const [currentSelected, setCurrentSelected] = useState(false);
  const [hourlySelected, setHourlySelected] = useState(false);
  const [dailySelected, setDailySelected] = useState(false);
  const [imperialSelected, setImperialSelected] = useState(false);
  const [metricSelected, setMetricSelected] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [valid, setValid]= useState(false);
  const [update, setUpdate] = useState(false);


  const [timeUnit, setTimeUnit] = useState(0);
  const [weatherData, setWeatherData] = useState([]);
  const [current, setCurrent] = useState(false);
  const [curWindDir, setCurWindDir] = useState([]); 


  const [hourly, setHourly] = useState(false);
  const [hourlyTemp, setHourlyTemp] = useState([]);

  const [hourlyWindSpeed10, setHourlyWindSpeed10] = useState([]);
  const [hourlyWindDirection10, setHourlyWindDirection10] = useState([]);
  

  const [hourlyHumidity, setHourlyHumidity] = useState([]);
  const [hourlyPrecipProb, setHourlyPrecipProb] = useState([]);
  const [hourlyPrecip, setHourlyPrecip] = useState([]);




  const [daily, setDaily] = useState(false);
  const [UV, setUV] = useState([]);
  const [dailyTempMax, setDailyTempMax] = useState([]);
  const [dailyTempMin, setDailyTempMin] = useState([]);
  const [dailyWindSpeed, setDailyWindSpeed] = useState([]);
  const [dailyWindDirection, setDailyWindDirection] = useState([]);

  const [dailyPrecipHrs, setDailyPrecipHrs] = useState([]);
  const [dailyRainSum, setDailyRainSum] = useState([]);
  const [dailyShowerSum, setDailyShowerSum] = useState([]);
  const [dailySnowSum, setDailySnowSum] = useState([]);
  const [dailyPrecipSum, setDailyPrecipSum] = useState([]);
  const [dailyPrecipProb, setDailyPrecipProb] = useState([]);

  const [dailyHumidity, setDailyHumidity] = useState([]);

  
  const [tempUnit, setTempUnit] = useState("fahrenheit");
  const [windSpeedUnit, setWindSpeedUnit] = useState("mph");
  const [percipitaton, setPercipitation] = useState("inch");

  const [imperial, setImperial] = useState(true);
  const [metric, setMetric] = useState(false);


  const light_mode = {
    color: 'black',
    backgroundColor: 'white',
  }

  const dark_mode = {
    color: 'white',
    backgroundColor: 'black',
  }

  const selected = {
    backgroundColor: '#60a5fa',
  }


  

  

  useEffect(()=>{
    let url = "https://api.open-meteo.com/v1/forecast";
    axios.get(url, {
      params:{
        "latitude": lat,
        "longitude": lon,
        "daily": ["uv_index_max", "temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "wind_direction_10m_dominant", "precipitation_hours", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_sum", "precipitation_probability_mean", "relative_humidity_2m_mean"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "wind_speed_10m", "wind_speed_120m", "wind_speed_80m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_direction_180m"],
        "current": ["temperature_2m", "precipitation", "relative_humidity_2m", "wind_speed_10m", "wind_direction_10m", "is_day"],
        "past_days": 7,
        "wind_speed_unit": windSpeedUnit,
        "temperature_unit": tempUnit,
        "percipitation_unit": percipitaton,
        "timezone": "auto",



      }
    })
    .then(response =>{
      console.log(response.data);
      setWeatherData(response.data);

      setCurWindDir(response.data["current"]["wind_direction_10m"]);



      setHourlyTemp(response.data["hourly"]["temperature_2m"]);

      setHourlyWindSpeed10(response.data["hourly"]["wind_speed_10m"]);
      setHourlyWindDirection10(response.data["hourly"]["wind_direction_10m"]);
      

      setHourlyHumidity(response.data["hourly"]["relative_humidity_2m"]);
      
      setHourlyPrecipProb(response.data["hourly"]["precipitation_probability"]);
      setHourlyPrecip(response.data["hourly"]["precipitation"]);

      setUV(response.data["daily"]["uv_index_max"]);

      setDailyTempMax(response.data["daily"]["temperature_2m_max"]);
      setDailyTempMin(response.data["daily"]["temperature_2m_min"]);

      setDailyWindSpeed(response.data["daily"]["wind_speed_10m_max"]);
      setDailyWindDirection(response.data["daily"]["wind_direction_10m_dominant"]);

      setDailyPrecipHrs(response.data["daily"]["precipitation_hours"]);
      setDailyRainSum(response.data["daily"]["rain_sum"]);
      setDailyShowerSum(response.data["daily"]["showers_sum"]);
      setDailySnowSum(response.data["daily"]["snowfall_sum"]);
      setDailyPrecipSum(response.data["daily"]["precipitation_sum"]);
      setDailyPrecipProb(response.data["daily"]["precipitation_probability_mean"]);

      setDailyHumidity(response.data["daily"]["relative_humidity_2m_mean"]);
      


      
    })
    .catch(error =>{
      console.log("Something broke");
    })
    
  }, [update ]);

  
  
  function handleeDark(){
    setDark(!dark);
    console.log(weatherData);
  }


  function handleCurrent(){
    setCurrent(true);
    setHourly(false);
    setDaily(false);
    setCurrentSelected(true);
    setHourlySelected(false);
    setDailySelected(false);

  }
  function handleHourly(){
    setHourly(true);
    setCurrent(false);
    setDaily(false);
    setHourlySelected(true);
    setCurrentSelected(false);
    setDailySelected(false);


  }
  function handleDaily(){
    setDaily(true);
    setHourly(false);
    setCurrent(false);
    setDailySelected(true);
    setCurrentSelected(false);
    setHourlySelected(false);


  }


  
  function handleImperial(){
    setImperial(true);
    setMetric(false);
    setImperialSelected(true);
    setMetricSelected(false);



    setUpdate(!update);
    setTempUnit("fahrenheit");
    setWindSpeedUnit("mph");
    setPercipitation("inch");
   
  }

  function handleMetric(){
    setMetric(true);
    setImperial(false);
    setMetricSelected(true);
    setImperialSelected(false);



    setUpdate(!update);
    setTempUnit("celsius");
    setWindSpeedUnit("kmh");
    setPercipitation("mm");


  }

  const handleChangeLat = (e) => {
    setLat(e.target.value);
  };

  const handleChangeLon = (e) => {
    setLon(e.target.value);
  };

  const works = () => {
    if ((!isNaN(lat) && (lat <= 90 && lat >= -90)) && (!isNaN(lon) && (lon <= 180 && lat >= -180))) {
      setValid(true);
      setUpdate(!update);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  



  const dl_mode = dark ? dark_mode : light_mode;

  const dir = (curWindDir == 0) ? "East" : (curWindDir == 90)  ? "North" : (curWindDir == 180)  ? "West" :  (curWindDir == 270)  ? "South" : (curWindDir > 0 && curWindDir <90)  ? "Northeast" : (curWindDir <180)  ? "Northwest" :  (curWindDir <270)  ? "Southwest" : "Southeast";

   




  return (
    <body style={dl_mode} className='base min-h-screen transition-colors duration-500'>
      { dark ?
          <button onClick={handleeDark} className='left'>Light Mode</button>
        :
          <button onClick={handleeDark} className='left'>Dark Mode</button>
      }

      <div className='spacing flex justify-between items-center border-b border-gray-400 '>
        <div>
          <h1 className='underborder'>Weather App</h1>
          
        </div>
        <div className='box'>
          { valid == true
            ?
            <p>Choose Time Range: <button onClick={handleCurrent}>Current</button>, <button onClick={handleHourly}>Hourly</button>, or <button onClick={handleDaily}>Daily</button></p>
            :
            <h2>Input Valid Lat and Long</h2>
            // <p>Choose Time Range: <button>Current</button>, <button>Hourly</button>, or <button>Daily</button></p>
          }
          <p>Choose Units: <button onClick={handleImperial}>Imperial</button> or <button onClick={handleMetric}>Metric</button></p>
        </div>
        <div className='box'>
          <form onSubmit={handleSubmit}>
            <label>Input Latitude:&nbsp;
              <input type='number' value={lat} onChange={handleChangeLat} step='0.0001'></input>
            </label> 
            <br></br>
            <label>Input Longitude:&nbsp;
              <input type='number' value={lon} onChange={handleChangeLon} step='0.0001'></input>
            </label>
            <button type='submit' onClick={works}>Submit</button>
          </form>
        </div>
      </div>


      

      <div className='bg-white/5 box padding_top middle'>
        <h2 className='underborder small_spacing'>Temperature</h2>
        {
          current ?
              imperial ?
                <p className='tabulation'>Current Temperature: {weatherData["current"]["temperature_2m"]} F°</p>
              :
                <p className='tabulation'>Current Temperature: {weatherData["current"]["temperature_2m"]} C°</p>
            
          : 
            <p></p>
        }
        
        {
          hourly ?
            imperial ?
              <div >
                <ul>
                  {hourlyTemp.slice(hourlyTemp.length/2, hourlyTemp.length/2+24).map( (hour, index, ) => (
                    <li key={(hour.id)} className='tabulation'>
                      Temperature for {index}:00 Hour: {hour} F°
                    </li>                    
                  ))} 
                </ul>
              </div>
            :
              <div>
                <ul>
                  {hourlyTemp.slice(hourlyTemp.length/2, hourlyTemp.length/2+24).map( (hour, index, ) => (
                    <li key={(hour.id)} className='tabulation'>
                      Temperature for {index}:00 Hour: {hour} C°
                    </li>
                  ))} 
                </ul>
              </div>
          : 
          <></>

          } 
          
          {
            daily ?
              imperial ?
                <>
                  <ul>

                    {dailyTempMin.slice(dailyTempMin.length/2, dailyTempMin.length).map((min, index)  => (
                        <li key={(min.id)} className='tabulation'>
                          Minimum: {min} F°<br />
                          Maximum: {dailyTempMax[index]} F° 
                        </li>
                    ))}
                  </ul>
                </>
              :
                <>
                  <ul>

                    {dailyTempMin.slice(dailyTempMin.length/2, dailyTempMin.length).map((min, index)  => (
                        <li key={(min.id)} className='tabulation'>
                          Minimum: {min} C°<br />
                          Maximum: {dailyTempMax[index]} C° 
                        </li>
                    ))}
                  </ul>
                </>
          : 
            <></>
          }
        

      </div>


      <div className='bg-white/5 box padding_top'>
        <h2 className='underborder small_spacing'>Humidity</h2>

      {
        current ?
          <p className='tabulation'>Current Humidity: {weatherData["current"]["relative_humidity_2m"]}%</p>
        : 
          <p></p>
      }
        
      {
        hourly ?
          <div>
            <ul>
              {hourlyHumidity.slice(hourlyHumidity.length/2, hourlyHumidity.length/2+24).map( (humid, index) =>(
                <li key={(humid.id)} className='tabulation'> 
                  Humidity for {index}:00 Hour : {humid}%
                </li>
                ))
              }
            </ul>
          </div>
        : 
          <></>
        } 
        
        {
          daily ?
            <ul>  
              {dailyHumidity.map( (humid) => (
                <li key = {(humid.id)} className='tabulation'>
                  Daily Humidity : {humid}%
                </li>
              ))}
            </ul>
          : 
            <></>
        }      
        
        </div>



      <div className='bg-white/5 box padding_top'>
        <h2 className='underborder small_spacing'>Precipitation</h2>
      {
        current ?
          imperial ?
            <p className='tabulation'> Current Precipitation: {weatherData["current"]["precipitation"]} in</p>
          :
            <p className='tabulation'> Current Precipitation: {weatherData["current"]["precipitation"]} mm</p>

        : 
          <p></p>
      }
        
      {
        hourly ?
          <div>
            <ul>
              {hourlyPrecipProb.slice(hourlyPrecipProb.length/2,hourlyPrecipProb.length/2+24).map( (preciprob, index) =>(
                <li key={(preciprob.id)} className='tabulation'>
                  Hourly Precipitation Probability: {preciprob}%
                  { preciprob !== 0 ? 
                      imperial?
                        <div>
                          <ul>
                            {hourlyPrecip.slice(preciprob,preciprob+1).map( (precip) => (
                              <li key={(preciprob.id)}>
                                Precipitation for {index}:00 Hour : {precip} in
                              </li>
                            ))}
                          </ul>
                        </div>
                      :
                        <div>
                          <ul>
                            {hourlyPrecip.slice(preciprob,preciprob+1).map( (precip) => (
                              <li key={(preciprob.id)}>
                                Precipitation for {index}:00 Hour: {precip} mm
                              </li>
                            ))}
                          </ul>
                        </div>
                  :
                    <></>
                }
                </li>
              ))}

            </ul>
          </div>
        : 
          <></>
        } 
        
        {
          daily ?
            <div>
            <ul>
              {dailyPrecipProb.slice(dailyPrecipProb.length/2,dailyPrecipProb.length).map( (preciprob) =>(
                <li key={(preciprob.id)} className='tabulation'>
                  Daily Precipitation Probability: {preciprob}%
                  { preciprob !== 0 ? 
                      imperial ?
                        <>
                        <div>
                          <ul>
                            {dailyPrecipSum.slice(preciprob, preciprob+1).map((precip) => (
                              <li key={(preciprob.id)}>
                                Daily Total Precipitation: {precip} in
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                            {dailyRainSum !== 0 ?
                              <div>
                                <ul>
                                  {dailyRainSum.slice(preciprob, preciprob+1).map((rain) => (
                                    rain !== 0 ? 
                                      (
                                      <li key={(preciprob.id)}>
                                        Daily Total Rain: {rain} in
                                      </li>
                                      )
                                      :
                                      (
                                      <></>
                                      )
                                    
                                  ))}
                                </ul>
                              </div>
                              :
                              <></>
                            }

                            {dailyShowerSum !== 0 ?
                              <div>
                                <ul>
                                  {dailyShowerSum.slice(preciprob, preciprob+1).map((shower) => (
                                    shower !== 0 ? 
                                      (
                                      <li key={(preciprob.id)}>
                                        Daily Total Showers: {shower} in
                                      </li>
                                      )
                                      :
                                      (
                                      <></>
                                      )
                                    
                                  ))}
                                </ul>
                              </div>
                              :
                              <></>
                            }

                            {dailySnowSum !== 0 ?
                              <div>
                                <ul>
                                  {dailySnowSum.slice(preciprob, preciprob+1).map((snow) => (
                                    snow !== 0 ? 
                                      (
                                      <li key={(preciprob.id)}>
                                        Daily Total Snow: {snow} in
                                      </li>
                                      )
                                      :
                                      (
                                      <></>
                                      )
                                    
                                  ))}
                                </ul>
                              </div>
                              :
                              <></>
                            }

                          </div>

                          </>
                          :
                            <>
                              <div>
                                <ul>
                                  {dailyPrecipSum.slice(preciprob, preciprob+1).map((precip) => (
                                    <li key={(preciprob.id)}>
                                      Daily Total Precipitation: {precip} mm
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                  {dailyRainSum !== 0 ?
                                    <div>
                                      <ul>
                                        {dailyRainSum.slice(preciprob, preciprob+1).map((rain) => (
                                          rain !== 0 ? 
                                            (
                                            <li key={(preciprob.id)}>
                                              Daily Total Rain: {rain} mm
                                            </li>
                                            )
                                            :
                                            (
                                            <></>
                                            )
                                          
                                        ))}
                                      </ul>
                                    </div>
                                    :
                                    <></>
                                  }

                                  {dailyShowerSum !== 0 ?
                                    <div>
                                      <ul>
                                        {dailyShowerSum.slice(preciprob, preciprob+1).map((shower) => (
                                          shower !== 0 ? 
                                            (
                                            <li key={(preciprob.id)}>
                                              Daily Total Showers: {shower} mm
                                            </li>
                                            )
                                            :
                                            (
                                            <></>
                                            )
                                          
                                        ))}
                                      </ul>
                                    </div>
                                    :
                                    <></>
                                  }

                                  {dailySnowSum !== 0 ?
                                    <div>
                                      <ul>
                                        {dailySnowSum.slice(preciprob, preciprob+1).map((snow) => (
                                          snow !== 0 ? 
                                            (
                                            <li key={(preciprob.id)}>
                                              Daily Total Snow: {snow} mm
                                            </li>
                                            )
                                            :
                                            (
                                            <></>
                                            )
                                          
                                        ))}
                                      </ul>
                                    </div>
                                    :
                                    <></>
                                  }

                                </div>

                                </>

                     :
                      <br/>
                    }
                    
                    
                 
                
                </li>
              ))}

            </ul>
          </div>
          : 
            <></>
        }      </div>

      
      
      <div className='bg-white/5 box padding_top'> 
        <h2 className='underborder small_spacing'>Wind</h2>
      {
        current ?
          imperial ?
            <p className='tabulation'>Current Wind Speed: {weatherData["current"]["wind_speed_10m"]} mph at {curWindDir}° {dir}</p>
          :
            <p className='tabulation'>Current Wind Speed: {weatherData["current"]["wind_speed_10m"]} km/h at {curWindDir}° {dir}</p>

        : 
          <p></p>
      }
        
      {
        hourly ?
          imperial ?
            <div>
              <ul>
                {hourlyWindSpeed10.slice(hourlyWindSpeed10.length/2, hourlyWindSpeed10.length/2+24).map( (speed, index) => (
                  <li key={(speed.id)} className='tabulation'>
                    Speed for {index}:00 : {speed} mph
                  </li>
                )
                )}
              </ul>
            </div>
          :
          <div>
            <ul>
              {hourlyWindSpeed10.slice(hourlyWindSpeed10.length/2, hourlyWindSpeed10.length/2+24).map( (speed, index) => (
                <li key={(speed.id)} className='tabulation'>
                  Speed for {index}:00 : {speed} km/h
                </li>
              )
              )}
            </ul>
          </div>
        : 
          <></>
        } 
        
        {
          daily ?
            imperial ?
              <ul>  
                {dailyWindSpeed.slice(dailyWindSpeed.length/2).map( (speed) => (
                  <li key={(speed.id)} className='tabulation'>
                    Speed: {speed} mph
                  </li>
                )
                )}
              </ul>
            :
              <ul>  
                {dailyWindSpeed.slice(dailyWindSpeed.length/2).map( (speed) => (
                  <li key={(speed.id)} className='tabulation'>
                    Speed: {speed} km/h
                  </li>
                )
                )}
              </ul>
          : 
            <></>
        }
              </div>



      <div className='bg-white/5 box padding_top'>
        
        
        {
          daily ?
            <ul>  
              <h2 className='underborder small_spacing'>UV Index</h2>
              
              {UV.slice(UV.length/2, UV.length).map( (uv, index) => {
                return <li key={uv.id} className='tabulation'> UV Index for Day {index}: {uv}</li>;
              })}

              
              
              
            </ul>
          : 
            <></>
        }      
        </div>
      

    </body>
  );
}

