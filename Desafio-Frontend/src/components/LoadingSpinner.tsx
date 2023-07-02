
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className="container">
      <div className={styles.loading}></div>
    </div>
  );
};

export default LoadingSpinner;
