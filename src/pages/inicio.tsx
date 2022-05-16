import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../components/Button'
import { Contatos } from '../components/Contatos'
import { Date } from '../components/Date'
import { Header } from '../components/Header'
import { Welcome } from '../components/Welcome'
import { useAuth } from '../hooks/auth'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const router = useRouter();
  const { auth, user } = useAuth();

  useEffect(() => {
    if(!auth.phone) {
      router.push('/');
    }
  }, [auth, router])

  return (
    <div className={styles.container}>
      <Head>
        <title>Convite Isadora & Victor</title>
        <meta name="description" content="Convite Isadora & Victor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.padding10}>
        <Date />
        <Welcome />
        <Button
          href="/como-chegar"
          text="Como Chegar"
          icon="/icons/map.svg"
          w={24}
          h={24}
        />
        <Button
          href="#"
          text="Visualizar Convites"
          icon="/icons/invite.svg"
          w={22}
          h={22}
        />
        <Button
          href="#"
          text="Lista de Presentes"
          icon="/icons/present.svg"
          w={20}
          h={22}
        />
        <Button
          href="#"
          text="Confirmar Presença"
          icon="/icons/check.svg"
          w={24}
          h={24}
          bgColor="#BAAA71"
        />
        <div className={styles.space}></div>
        {user.isGodmother && (
          <Button
            href="#"
            text="Instruções Madrinhas"
            icon="/icons/madrinha.svg"
            w={24}
            h={24}
            bgColor="#D8A1CF"
          />
        )}
        {user.isGodfather && (
          <Button
            href="#"
            text="Instruções Padrinhos"
            icon="/icons/padrinho.svg"
            w={24}
            h={24}
            bgColor="#7E82AE"
          />
        )}
        <div className={styles.space}></div>
        <Contatos />
        <div className={styles.space}></div>
      </div>
    </div>
  )
}

export default Home
