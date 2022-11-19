import React from 'react';
import {Link} from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <Link className={style.link} to={`/`}>Add new report</Link>
        </li>
        <li>
          <Link className={style.link} to={`/weather`}>See all reports</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
