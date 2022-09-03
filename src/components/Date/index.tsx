import styles from "./styles.module.scss";
import Image from "next/image";

export function Date() {
  return (
    <section className={styles.date}>
      <div>
        <div className={styles.dateIcon}>
          <Image src="/icons/calendar.svg" width="26" height="26" alt="Date" />
        </div>
        <p>
          <strong>22 de Abril de 2023</strong>
        </p>
      </div>
      <div>
        <div className={styles.dateIcon}>
          <Image src="/icons/clock.svg" width="26" height="26" alt="Date" />
        </div>
        <p>
          <strong>16:00</strong>
        </p>
      </div>
    </section>
  );
}
