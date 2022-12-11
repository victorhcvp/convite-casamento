import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "../components/Button";
import { Contatos } from "../components/Contatos";
import { Date } from "../components/Date";
import { Header } from "../components/Header";
import { Welcome } from "../components/Welcome";
import { useAuth } from "../hooks/auth";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const router = useRouter();
  const { family, user, loadFamily } = useAuth();

  const { data, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Convite Isadora & Victor</title>
        <meta name="description" content="Convite Isadora & Victor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "loading" && <h2>Carregando...</h2>}
      {status === "authenticated" && (
        <>
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
              href="/convites"
              text="Visualizar Convites"
              icon="/icons/invite.svg"
              w={22}
              h={22}
            />
            <Button
              href="https://sites.icasei.com.br/victoreisa/pages/26818776"
              target="_blank"
              text="Lista de Presentes"
              icon="/icons/present.svg"
              w={20}
              h={22}
            />
            {!user.isGodfather && !user.isGodmother && !user.isHonor && (
              <Button
                href="/dress-code"
                target="_self"
                text="💃 Dress Code"
                w={20}
                h={22}
              />
            )}
            <Button
              href="/confirmar-presenca"
              text="Confirmar Presença"
              icon="/icons/check.svg"
              w={24}
              h={24}
              bgColor="#BAAA71"
            />
            <div className={styles.space}></div>
            {(user.isGodmother || user.isGodfather) && (
              <Button
                href="/padrinhos-madrinhas"
                text="Instruções Madrinhas"
                icon="/icons/madrinha.svg"
                w={24}
                h={24}
                bgColor="#D8A1CF"
              />
            )}
            {(user.isHonor || user.isHonor) && (
              <Button
                href="/damas"
                text="Instruções Damas"
                icon="/icons/crown.svg"
                w={24}
                h={24}
                bgColor="#F26C84"
              />
            )}
            {(user.isGodfather || user.isGodmother) && (
              <Button
                href="/padrinhos-madrinhas"
                text="Instruções Padrinhos"
                icon="/icons/padrinho.svg"
                w={24}
                h={24}
                bgColor="#7E82AE"
              />
            )}
            {user.isAdmin && (
              <Button
                href="/admin"
                text="Administração"
                icon="/icons/admin.svg"
                w={24}
                h={24}
                bgColor="#551010"
              />
            )}
            <div className={styles.space}></div>
            <Contatos />
            <div className={styles.space}></div>
            <Button
              onClick={() => signOut()}
              text="Sair"
              w={0}
              h={0}
              bgColor="#777"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
