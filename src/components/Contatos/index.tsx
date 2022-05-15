import Image from 'next/image';
import styles from './styles.module.scss';

export function Contatos() {
  return (
    <>
      <div className={styles.container}>
        <a href="https://wa.me/5567991521608" target="_blank" rel="noreferrer">
          <div className={styles.icon}>
            <Image src="/icons/wpp.svg" width="19" height="19" alt="Wpp" />
          </div>
          <div>
            <span>Isadora</span>
            <p>(67) 99152-1608</p>
          </div>
          <div className={styles.star}>
            <Image src="/icons/star.svg" width="18" height="18" alt="Star" />
          </div>
        </a>
        <a href="https://wa.me/5521965712960" target="_blank" rel="noreferrer">
          <div className={styles.icon}>
            <Image src="/icons/wpp.svg" width="19" height="19" alt="Wpp" />
          </div>
          <div>
            <span>Victor</span>
            <p>(21) 96571-2960</p>
          </div>
        </a>
      </div>
      <span>(Fala com ela, eu não sei de nada - mas se mesmo assim quiser falar comigo, tá aí)</span>
    </>
  );
}