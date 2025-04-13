import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>Gradient</h1>
        <nav>
          <Link legacyBehavior href="/">
            <a className={styles.navLink}>Home</a>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}