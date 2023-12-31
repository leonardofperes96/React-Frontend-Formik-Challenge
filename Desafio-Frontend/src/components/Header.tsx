
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Desafio 5Labs
      </Link>
    </header>
  );
};

export default Header;
