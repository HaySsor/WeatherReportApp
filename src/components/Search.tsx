import React from 'react';
import style from './Search.module.css'

export default function Search({search, heddleSearch}) {
  return (
    <div className={style.search}>
      <label>🔎</label>
      <input type='text' value={search} onInput={heddleSearch} />
    </div>
  );
}
