import { NextPageContext } from "next";
import { AppProviders } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import styles from "../../styles/Login.module.scss";

export default function SignIn({ providers }: { providers: AppProviders }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Convite Isadora & Victor</title>
          <meta name="description" content="Convite Isadora & Victor" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Isadora & Victor</h1>
        <p>
          Faça login com o provedor que preferir, usando o mesmo e-mail do
          convite.
        </p>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Login com {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
