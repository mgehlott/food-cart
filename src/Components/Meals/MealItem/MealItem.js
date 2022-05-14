import Input from "../../UI/Input/Input";
import styles from "./MealItem.module.css";
import { useContext, useRef, useState } from 'react';
import CartContex, { CartContext } from '../../../store/cart-contex';


const MealItem = (props) => {

    const price = `$${props.price}`;
    const inputRef = useRef();
    const cartCtx = useContext(CartContex);
    const [isAmountValid, setIsAmountValid] = useState(true);


    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber <= 0 || enteredAmountNumber > 5) {
            setIsAmountValid(false);
            return;
        }
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: enteredAmountNumber
        });

    }

    return <li className={styles.meal}>
        <div >
            <h2>{props.name}</h2>
            <div className={styles.disc}>{props.disc}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <form className={styles['input-div']} onSubmit={submitHandler}>
            <Input
                ref={inputRef}
                label='amount'
                input={

                    {
                        id: "amount_" + props.id,
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1'
                    }} />
            <button className={styles.btn}>+ Add</button>
            {!isAmountValid && <p>Please enter a valid amount!!!</p>}
        </form>

    </li>

}

export default MealItem;