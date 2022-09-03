/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Header } from "../../components/Header";
import { PageTitle } from "../../components/PageTitle";
import { User } from "../../entities/User";
import { useAuth } from "../../hooks/auth";
import styles from "../../styles/Convite.module.scss";

export function Convite() {
  const { family } = useAuth();
  const [member, setMember] = useState({} as User);
  const router = useRouter();
  const { phone } = router.query;

  useEffect(() => {
    if (family.data) {
      const m = family.data.find((f) => f.phone === phone);

      if (!m) {
        router.push("/convites");
        return;
      }

      setMember(m);
    }
  }, [family, phone, router]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding10}>
        <BackButton text="Voltar" href="/convites" />
        <PageTitle>Convite</PageTitle>
        {member && (
          <>
            <section className={styles.ticket}>
              <div>
                <h2>{member.name}</h2>
                <p>
                  Família: <strong>{member.relation}</strong>
                </p>
              </div>
              {member.isGodfather && (
                <div>
                  <div className={styles.padrinho}>Padrinho</div>
                </div>
              )}
            </section>
            <p className={styles.inviteInstructions}>
              Apresente essa tela na entrada.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Convite;
