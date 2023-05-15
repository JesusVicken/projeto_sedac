//CSS
import styles from './About.module.css';

import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                Sobre o projeto da <span>Sedac</span>
            </h2>
            <p>
                Este projeto foi criado para adequar e melhor visualizar as informações para a Sedac. Visando melhorar a visualização das demandas e recados importantes vindo dos chefes.
                O projeto foi construído com React no front-end e Firebase no back-end.
            </p>
            <Link to="/posts/create" className='btn'>
                Criar Post
            </Link>
        </div>

    );
};

export default About;