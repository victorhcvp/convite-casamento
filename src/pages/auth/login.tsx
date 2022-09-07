/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextPageContext } from "next";
import { AppProviders } from "next-auth/providers";
import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Login.module.scss";

interface IProps {
  providers: AppProviders;
  callbackUrl: string;
}

export default function SignIn({ providers, callbackUrl }: IProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [callbackUrl, router, status]);

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
        <p>Escolha como fazer login</p>
        {Object.values(providers).map((provider) => {
          return (
            <button key={provider.name} onClick={() => signIn(provider.id)}>
              {provider.name === "Discord" && <img src="/icons/discord.svg" />}
              {provider.name === "Facebook" && (
                <img src="/icons/facebook.svg" />
              )}
              {provider.name === "Google" && <img src="/icons/google.svg" />}
              <span>Login com {provider.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders();

  const callbackUrl = context.query.callbackUrl || "/";

  return {
    props: {
      providers,
      callbackUrl,
    },
  };
}
