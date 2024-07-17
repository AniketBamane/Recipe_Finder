import React, { useState } from 'react';
import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
      <Link to={"/"}>  <div className={styles.navbarLogo}>Good Food 😊</div></Link>
        <div className={styles.navbarMenu}>
          <div className={styles.navbarItem}><Link to="/favourites">Favorites</Link></div>
          <div className={styles.navbarItem}><Link to="/logout">Logout</Link></div>
        </div>
        <div className={styles.menuIcon} onClick={toggleDrawer}>
          ☰
        </div>
      </nav>
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.cancelItem} onClick={()=>{
          setDrawerOpen(false);
        }}>x</div>
        <div className={styles.drawerItem}><Link to="/favourites">Favorites</Link></div>
        <div className={styles.drawerItem}><Link to="/logout">Logout</Link></div>
      </div>
    </>
  );
};

export default Navbar;
