import axios from "axios";
import { NextPageContext } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../../../entities/User";
import styles from "../../../styles/Admin.module.scss";
import { BackButton } from "../../../components/BackButton";

type IProps = {
  family: User[];
  relation: string;
};

const _url =
  process.env.NODE_ENV !== "production"
    ? process.env.MAIN_URL_DEV
    : process.env.MAIN_URL_PRD;

const Family = (props: IProps) => {
  const router = useRouter();
  const [family, setFamily] = useState(props.family);
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className={styles.loginContainer}>
        <h2>Carregando...</h2>
      </div>
    );
  } else if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  } else {
    if (data) if (!data.admin) router.push("/");
  }

  return (
    <div className={styles.adminPanel}>
      <BackButton text="Voltar" href={`/admin/painel`} />
      <h2>Família: {props.relation}</h2>
      <p>Clique para alterar os convidados da família:</p>
      {family &&
        family.map((f) => (
          <Link href={`/admin/invite?member=${f.id}`} key={f.id}>
            <a>{f.name}</a>
          </Link>
        ))}
    </div>
  );
};

export default Family;

export async function getServerSideProps({ query }: NextPageContext) {
  const relation = query.relation;

  try {
    const { data } = await axios.post(`${_url}/api/invite/listFamily`, {
      relation,
      password: "jorge_1234_vaila_cleison",
    });

    return {
      props: {
        family: data.data,
        relation,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log("Error loading family: ", error);
  }

  return {
    props: {
      family: [],
      relation,
    }, // will be passed to the page component as props
  };
}
