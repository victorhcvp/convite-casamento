import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { Family } from "../entities/User";
import { useAuth } from "../hooks/auth";
import styles from "../styles/ConfirmarPresenca.module.scss";

export function ConfirmarPresenca() {
  const { family, updateFamily } = useAuth();
  const [error, setError] = useState("");
  const [confirmPopupShow, setConfirmPopupShow] = useState(false);
  const [confirmMemberId, setConfirmMemberId] = useState(-1);
  const [confirmMemberStatus, setConfirmMemberStatus] = useState(false);

  async function onConfirmClick(id: string) {
    const memberId = family.data.findIndex((value) => {
      return value.id === id;
    });
    setConfirmMemberId(memberId);
    setConfirmMemberStatus(family.data[memberId].confirmed);
    setConfirmPopupShow(true);
  }

  async function handleConfirm() {
    setError("");

    const memberId = confirmMemberId;

    const { data } = await axios.put("/api/presence/confirm", {
      email: family.data[memberId].email,
      confirmed: !family.data[memberId].confirmed,
    });

    if (data.ok) {
      const newFamily: Family = {
        data: family.data.map((f, i) => {
          if (i === memberId) {
            return {
              ...f,
              confirmed: !f.confirmed,
            };
          }
          return f;
        }),
      };
      updateFamily(newFamily);
      setConfirmPopupShow(false);
    } else {
      setError(data.error);
      setConfirmPopupShow(false);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding10}>
        <BackButton text="Voltar" />
        <PageTitle>Confirmar Presença</PageTitle>
        <p>Clique no nome para confirmar ou remover confirmação.</p>

        {error && <ErrorMessage message={error} />}

        {family &&
          family.data &&
          family.data.map((member) => {
            return (
              <Button
                key={member.id}
                icon={member.confirmed ? "/icons/check.svg" : ""}
                w={24}
                h={24}
                text={member.name}
                bgColor={member.confirmed ? "#A27EAE" : "#BAABBF"}
                onClick={() => onConfirmClick(member.id)}
              />
            );
          })}

        {confirmPopupShow && (
          <section className={styles.confirmPopupContainer}>
            <div className={styles.popup}>
              {confirmMemberStatus ? (
                <Image
                  src="/icons/user-x.svg"
                  alt="Desconfirmar"
                  width={36}
                  height={36}
                />
              ) : (
                <Image
                  src="/icons/user-check.svg"
                  alt="Confirmar"
                  width={36}
                  height={36}
                />
              )}
              <h3>{confirmMemberStatus ? `Cancelar presença` : `Confirmar`}</h3>
              <p>
                Você realmente deseja{" "}
                {confirmMemberStatus
                  ? `cancelar a presença`
                  : `confirmar a presença`}{" "}
                de:
              </p>
              <p>
                <strong>{family.data[confirmMemberId].name}</strong>
              </p>
              <div>
                <button
                  className={styles.no}
                  onClick={() => setConfirmPopupShow(false)}
                >
                  Não,{" "}
                  {confirmMemberStatus ? "manter a presença" : "não confirmar"}
                </button>
                <button className={styles.yes} onClick={handleConfirm}>
                  Sim,{" "}
                  {confirmMemberStatus
                    ? "cancelar presença"
                    : "confirmar presença"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ConfirmarPresenca;
