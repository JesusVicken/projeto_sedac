//navlink 
import { NavLink } from "react-router-dom";
//image
import image from '../assets/logo.png'
//hooks
import { useAuthentication } from "../hooks/useAuthentication";
//context
import { useAuthValue } from "../context/AuthContext";

//css
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            Sisca <span>nellas</span>
        </NavLink>

        <div>
            <img src={image} alt="logo-camara" />
        </div>
        
        <ul className={styles.links_list}>
            <li>
                <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
            </li>
            {!user && (
                <>
                    <li>
                        <NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : "")}>Entrar</NavLink>
                    </li>
                    <li>
                        <NavLink to='/register' className={({ isActive }) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
                    </li>
                </>
            )}
            {user && (
                <>
                    <li>
                        <NavLink to='/posts/create' className={({ isActive }) => (isActive ? styles.active : "")}>Novo Post</NavLink>
                    </li>
                    <li>
                        <NavLink to='/Dashboard' className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</NavLink>
                    </li>
                </>

            )}
            <li>
                <NavLink to='/about' className={({ isActive }) => (isActive ? styles.active : "")}>Sobre</NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout}>
                        Sair
                    </button>
                </li>
            )}
        </ul>
    </nav>;

}

export default Navbar