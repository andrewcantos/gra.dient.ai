import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
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
      <div className={styles.centeredContent}>
        <h1 className={styles.title}>Gradient</h1>
        <p className={styles.subtitle}>
          Welcome to Gradient, an AI-powered investment organization revolutionizing the way you grow your wealth.
        </p>
      </div>
    </main>
  );
}

export default Home;
