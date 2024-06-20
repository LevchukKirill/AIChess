import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header} tabIndex={0}>
      {/* <div className={styles.container}> */}
      {/* <div className={styles.nav_container}> */}
      <div id={styles.nav_container}>
        <div className={styles.bg}></div>
        <div className={styles.button} tabIndex={0}>
          <div className={styles.nav_el}>Home</div>
        </div>
        <div id={styles.menu_list} tabIndex={0}>
          <ul>
            <li>
              <a href='#0'>Home</a>
            </li>
            <li>
              <a href='#0'>Services</a>
            </li>
            <li>
              <a href='#0'>Blog</a>
            </li>
            <li>
              <a href='#0'>About</a>
            </li>
            <li>
              <a href='#0'>Contact</a>
            </li>
            <li>
              <a href='#0'>Facebook</a>
              <a href='#0'>Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <h1 className={styles.header_text}>Chess AI</h1>
      <div className={styles.container_right}>
        <div className={styles.button}>
          <div className={styles.nav_el}>User</div>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
