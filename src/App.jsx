import React, { useEffect, useState } from "react";
import Temperature from "./components/Temperature";
import Highlights from "./components/Highlights";
function App() {

  const [city, setCity] = useState("Jhansi");
  const [weatherData, setWeatherData] = useState(null);

  //whenever  city name changes it will run api call again for new city
  useEffect(() => {

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=4b54839f1acd4d5ca7d142627240504&q=${city}&aqi=no`;

    //in fetch we use two then condition and one catch condition
    fetch(apiUrl)
      .then((res) => {
          if (!res.ok) {
            throw new Error("Unable to reterive data");
          }
          return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (

    <div className="bg-rose-500 h-screen flex justify-center  items-start">

      <div className="w-1/5 h-1/3 mt-40">

        {weatherData && (
          <Temperature

            setCity={setCity}

            stats={{
              //see in object that is printed in console
               temp: weatherData.current.temp_c,
               condition: weatherData.current.condition.text,
               isDay: weatherData.current.is_day,
               location: weatherData.location.name,
               time: weatherData.location.localtime,
            }}
          />
        )}

            {/* for Highlights */}
      </div>

      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">

        <h1 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights
        </h1>

        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;