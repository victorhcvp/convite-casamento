import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useAuth } from '../hooks/auth'
import styles from '../styles/Login.module.scss'

const Login: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { login } = useAuth();
  const router = useRouter();
  let loadingInterval: NodeJS.Timer | undefined = undefined;
  const [submitText, setSubmitText] = useState('Entrar');

  function loadingButtonStart() {
    clearInterval(loadingInterval);
    let txt = '';
    loadingInterval = setInterval(() => {
      txt = txt + '.';
      setSubmitText(txt);
      if(txt == '...') txt = ''
    }, 200);
  }

  async function handleLogin() {
    const phone = inputRef.current.value;

    loadingButtonStart();

    const logged = await login(phone);

    if(logged) {
      clearInterval(loadingInterval);
      router.push('/inicio');
    }

    clearInterval(loadingInterval);
    setSubmitText('Entrar');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Convite Isadora & Victor</title>
        <meta name="description" content="Convite Isadora & Victor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Isadora & Victor</h1>
      <input type="text" placeholder="Digite seu celular" ref={inputRef} />
      <button type="submit" onClick={handleLogin}>{submitText}</button>
    </div>
  )
}

export default Login
