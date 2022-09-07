import styles from "../styles/InstrucoesPM.module.scss";
import { NextPage } from "next";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";

const ComoChegar: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding10}>
        <BackButton text="Voltar" />
        <h2>Madrinhas & Padrinhos</h2>
        <p>Abaixo estão as instruções para madrinhas e padrinhos.</p>
        <iframe
          src="https://www.canva.com/design/DAFKu-1SOU8/view?embed"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ComoChegar;
