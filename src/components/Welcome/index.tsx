import Image from 'next/image';
import { useAuth } from '../../hooks/auth';
import styles from './styles.module.scss';

export function Welcome() {
  const { user } = useAuth();
  return (
    <section className={styles.container}>
      <h4>Seja bem-vindo(a), {user.name && user.name.split(' ')[0]}!</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem ullam numquam eos reprehenderit animi id dolor odit illo! Reiciendis dicta neque nam asperiores quae tenetur optio inventore maiores tempora.</p>
    </section>
  );
}