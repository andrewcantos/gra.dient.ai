import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import Link from 'next/link';
import styles from '../styles/home.module.css'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {
  return (
    <main className={styles.main}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #ddd' }}> {/* Updated to match other pages */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gradient</h1>
        <nav>
          <Link legacyBehavior href="/blog">
            <a style={{ textDecoration: 'none', color: 'inherit' }}>Blog</a>
          </Link>
        </nav>
      </header>
      <div className={styles.centeredContent}> {/* Removed redundant heading */}
        <p className={styles.subtitle}>
          Welcome to Gradient, an AI-powered investment organization revolutionizing the way you grow your wealth.
        </p>
      </div>
    </main>
  );
}

export default Home;
