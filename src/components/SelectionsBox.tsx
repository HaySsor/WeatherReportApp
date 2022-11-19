import React from 'react';
import Search from './Search';
import style from './SelectionsBos.module.css';

export default function SelectionsBox({setWeather, search, heddleSearch}) {
  function heddleSelectedTemp(e: React.SyntheticEvent) {
    const {value} = e.target as HTMLInputElement;
    if (value === '0') {
      setWeather((prev) => {
        return [...prev].sort((a, b) => a.temperature - b.temperature);
      });
    } else if (value === '1') {
      setWeather((prev) => {
        return [...prev].sort((a, b) => b.temperature - a.temperature);
      });
    }
  }
  function heddleSelectedCity(e: React.SyntheticEvent) {
    const {value} = e.target as HTMLInputElement;
    if (value === '0') {
      setWeather((prev) => {
        return [...prev].sort((a, b) => {
          if (a.city > b.city) {
            return 1;
          } else if (a.city < b.city) {
            return -1;
          }
          return 0;
        });
      });
    } else if (value == '1') {
      setWeather((prev) => {
        return [...prev].sort((a, b) => {
          if (b.city > a.city) {
            return 1;
          } else if (b.city < a.city) {
            return -1;
          }
          return 0;
        });
      });
    }
  }
  function heddleSelectedData(e: React.SyntheticEvent) {
    const {value} = e.target as HTMLInputElement;
    if (value == '0') {
      setWeather((prev) => {
        return [...prev].sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          }
          return 0;
        });
      });
    } else if (value == '1') {
      setWeather((prev) => {
        return [...prev].sort((a, b) => {
          if (b.date > a.date) {
            return 1;
          } else if (b.date < a.date) {
            return -1;
          }
          return 0;
        });
      });
    }
  }
  return (
    <div className={style.selectionsBox}>
      <div className={style.select}>
        <label>Temp </label>
        <select onChange={heddleSelectedTemp}>
          <option value='0'>descending</option>
          <option value='1'>ascending</option>
        </select>
      </div>
      <div className={style.select}>
        <label>City </label>
        <select onChange={heddleSelectedCity}>
          <option value='0'>A-Z</option>
          <option value='1'>Z-A</option>
        </select>
      </div>
      <div className={style.select}>
        <label>Data </label>
        <select onChange={heddleSelectedData}>
          <option value='0'>descending</option>
          <option value='1'>ascending</option>
        </select>
      </div>
      <Search search={search} heddleSearch={heddleSearch} />
    </div>
  );
}
