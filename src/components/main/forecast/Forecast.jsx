import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { PiMapPinFill } from 'react-icons/pi';
import { FiWind } from 'react-icons/fi';
import { ImDroplet } from 'react-icons/im';
import GridLoader from 'react-spinners/GridLoader';

function Forecast() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  async function handleSearch(city, e) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `https://t6k90g1hi7.execute-api.us-east-1.amazonaws.com/dev/searchcityweather?city=${city}`;

      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Invalid search');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let update_result = {}
          update_result.city = city
          update_result.temp = data.main.temp
          update_result.temp_max = data.main.temp_max
          update_result.temp_min = data.main.temp_min
          update_result.status = data.weather[0].description
          update_result.humidity = data.main.humidity
          update_result.wind = data.wind.speed
          update_result.icon = data.weather[0].icon
          setResult(update_result);
          console.log(result);
        });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
    setLoading(false);
  }

  return (
    <section className="container d-flex flex-column align-items-center">
      <article className="w-100 p-4 bg-primary rounded-top search_container">
        <form className="w-100 d-flex flex-column gap-3">
          <label htmlFor="city" className="fs-5 text-light">
            Busque por uma cidade:
          </label>
          <div className="w-100 d-flex justify-content-between gap-3">
            <input
              type="text"
              name="city"
              id="city"
              className="rounded-3 p-2 border-0"
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="rounded-3 bg-info p-2 border-0 hover-zoom"
              onClick={(e) => handleSearch(city, e)}
            >
              <IoMdSearch />
            </button>
          </div>
        </form>
      </article>
      <hr className="my-0" />
      <article className="w-100 d-flex flex-column gap-2 align-items-center p-4 bg-primary rounded-bottom result_container text-light">
        {success ? (
          <>
            {loading ? (
              <GridLoader
                color="white"
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <PiMapPinFill className="fs-4" />
                  <p className="fs-4 m-0 D">{result.city}</p>
                </div>
                <p className="display-3 text-center fw-bold m-0">
                  {result.temp} °C
                </p>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <p className="fw-light fs-5 m-0 text-capitalize">Max: {result.temp_max}°C</p>
                  <p className="fw-light fs-5 m-0 text-capitalize">Min: {result.temp_min}°C</p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="fs-5 m-0 text-capitalize">{result.status}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${result.icon}@2x.png`}
                    alt={result.status}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="fw-light border-end px-3 fs-5 m-0">
                    <ImDroplet /> {result.humidity}%
                  </p>
                  <p className="fw-light px-3 fs-5 m-0">
                    <FiWind /> {result.wind} Km/h
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <i>
            Busque pelo nome da cidade para ver as condições climáticas em tempo
            real
          </i>
        )}
      </article>
    </section>
  );
}

export default Forecast;
