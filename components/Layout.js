import Link from 'next/link';
import styles from '../styles/home.module.css';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>Gradient</h1>
        <nav>
          <Link legacyBehavior href="/">
            <a className={styles.navLink}>Home</a>
          </Link>
          {router.pathname !== '/blog' && (
            <Link legacyBehavior href="/blog">
              <a className={styles.navLink}>Blog</a>
            </Link>
          )}
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}