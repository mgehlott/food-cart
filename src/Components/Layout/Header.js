import styles from "./Header.module.css";
import HeaderImg from "../../assets/img/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onShow }) => {

    return <>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={onShow} />
        </header>
        <div className={styles['main-img']}>
            <img src={HeaderImg} alt="Table of food" />
        </div>
    </>
}

export default Header;