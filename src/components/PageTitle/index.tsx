import { ReactNode } from 'react';
import styles from './styles.module.scss';

type PageTitleData = {
  children: ReactNode
}

export function PageTitle({children}: PageTitleData) {
  return (
    <h1 className={styles.container}>
      {children}
    </h1>
  );
}