import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { User } from "../../entities/User";
import styles from "../../styles/Admin.module.scss";

type Families = {
  families: string[];
  statistics: {
    totalInvited: number;
    confirmed: number;
    unconfirmed: number;
    godmothers: number;
    godfathers: number;
    normal: number;
  };
};

const _url =
  process.env.NODE_ENV !== "production"
    ? process.env.MAIN_URL_DEV
    : process.env.MAIN_URL_PRD;

const Painel = (props: Families) => {
  const router = useRouter();
  const [families, setFamilies] = useState(props.families);
  const [statistics, setStatistics] = useState(props.statistics);
  const [search, setSearch] = useState("");
  const { data, status } = useSession();
  const searchRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  console.log(props.statistics);

  const handleSearch = useCallback(() => {
    const searchValue = searchRef.current.value;
    if (searchValue.length > 2) {
      setSearch(searchValue);
    }
    if (searchValue.length === 0) {
      setSearch("");
    }
  }, []);

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
        <BackButton text="Voltar para o site" href="/inicio" />
        <h2>Estatísticas</h2>
        <div className={styles.adminStatistics}>
          <div>
            <p>{statistics.totalInvited}</p>
            <span>Convites</span>
          </div>
          <div>
            <p>{statistics.confirmed}</p>
            <span>
              Confirmados (
              {((statistics.confirmed / statistics.totalInvited) * 100).toFixed(
                1
              )}
              %)
            </span>
          </div>
          <div>
            <p>{statistics.unconfirmed}</p>
            <span>
              Pendentes (
              {(
                (statistics.unconfirmed / statistics.totalInvited) *
                100
              ).toFixed(1)}
              %)
            </span>
          </div>
          <div>
            <p>{statistics.godmothers}</p>
            <span>
              Madrinhas (
              {(
                (statistics.godmothers / statistics.totalInvited) *
                100
              ).toFixed(1)}
              %)
            </span>
          </div>
          <div>
            <p>{statistics.godfathers}</p>
            <span>
              Padrinhos (
              {(
                (statistics.godfathers / statistics.totalInvited) *
                100
              ).toFixed(1)}
              %)
            </span>
          </div>
          <div>
            <p>{statistics.normal}</p>
            <span>
              Normais (
              {((statistics.normal / statistics.totalInvited) * 100).toFixed(1)}
              %)
            </span>
          </div>
        </div>
        <h2>Convites</h2>
        <p>Clique para alterar os convidados da família:</p>
        <p>
          <strong>Pesquisar por nome da família</strong>
        </p>
        <input
          type="text"
          id="search"
          name="search"
          ref={searchRef}
          onChange={handleSearch}
        />
        <Link href={`/admin/especiais`}>
          <a>Convites Especiais</a>
        </Link>
        {families &&
          !search &&
          families.sort().map((f) => (
            <Link href={`/admin/family/${f}`} key={f}>
              <a>{f}</a>
            </Link>
          ))}
        {families &&
          search &&
          families
            .filter((family) => family.includes(search))
            .sort()
            .map((f) => (
              <Link href={`/admin/family/${f}`} key={f}>
                <a>{f}</a>
              </Link>
            ))}
        <div className={styles.separator}></div>
        <Link href="/admin/invite">
          <a className={styles.newFamilyButton}>Criar novo convite</a>
        </Link>
      </div>
    </>
  );
};

export default Painel;

export async function getServerSideProps() {
  const { data } = await axios.post(`${_url}/api/admin/listFamilies`, {
    password: "jorge_1234_vaila_cleison",
  });
  const statisticsData = await axios.get(`${_url}/api/admin/statistics`);

  return {
    props: {
      families: data.data,
      statistics: statisticsData.data.data,
    }, // will be passed to the page component as props
  };
}
