import Image from 'next/image';
import styles from './styles.module.scss';

export function Welcome() {
  return (
    <section className={styles.container}>
      <h4>Seja bem-vindo(a)!</h4>
      <p>Era uma vez um homem sério e objetivo que conheceu uma mulher não tão séria e com a cabeça nas nuvens. Os dois eram opostos, porém igualmente estranhos.<br /><br />Tudo se encaixou e agora você foi convidado(a) para celebrar esse amor! Nesse portal você saberá tudo sobre essa data tão especial! Explore e descubra tudo que preparamos 💗</p>
    </section>
  );
}