import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Client } from '../features/main/sections/client'
import { MealsPage } from '../features/main/sections/meals'
import { GeneralContext } from '../features/main/context'
import styles from '../styles/Home.module.css'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { ClientData, Meal } from '../features/utils/types'
import dynamic from 'next/dynamic'

const PdfDownload = dynamic(
  () => import('../features/main/pdf-generator/PdfDownload'),
  { ssr: false }
)

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
        setGeneral(cookieData)
    }
    
}, [])
  useEffect(() => {
    setCookie(null, 'data', JSON.stringify(general), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    if (general.client?.client_name) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [general])
  const [show, setShow] = useState<boolean>(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Nutrição Simplificada</title>
        <meta name="description" content="Cálculo calórico e de macronutrientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GeneralContext.Provider value={{ general, setGeneral }}>
        <main className={styles.main} style={{ width: '100%', padding: '20px', marginBottom: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <div>
              {!show && (
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                  onClick={() => setShow(true)}>
                  <Image
                    src="/icons/user.svg"
                    width="25px" height="25px" alt="Limpar"
                  />
                  <h5>Alterar usuário</h5>
                </div>
              )}
            </div>
            {general.client?.client_name && (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
              onClick={() => (
                destroyCookie(null, 'data'),
                setGeneral({
                  client: null,
                  meals: [],
                })
              )}
            >
              <h5>Reiniciar</h5>
              <Image
                src="/icons/clear.svg"
                width="25px" height="25px" alt="Limpar"
            />
            </div>
            )}
          </div>
          <Client show={show} setShow={setShow} />
          <MealsPage />
          {typeof window !== 'undefined' && general?.client && general?.meals.length > 0 && <PdfDownload data={general} />}
        </main>
      </GeneralContext.Provider>

      <footer className={styles.footer}>
        <a
          href="https://www.instagram.com/nutrifabriciodegrandis"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '14px' }}
        >
          Nutricionista Fabrício Degrandis
        </a>
        <a
          href="https://www.linkedin.com/in/amandavmanduca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sistema Desenvolvido por Amanda Manduca
        </a>
      </footer>
    </div>
  )
}

export default Home
