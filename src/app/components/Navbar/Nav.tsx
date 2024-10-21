import React from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';
import Image from 'next/image'

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.logo}>
        <Link href="/">
          <p>BrandLogo</p>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/about">
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <p>Contact</p>
          </Link>
        </li>
        <li>
          <Link href="/order">
            <p>Order</p>
          </Link>
        </li>
      </ul>
      <div className={styles.menuIcon}>
        {/* <img src="/menu-icon.svg" alt="Menu" /> */}
        <Image src={`/Bash-Logo.png`} alt="Menu" width="64" height="64" />
      </div>
    </nav>
  );
};

export default NavBar;
