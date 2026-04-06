import styles from "./loading.module.css";

type LoadingProps = {
  minHeight?: string;
};

export const Loading: React.FC<LoadingProps> = ({
  minHeight = "60vh",
}) => {
  return (
    <div
      className={styles.loader_wrapper}
      style={{ minHeight }}
    >
      <div className={styles.loader}></div>
    </div>
  );
};
