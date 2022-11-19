import React, {useState, useEffect} from 'react';
import style from './Weather.module.css';
import CityCard from '../components/CityCard';
import SelectionsBox from '../components/SelectionsBox';

interface WeatherReport {
  id: string;
  temperature: number;
  unit: string;
  city: string;
  date: string;
}

function Weather() {
  //fetch data
  const [weather, setWeather] = useState<WeatherReport[]>([]);
  const [dataFlag, setDataFlag] = useState<Boolean>(false);
  const [delayedData, setDelayedData] = useState<String>('');
  //handle edit
  const [editTemp, setEditTemp] = useState<string>('');

  const [editBoxID, setEditBoxID] = useState<String>('');
  const [pastEditTempFlag, setPastEditTempFlag] = useState<Boolean>(false);
  // search option
  const [search, setSearch] = useState<string>('');

  //  Fetch data and save on weather State
  useEffect(() => {
    setDataFlag(false);
    async function getData() {
      const URL = 'http://localhost:8000/api/reports';
      const res = await fetch(URL);
      const data = await res.json();
      setWeather(data);
    }

    getData();
  }, [dataFlag]);

  // fetch data to delete data form API
  useEffect(() => {
    if (delayedData == '') {
      return;
    }
    async function getData() {
      const URL = `http://localhost:8000/api/reports/${delayedData}`;
      await fetch(URL, {
        method: 'DELETE',
      });
    }
    getData();
    setDataFlag(true);
  }, [delayedData]);

  // update data to Api
  useEffect(() => {
    if (editBoxID === '') {
      return;
    }
    const x = weather.filter((item) => item.id === editBoxID);

    const finnedBox = {...x};
    finnedBox[0].temperature = parseInt(editTemp);

    async function getData() {
      const URL = `http://localhost:8000/api/reports/${editBoxID}`;
      try {
        await fetch(URL, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finnedBox[0]),
        });
      } catch (err) {
        console.log(err);
      }
    }
    getData();

    setEditBoxID((prev) => (prev = ''));
    setEditTemp((prev) => (prev = ''));
    setPastEditTempFlag((prev) => (prev = false));
  }, [pastEditTempFlag]);

  function renderData() {
    return weather.map((item) => {
      return (
        <CityCard
          key={item.id}
          item={item}
          cardDelate={cardDelate}
          editBoxID={editBoxID}
          editTemp={editTemp}
          heddleTemp={heddleTemp}
          passEditData={passEditData}
          heddleEditTemp={heddleEditTemp}
        />
      );
    });
  }

  function cardDelate(id: string) {
    setDelayedData(id);
  }
  function heddleTemp(event: React.SyntheticEvent) {
    const {value} = event.target as HTMLInputElement;

    setEditTemp((prevData) => (prevData = value));
  }

  function heddleEditTemp(id: string) {
    setEditBoxID(id);
  }

  function passEditData() {
    setPastEditTempFlag((prev) => (prev = true));
  }

  function heddleSearch(event: React.SyntheticEvent) {
    const {value} = event.target as HTMLInputElement;
    setSearch((prev) => (prev = value));
  }

  function renderSearch() {
    const searchCity = [...weather].filter((item) => {
      return item.city.toLowerCase().includes(search.toLowerCase());
    });
    return searchCity.map((item) => {
      return (
        <CityCard
          key={item.id}
          item={item}
          cardDelate={cardDelate}
          editBoxID={editBoxID}
          editTemp={editTemp}
          heddleTemp={heddleTemp}
          passEditData={passEditData}
          heddleEditTemp={heddleEditTemp}
        />
      );
    });
  }

  return (
    <div className={style.contener}>
      <SelectionsBox
        setWeather={setWeather}
        search={search}
        heddleSearch={heddleSearch}
      />
      <div className={style.cardsBox}>
        {search !== '' ? renderSearch() : renderData()}
      </div>
    </div>
  );
}

export default Weather;
