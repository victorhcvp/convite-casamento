import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

type BackButtonProps = {
  text: string;
  href?: string;
};

export function BackButton({ text, href = "/inicio" }: BackButtonProps) {
  const router = useRouter();

  return (
    <div className={styles.container} onClick={() => router.push(href)}>
      <Image
        src="/icons/chevron-left.svg"
        width="16"
        height="16"
        alt="Voltar"
      />
      {text}
    </div>
  );
}
