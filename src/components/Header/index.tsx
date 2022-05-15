import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.overlay}></div>
      <h1>Isadora & Victor</h1>
    </header>
  );
}