import styles from "./Footer.module.css";

//image
import image from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <h3>Escreva mensagens importantes para Sedac!</h3>
        <p>Projeto Sedac &copy; 2023</p>
        <img src={image} alt="logo-camara" />
    </footer>
  );
};

export default Footer;