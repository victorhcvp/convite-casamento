import styles from "../styles/InstrucoesPM.module.scss";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";

const Damas: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding10}>
        <BackButton text="Voltar" />
        <h2>Damas de Honra</h2>
        <p>Abaixo estão as instruções para damas de honra.</p>
        <iframe
          src="https://www.canva.com/design/DAFLMG8rvtc/view?embed"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Damas;
