import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { Header } from '../components/Header';
import { PageTitle } from '../components/PageTitle';
import { useAuth } from '../hooks/auth';
import styles from '../styles/Convites.module.scss';

type ErrorsData = {
  id: string;
  confirmed: boolean;
}

export function Convites() {
  const { family } = useAuth();
  const [showError, setShowError] = useState(false);
  let showErrorTimer: NodeJS.Timeout | undefined = undefined;

  function onInviteClick(id: string) {
    clearTimeout(showErrorTimer);
    const memberId = family.data.findIndex((value) => {
      return value.id === id;
    })
    if(!family.data[memberId].confirmed) {
      setShowError(true);

      showErrorTimer = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <PageTitle>Lista de Convites</PageTitle>
      {showError && (
        <ErrorMessage
          message="Você precisa confirmar a presença antes de gerar o convite."
        />
      )}
      {family && family.data && family.data.map((member) => {
        return (
            <Button
              key={member.id}
              href='#'
              text={member.name}
              bgColor={member.confirmed ? '#A27EAE' : '#BAABBF'}
              onClick={() => onInviteClick(member.id)}
            />
        )
      })}
    </div>
  );
}

export default Convites;