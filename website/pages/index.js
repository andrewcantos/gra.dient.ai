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
          {/* Blog link removed */}
        </nav>
      </header>
      <div className={styles.centeredContent}> {/* Updated message */}
        <p className={styles.subtitle}>
          gra.dient.ai is a fully automated AI investment fund.<br />
          We are not currently open to outside investors.
        </p>
      </div>
    </main>
  );
}

export default Home;
