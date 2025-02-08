import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '@/modules/weather/actions/weatherActions';
import { RootState, AppDispatch } from '@/redux/store';
import { Button } from 'antd';
import '@/styles/HomePage.scss';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch(); // 使用带类型的 dispatch
  const { weather, loading, error } = useSelector(
    (state: RootState) => state.weather,
  );

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('This is a test error');
  }
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          <li>{weather?.city}</li>
          <li>{weather?.dayWeather}</li>
          <li>{weather?.dayWeatherShort}</li>
        </ul>
      )}
      <Button type="primary" onClick={handleClick}>
        Throw Error
      </Button>
    </div>
  );
};

export default HomePage;
