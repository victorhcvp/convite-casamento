import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { useAuth } from "../hooks/auth";
import styles from "../styles/Convites.module.scss";

export function Convites() {
  const { family } = useAuth();
  const { push } = useRouter();
  const [showError, setShowError] = useState(false);
  const [showErrorTimer, setShowErrorTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  const render = useMemo(() => {
    if (!family.data) return <h3>Carregando</h3>;

    function onInviteClick(id: string) {
      clearTimeout(showErrorTimer);
      setShowErrorTimer(undefined);
      const memberId = family.data.findIndex((value) => {
        return value.id === id;
      });
      if (!family.data[memberId].confirmed) {
        setShowError(true);

        setShowErrorTimer(
          setTimeout(() => {
            setShowError(false);
            setShowErrorTimer(undefined);
          }, 5000)
        );
      } else {
        push(`/convite/${family.data[memberId].phone}`);
      }
    }

    console.log(family);

    return family.data.map((member) => {
      return (
        <Button
          key={member.id}
          icon={member.confirmed ? "/icons/check.svg" : ""}
          w={24}
          h={24}
          text={member.name}
          bgColor={member.confirmed ? "#A27EAE" : "#BAABBF"}
          onClick={() => onInviteClick(member.id)}
        />
      );
    });
  }, [family, push, showErrorTimer]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding10}>
        <BackButton text="Voltar" />
        <PageTitle>Lista de Convites</PageTitle>
        {showError && (
          <ErrorMessage message="Você precisa confirmar a presença antes de gerar o convite." />
        )}
        {render}
      </div>
    </div>
  );
}

export default Convites;
