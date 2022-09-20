import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { User } from "../../entities/User";
import styles from "../../styles/Admin.module.scss";

type Props = {
  members: {
    data: User[];
  };
};

const _url =
  process.env.NODE_ENV !== "production"
    ? process.env.MAIN_URL_DEV
    : process.env.MAIN_URL_PRD;

const Especiais = (props: Props) => {
  const router = useRouter();
  const [members, setMembers] = useState(props.members.data);
  const { data, status } = useSession();

  console.log("all members", members);

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
    <>
      <div className={styles.adminPanel}>
        <BackButton text="Voltar para o site" href="voltar" />

        <h2>Convites Especiais</h2>
        <p>Madrinhas</p>
        {members &&
          members
            .filter((f) => f.isGodmother)
            .sort()
            .map((f) => (
              <Link href={`/admin/invite?member=${f.id}`} key={f.id}>
                <a>
                  {f.name} ({f.relation})
                </a>
              </Link>
            ))}
        <p>Padrinhos</p>
        {members &&
          members
            .filter((f) => f.isGodfather)
            .sort()
            .map((f) => (
              <Link href={`/admin/invite?member=${f.id}`} key={f.id}>
                <a>
                  {f.name} ({f.relation})
                </a>
              </Link>
            ))}
        <p>Damas de Honra</p>
        {members &&
          members
            .filter((f) => f.isHonor)
            .sort()
            .map((f) => (
              <Link href={`/admin/invite?member=${f.id}`} key={f.id}>
                <a>
                  {f.name} ({f.relation})
                </a>
              </Link>
            ))}
      </div>
    </>
  );
};

export default Especiais;

export async function getServerSideProps() {
  const { data } = await axios.post(`${_url}/api/admin/listAllMembers`, {
    password: "jorge_1234_vaila_cleison",
  });

  return {
    props: {
      members: data,
    }, // will be passed to the page component as props
  };
}
