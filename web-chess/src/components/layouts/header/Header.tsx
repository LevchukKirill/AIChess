import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <div className={styles.container}> */}
      <nav id='container'>
        <ul>
          <a href=''>
            <li className={styles.nav_li}>Home</li>
          </a>
        </ul>
      </nav>
      <h1 className={styles.header_text}>Chess AI</h1>
      <nav className={styles.nav}>
        <ul>
          <a href=''>
            <li className={styles.nav_li}>User</li>
          </a>
        </ul>
      </nav>
      {/* </div> */}
    </header>
  );
};

export default Header;
