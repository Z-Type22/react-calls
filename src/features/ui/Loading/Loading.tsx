import styles from "./loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}
