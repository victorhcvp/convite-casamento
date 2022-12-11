import Image from "next/image";
import styles from "./styles.module.scss";

export function Contatos() {
  return (
    <>
      <div className={styles.container}>
        <p>Ajuda e informações:</p>
        <a href="https://wa.me/5567999113061" target="_blank" rel="noreferrer">
          <div className={styles.icon}>
            <Image src="/icons/wpp.svg" width="19" height="19" alt="Wpp" />
          </div>
          <div>
            <span>Antônio - Cerimonialista</span>
            <p>(67) 99911-3061</p>
          </div>
          <div className={styles.star}>
            <Image src="/icons/star.svg" width="18" height="18" alt="Star" />
          </div>
        </a>
        <p>Gentileza confirmar presença até 02/04/23.</p>
      </div>
    </>
  );
}
