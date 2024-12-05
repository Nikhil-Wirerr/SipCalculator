"use client"; 

import Link from "next/link";
import styles from './headerNav.module.css'

export default function HeaderNav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">Sernet Calculator</Link>
        </div>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* <li>
            <Link href="/Pages/homepage/calculatorpage">Calculator</Link>
          </li>
          <li>
            <Link href="/Pages/homepage/sipcalculatorpage">SIP Calculator</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
