import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Client } from '../features/main/components/client'
import { MealsPage } from '../features/main/components/meals'
import { GeneralContext } from '../features/main/context'
import styles from '../styles/Home.module.css'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { ClientData, Meal } from '../features/utils/types'

const Home: NextPage = () => {
  const [general, setGeneral] = useState<{
    client: ClientData,
    meals: Meal[]
  } | any>({
    client: null,
    meals: [],
  });
  useEffect(() => {
    const cookies = parseCookies()?.data
    if (cookies) {
        const cookieData = JSON.parse(cookies)
        console.log(cookieData)
        setGeneral(cookieData)
    }
    
}, [])
  useEffect(() => {
    setCookie(null, 'data', JSON.stringify(general), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }, [general])
  console.log('teste ', general)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GeneralContext.Provider value={{ general, setGeneral }}>
        <main className={styles.main} style={{ width: '100%', padding: '20px' }}>
          <Client />
          <MealsPage />
        </main>
      </GeneralContext.Provider>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Desenvolvido por{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
