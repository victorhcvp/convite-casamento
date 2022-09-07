import axios from "axios";
import { NextPageContext } from "next";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useCallback, useRef, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { ErrorMessage } from "../../components/ErrorMessage";
import { User } from "../../entities/User";
import styles from "../../styles/Admin.module.scss";

type Families = {
  families: string[];
  member: User;
};

const _url =
  process.env.NODE_ENV !== "production"
    ? process.env.MAIN_URL_DEV
    : process.env.MAIN_URL_PRD;

const NewFamily = (props: Families) => {
  const [families, setFamilies] = useState(props.families);
  const [newFamilyInputShown, setNewFamilyInputShown] = useState(false);
  const { data, status } = useSession();
  const familyRef = useRef<HTMLSelectElement>({} as HTMLSelectElement);

  const newFamilyInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const nameInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const phoneInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const emailInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const typeNormalInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const typeGodmotherInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const typeGodfatherInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const typeHonorInput = useRef<HTMLInputElement>({} as HTMLInputElement);

  const [error, setError] = useState("");
  const [saveButtonText, setSaveButtonText] = useState("Salvar");

  console.log("Member", props.member);

  const handleFamilyChange = useCallback(() => {
    const familySelected = familyRef.current.value;
    console.log(familySelected);
    if (familySelected === "#new") {
      setNewFamilyInputShown(true);
    } else {
      setNewFamilyInputShown(false);
    }
  }, []);

  const handleSaveInvite = useCallback(async () => {
    setError("");
    const family = (
      familyRef.current.value === "#new"
        ? newFamilyInput.current.value
        : familyRef.current.value
    ).toLowerCase();

    const name = nameInput.current.value;
    const phone = phoneInput.current.value;
    const email = emailInput.current.value;
    let type;
    if (typeNormalInput.current.checked) type = "normal";
    else if (typeGodmotherInput.current.checked) type = "godmother";
    else if (typeGodfatherInput.current.checked) type = "godfather";
    else if (typeHonorInput.current.checked) type = "honor";

    console.log(family, name, phone, email, type);

    if (!family || !name || !phone || !email || !type) {
      setError("Preencha todos os campos");
      return;
    }

    const phoneRegex1 = /[^0-9]+/g;
    const phoneRegex2 = /[0-9]{11}/; // 21 99999 9999
    const phoneFiltered = phone.replace(phoneRegex1, "");

    if (!phoneRegex2.test(phoneFiltered)) {
      setError("Celular inválido");
      return;
    }

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailRegex.test(email)) {
      setError("O e-mail parece inválido");
      return;
    }

    const req = {
      id: props.member ? props.member.id : "",
      name,
      phone: phoneFiltered,
      email,
      isGodfather: type === "godfather",
      isGodmother: type === "godmother",
      isHonor: type === "honor",
      relation: family,
      password: "jorge_1234_vaila_cleison",
      confirmed: false,
      isAdmin: false,
    };

    setSaveButtonText("Carregando...");

    try {
      const res = await fetch(`/api/invite/create`, {
        method: "POST",
        body: JSON.stringify(req),
      });

      const data = await res.json();

      setSaveButtonText("Salvar");
      if (data.ok) {
        console.log("Invite created");
        if (familyRef.current.value === "#new") {
          setFamilies([...families, family]);
        }
      } else {
        console.log("Error creating invite", data.error);
        setError(`Erro ao criar convite: ${data.error}`);
      }
    } catch (error) {
      setSaveButtonText("Salvar");
      setError(`Erro ao criar convite: ${error}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const backButtonPath = props.member
    ? `/admin/family/${props.member.relation}`
    : "/admin/painel";

  return (
    <div className={styles.adminPanel}>
      <BackButton text="Voltar" href={backButtonPath} />
      <h2>{props.member ? "Editar" : "Novo"} convite</h2>
      <p>Preencha as informações da pessoa:</p>
      <form method="POST">
        <label htmlFor="relation">Família:</label>
        <select
          name="relation"
          id="relation"
          ref={familyRef}
          onChange={handleFamilyChange}
          defaultValue={props.member && props.member.relation}
        >
          <option value="">Selecione</option>
          <option value="#new" id="new">
            Nova família
          </option>
          {families &&
            families.map((family) => {
              return (
                <option
                  key={`family-${family}`}
                  value={family}
                  id={`family-${family}`}
                >
                  {family}
                </option>
              );
            })}
        </select>
        {newFamilyInputShown && (
          <>
            <label htmlFor="newFamily">Nome da nova família:</label>
            <input
              type="text"
              id="newFamily"
              name="newFamily"
              placeholder="Exemplo: Carvalho"
              ref={newFamilyInput}
            />
          </>
        )}
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome completo"
          ref={nameInput}
          defaultValue={props.member ? props.member.name : ""}
        />

        <label htmlFor="phone">Celular:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Somente números (67999999999)"
          ref={phoneInput}
          defaultValue={props.member ? props.member.phone : ""}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          ref={emailInput}
          defaultValue={props.member ? props.member.email : ""}
        />

        <label htmlFor="type">Tipo de convite:</label>
        <div className={styles.radioGroup}>
          <input
            type="radio"
            name="type"
            value="normal"
            id="normal"
            ref={typeNormalInput}
            defaultChecked={
              props.member &&
              !props.member.isGodfather &&
              !props.member.isGodmother
            }
          />
          <label htmlFor="normal">Normal</label>

          <input
            type="radio"
            name="type"
            value="godmother"
            id="godmother"
            ref={typeGodmotherInput}
            defaultChecked={props.member && props.member.isGodmother}
          />
          <label htmlFor="godmother">Madrinha</label>

          <input
            type="radio"
            name="type"
            value="godfather"
            id="godfather"
            ref={typeGodfatherInput}
            defaultChecked={props.member && props.member.isGodfather}
          />
          <label htmlFor="godfather">Padrinho</label>

          <input
            type="radio"
            name="type"
            value="honor"
            id="honor"
            ref={typeHonorInput}
            defaultChecked={props.member && props.member.isHonor}
          />
          <label htmlFor="honor">Dama de Honra</label>
        </div>
      </form>
      <button onClick={handleSaveInvite} disabled={saveButtonText !== "Salvar"}>
        {saveButtonText}
      </button>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default NewFamily;

export async function getServerSideProps({ query }: NextPageContext) {
  const { data } = await axios.post(`${_url}/api/admin/listFamilies`, {
    password: "jorge_1234_vaila_cleison",
  });

  let member = null;
  if (query) {
    if (query.member) {
      try {
        const { data } = await axios.get(
          `${_url}/api/admin/getMember/${query.member}`
        );
        member = data.member;
      } catch (error) {
        console.log("Member not found: ", error);
      }
    }
  }

  return {
    props: {
      families: data.data,
      member,
    }, // will be passed to the page component as props
  };
}
