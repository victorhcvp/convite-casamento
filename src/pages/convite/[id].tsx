/* eslint-disable @next/next/no-img-element */
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
  const { id } = router.query;

  useEffect(() => {
    if (family.data) {
      const m = family.data.find((f) => f.id === id);

      if (!m) {
        router.push("/convites");
        return;
      }

      setMember(m);
    }
  }, [family, id, router]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding10}>
        <BackButton text="Voltar" href="/convites" />
        <PageTitle>Convites</PageTitle>
        <p>Convites com presença confirmada.</p>
        {member && (
          <>
            <section className={styles.ticket}>
              <div>
                <h2
                  className={member.name.length >= 13 ? styles.smallName : ""}
                >
                  {member.name}
                </h2>
                <p>
                  Família: <strong>{member.relation}</strong>
                </p>
              </div>
              <div className={styles.badges}>
                {member.isGodfather && (
                  <div>
                    <div className={styles.padrinho}>Padrinho</div>
                  </div>
                )}
                {member.isGodmother && (
                  <div>
                    <div className={styles.madrinha}>Madrinha</div>
                  </div>
                )}
                {member.isHonor && (
                  <div>
                    <div className={styles.honra}>Dama de Honra</div>
                  </div>
                )}
                {member.confirmed && (
                  <div>
                    <div className={styles.confirmed}>Confirmado</div>
                  </div>
                )}
              </div>
            </section>
            <p className={styles.inviteInstructions}>
              Apresente essa tela na entrada.
            </p>
          </>
        )}
        {family.data &&
          family.data
            .filter((m) => m.id !== member.id)
            .map((m) => {
              return (
                <>
                  <section className={styles.ticket}>
                    <div>
                      <h2>{m.name}</h2>
                      <p>
                        Família: <strong>{m.relation}</strong>
                      </p>
                    </div>
                    <div className={styles.badges}>
                      {m.isGodfather && (
                        <div>
                          <div className={styles.padrinho}>Padrinho</div>
                        </div>
                      )}
                      {m.isGodmother && (
                        <div>
                          <div className={styles.madrinha}>Madrinha</div>
                        </div>
                      )}
                      {m.isHonor && (
                        <div>
                          <div className={styles.honra}>Dama de Honra</div>
                        </div>
                      )}
                      {member.confirmed && (
                        <div>
                          <div className={styles.confirmed}>Confirmado</div>
                        </div>
                      )}
                    </div>
                  </section>
                </>
              );
            })}
      </div>
    </div>
  );
}

export default Convite;
