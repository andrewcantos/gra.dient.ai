import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import Link from 'next/link';
import styles from '../styles/home.module.css'
import BackgroundCubes from '../components/BackgroundCubes';

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {
  return (
    <main className={styles.main}>
      <BackgroundCubes />
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #444444' }}>
        <h1 className={styles.title}>Gradient</h1>
        <nav>
          {/* Blog link removed */}
        </nav>
      </header>
      <div className={styles.centeredContent}> {/* Updated message */}
        <h2 className={styles.subtitle}>
          Autonomous Investment Research
        </h2>
        <p>
          We’re building a system that learns how to invest — not by following rules, but by discovering them. Through continuous experimentation and refinement, it learns the underlying drivers of investment success from the ground up.
        </p>
      </div>
    </main>
  );
}

export default Home;
