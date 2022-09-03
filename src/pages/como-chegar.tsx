import { NextPage } from "next";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import styles from "../styles/ComoChegar.module.scss";
import { BackButton } from "../components/BackButton";

const ComoChegar: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div>
        <BackButton text="Voltar" />
        <h2>Como Chegar</h2>
        <p>
          <strong>Endereço:</strong>
        </p>
        <p>Rua Ana Brasília, 683 - Rita Vieira</p>
        <p>Campo Grande - MS</p>

        <Button
          href="https://goo.gl/maps/it4RDfsGmr6hqrXm6"
          text="Abrir Google Maps"
          icon="/icons/map.svg"
          w={24}
          h={24}
          bgColor="#1A73E8"
          cStyle="small"
          target="_blank"
        />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.511947956581!2d-54.585076781242286!3d-20.502226220182443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486ef1440a4ad45%3A0x7d2402e96a3f4ff6!2sCasa%20Figueira%20-%20Rustic%20Home%20%26%20Buffet!5e0!3m2!1spt-BR!2sbr!4v1652646887011!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ComoChegar;
