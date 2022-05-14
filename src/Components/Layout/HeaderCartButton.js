import styles from "./HeaderCartButton.module.css";
import { FaShoppingCart } from 'react-icons/fa';
import { useContext, useEffect, useState } from "react";
import CartContex from "../../store/cart-contex";

const HeaderCartButton = ({ onClick }) => {

    const [isButtonAnimated, setIsButtonAnimated] = useState(false);
    const cartCtx = useContext(CartContex);
    const { items } = cartCtx;
    const numberOfitem = cartCtx.items.reduce((currNum, item) => {
        return currNum + item.amount;
    }, 0)

    const classess = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0)
            return;
        setIsButtonAnimated(true)
        const timer = setTimeout(() => {
            setIsButtonAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return <button className={classess} onClick={onClick}>

        <span className={styles.icon}><FaShoppingCart /></span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfitem}</span>
    </button>

}

export default HeaderCartButton;