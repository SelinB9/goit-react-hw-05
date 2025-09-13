import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
    return (
        <nav className={styles.navBar}>
        <NavLink to="/"  >Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        </nav>
    );
};
    
export default Navigation;