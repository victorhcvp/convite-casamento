import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { Header } from '../components/Header';
import { PageTitle } from '../components/PageTitle';
import { useAuth } from '../hooks/auth';
import styles from '../styles/ConfirmarPresenca.module.scss';

type ErrorsData = {
  id: string;
  confirmed: boolean;
}

export function ConfirmarPresenca() {
  const { family } = useAuth();
  const [showError, setShowError] = useState(false);
  let showErrorTimer: NodeJS.Timeout | undefined = undefined;

  function onConfirmClick(id: string) {
    const memberId = family.data.findIndex((value) => {
      return value.id === id;
    })
  }

  return (
    <div className={styles.container}>
      <Header />
      <BackButton text="Voltar" />
      <PageTitle>Confirmar Presença</PageTitle>
      <p>Clique no nome para confirmar.</p>
      
      {family && family.data && family.data.map((member) => {
        return (
            <Button
              key={member.id}
              href='#'
              icon={member.confirmed ? '/icons/check.svg' : ''}
              w={24}
              h={24}
              text={member.name}
              bgColor={member.confirmed ? '#A27EAE' : '#BAABBF'}
              onClick={() => onConfirmClick(member.id)}
            />
        )
      })}
    </div>
  );
}

export default ConfirmarPresenca;