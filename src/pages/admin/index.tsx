import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Admin.module.scss";

const Admin: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  } else if (status === "authenticated") {
    router.push("/admin/painel");
  }

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Administração I&V</title>
        <meta name="description" content="Administração I&V" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Administração</h1>
      <h3>Carregando...</h3>
    </div>
  );
};

export default Admin;
