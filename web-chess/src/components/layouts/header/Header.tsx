import React from 'react';
import styles from './header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <div className={styles.container}> */}
      {/* <div className={styles.nav_container}> */}
      <div className={styles.nav_container}>
        <div className={styles.bg}></div>
        <div className={styles.menu_button} tabIndex={0}>
          <div className={styles.nav_el}>Home</div>
        </div>
        <div className={styles.menu_list} tabIndex={0}>
          <ul>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/test'>Game</a>
            </li>
            <li>
              <a href='#0'>ChessRGLK</a>
            </li>
            <li>
              <a href='/lessons'>Lessons</a>
            </li>
            <li>
              <a href='#0'>Tasks</a>
            </li>
            <li>
              <a href='#0'>News</a>
            </li>
          </ul>
        </div>
      </div>
      <h1 className={styles.header_text}>Chess AI</h1>
      <div className={styles.nav_container}>
        <div className={styles.bg}></div>

        <div className={styles.user_button} tabIndex={1}>
          <div className={styles.nav_el}>User</div>
        </div>
        <div className={styles.user} tabIndex={1}>
          <div className={styles.userBox}>
            <div>ava</div>
            <div>info</div>
            <div>updateinfo</div>
            <div>achivments</div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
