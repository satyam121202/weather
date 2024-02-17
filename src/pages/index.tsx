import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { api } from "~/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  let city = " ";
  const [weather, setWeather] = useState<any>();
  const [image, setImage] = useState<any>();
  const [climate, setClimate] = useState<any>();
  // let climate = "";
  const setCity = (e: { target: { value: any } }) => {
    // console.log(e.target.value);
    city = e.target.value;
  };
  const getWeather = () => {
    if (city) {
      axios
        .request({
          method: "POST",
          url: "http://localhost:3000/api/getWeather",
          headers: { "Content-Type": "application/json" },
          data: { city },
        })
        .then((data: any) => {
          // console.log(data);
          if (data.status === 200) {
            // console.log(data.data);
            setWeather(data.data);
            setClimate(data.data.current.condition.text);
          }
        });
    }
  };
  useEffect(() => {
    axios
      .request({
        method: "POST",
        url: "http://localhost:3000/api/getImage",
        headers: { "Content-Type": "application/json" },
        data: { climate },
      })
      .then((data: any) => {
        // console.log(data);
        if (data.status === 200) {
          // console.log(data.data.results[0].urls.full);
          setImage(data.data.results[0].urls.regular);
        }
      });
  }, [climate]);

  return (
    <>
      <div
        className="bg-[image:var(--image-url)] h-screen w-screen bg-blue-200"
        style={{ '--image-url': `url(${image})`  }}
      >
        <div>
          
        <div className="flex h-[20%] w-full items-center justify-center bg-black bg-opacity-15 backdrop-blur-md text-3xl font-extrabold ">
          Weather App
        </div>
        <div className="m-5 flex justify-between gap-5  ">
          <div className="h-full w-full flex-row ">
            <div className="mb-5 flex h-full w-full justify-center">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City Name"
                className="rounded-lg px-5 py-1 bg-black bg-opacity-10 backdrop-blur-md"
                onChange={setCity}
              />
              {/* <label className="ml-12"> Enter City</label> */}
            </div>
            <div className="flex h-full w-full justify-center">
              <button
                className="rounded-md bg-green-600 px-3 py-1 font-semibold text-white"
                onClick={getWeather}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="h-full w-full flex-row ">
            {weather && (
              <>
                <div className="p-5 flex items-end justify-center gap-4 bg-black bg-opacity-25 backdrop-blur-md">
                  <div className="text-3xl">{weather.location.name}</div>
                  <div className="text-xl">{weather.location.region}</div>
                  <div className="text-md">{weather.location.country}</div>
                </div>
                <div className="p-5 flex items-end justify-center gap-4 bg-black bg-opacity-25 backdrop-blur-md ">
                  <div>Feels like</div>
                  <div className="text-5xl text-gray-900">
                    {weather.current.feelslike_c} C /{" "}
                    {weather.current.feelslike_f} F
                  </div>
                </div>
                <div className="p-5 flex items-end justify-start gap-4 bg-black bg-opacity-25 backdrop-blur-md">
                  <img src="/windsvg.svg" alt="" className="h-6 w-6" />
                  <div className="text-xl text-gray-900">
                    {weather.current.wind_dir} at {weather.current.wind_kph}{" "}
                    kmph
                  </div>
                </div>
                <div className="p-5 flex items-end gap-4 bg-black bg-opacity-25 backdrop-blur-md">
                  <img src="/humid.png" alt="" className="h-6 w-6" />
                  <div className="text-xl text-gray-900">
                    {weather.current.feelslike_c} C /{" "}
                    {weather.current.feelslike_f} F
                  </div>
                </div>
                {/* <img src={image} alt="" className="h-48" /> */}
              </>
            )}
          </div>
        </div>
        
        </div>
      </div>
    </>
  );
}
