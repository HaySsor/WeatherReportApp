import React, {useState, useEffect} from 'react';
import style from './Form.module.css';

interface WeatherReport {
  temperature: number;
  unit: string;
  city: string;
  date: string;
}
const defData: {
  temp: number;
  unit: string;
  city: string;
} = {
  temp: 0,
  unit: 'C',
  city: '',
};

function Form() {
  const [data, setData] = useState(defData);
  const [error, setError] = useState(false);
  const [errorTemp, setErrorTemp] = useState(false);
  const [report, setReport] = useState({});
  const [passFlag, setPassFlag] = useState(false);

  useEffect(() => {
    const URl = 'http://localhost:8000/api/reports';
    if (passFlag) {
      async function PostDataToServer() {
        try {
          await fetch(URl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(report),
          });
          alert('data send to server');
        } catch (err) {
          alert('Something is wrong try again');
        }
      }
      PostDataToServer();
      setData(defData);
      setPassFlag(false);
    }
  }, [report]);

  function heddleData(event: React.SyntheticEvent) {
    const {name, value} = event.target as HTMLInputElement;

    setError(false);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function SubmitData(event: React.SyntheticEvent) {
    event.preventDefault();
    if (data.temp === 0) {
      setErrorTemp(true);
      return;
    }
    setErrorTemp(false);
    if (data.city.trim().length < 3) {
      setError(true);
      return;
    }
    setError(false);
    passData();
  }

  function passData() {
    const weatherReport: WeatherReport = {
      temperature: data.temp,
      unit: data.unit,
      city: data.city,
      date: new Date().toISOString().split('T')[0],
    };
    setPassFlag(true);
    setReport(weatherReport);
  }

  return (
    <form className={style.form} onSubmit={SubmitData}>
      <h3>Add new Report</h3>
      <label>Temperature 🌡️</label>
      <input
        name='temp'
        type='number'
        value={data.temp}
        onChange={heddleData}
      />
      {errorTemp ? <p className={style.error}>Please write Temp</p> : null}
      <label>Unit 📄</label>
      <select name='unit' onChange={heddleData}>
        <option value='C'>Celsius</option>
        <option value='K'>Kelvin</option>
        <option value='F'>Farainhaid</option>
      </select>
      <label>City🏭</label>
      <input type='text' name='city' value={data.city} onChange={heddleData} />
      {error ? <p className={style.error}>Please write city</p> : null}
      <button>Sent Data</button>
    </form>
  );
}

export default Form;
