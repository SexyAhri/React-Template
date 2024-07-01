import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../modules/weather/actions/weatherActions";
const HomePage = () => {
  const dispatch: any = useDispatch();
  const { weather, loading, error } = useSelector(
    (state: any) => state.weather
  );
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          <li>{weather[0]}</li>
        </ul>
      )}
    </div>
  );
};

export default HomePage;
