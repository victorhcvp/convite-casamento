import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.scss";

const Login: NextPage = () => {
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  } else if (status === "authenticated") {
    router.push("/inicio");
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
      {status === "loading" && <h2>Carregando...</h2>}
    </div>
  );
};

export default Login;
