import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image component
import styles from './Nav.module.css';

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/images/Bash-Logo.png" alt="Brand Logo" width={70} height={70} />
        </Link>
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
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
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <img src="/menu-icon.svg" alt="Menu" />
      </div>
    </nav>
  );
};

export default NavBar;

