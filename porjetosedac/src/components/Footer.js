import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <h3>Escreva mensagens importantes para Sedac!</h3>
        <p>Projeto Sedac &copy; 2023</p>
    </footer>
  );
};

export default Footer;