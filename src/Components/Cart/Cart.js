import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartContex from "../../store/cart-contex";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = ({ onClose }) => {

    const cartCtx = useContext(CartContex);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitted, setDidSubmitted] = useState(false);

    const removeItemHandler = (id) => {
        const index = cartCtx.items.findIndex(i => i.id === id);
        if (cartCtx.items[index].amount < 1)
            return;
        cartCtx.removeItem(id);
    };
    const addItemHandler = (item) => {
        cartCtx.addItem(item);
    };

    const onOrderSubmitHandler = (data) => {
        setIsSubmitting(true);
        fetch('https://meals-17be2-default-rtdb.firebaseio.com/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: data,
                    order: cartCtx.items
                })
            }
        );
        setIsSubmitting(false);
        setDidSubmitted(true);
    }

    const totalAmountt = `$${cartCtx.totalAmount}`;

    const isCartEmpty = cartCtx.items.length === 0;

    console.log(cartCtx.items);
    console.log(cartCtx.totalAmoutn);
    const orderHandler = () => {
        setIsCheckout(true);
    }
    const modalActions = (
        <div className={styles.action}>
            <button className={styles['close-btn']} onClick={onClose}>Close</button>
            {!isCartEmpty && <button className={styles['order-btn']} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = <>
        <ul className={styles['cart-itmes']}>
            {cartCtx.items.map((i) => {
                return <CartItem
                    key={i.id}
                    name={i.name}
                    price={i.price}
                    amount={i.amount}
                    onRemove={removeItemHandler.bind(null, i.id)}
                    onAdd={addItemHandler.bind(null, i)}
                />
            })}</ul>
        <div className={styles.total}>
            <span>Totol Amount</span>
            <span>{totalAmountt}</span>
        </div>
        {isCheckout && <Checkout onConform={onOrderSubmitHandler} onCancle={onClose} />}
        {!isCheckout && modalActions}
    </>

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmiteModalContent = <><p>Succesfully send order!!!</p>
        <div className={styles.action}>
            <button className={styles['close-btn']} onClick={onClose}>Close</button>

        </div>
    </>

    return (
        <Modal onClose={onClose}>

            {!isSubmitting && !didSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmitted && didSubmiteModalContent}

        </Modal>
    )

}

export default Cart;