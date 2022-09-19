import styles from "./styles.module.scss";

type ErrorData = {
  message: string;
};

export function SuccessMessage({ message }: ErrorData) {
  return <div className={styles.container}>{message}</div>;
}
