import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = ({ onCancle, onConform }) => {

    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const pincodeRef = useRef();
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        pincode: true,
        city: true
    });

    const isEmpty = (value) => value.trim() === '';
    const isSixChar = (value) => value.trim().length === 6;


    const conformHandler = (event) => {
        event.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPinCode = pincodeRef.current.value;
        const enteredCity = cityRef.current.value;

        const isEnteredNameValid = !isEmpty(enteredName);
        const isEnteredStreetValid = !isEmpty(enteredStreet);
        const isEnteredCityValid = !isEmpty(enteredCity);
        const isPinCodeIsValid = isSixChar(enteredPinCode);

        const isFormValid = isEnteredNameValid && isEnteredStreetValid && isEnteredCityValid && isPinCodeIsValid;

        setFormInputValidity({
            name: isEnteredNameValid,
            street: isEnteredStreetValid,
            city: isEnteredCityValid,
            pincode: isPinCodeIsValid
        });

        if (!isFormValid) {


            return;
        }
        //submit form
        onConform({
            name: enteredName,
            street: enteredStreet,
            pincode: enteredPinCode,
            city: enteredCity
        });

    }

    const nameClasses = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`;
    const streetClasses = `${styles.control} ${formInputValidity.street ? '' : styles.invalid}`;
    const pinCodeClasses = `${styles.control} ${formInputValidity.pincode ? '' : styles.invalid}`;
    const cityClasses = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`;


    return <form className={styles.form} onSubmit={conformHandler}>

        <div className={nameClasses}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id="name" ref={nameRef} />
            {!formInputValidity.name && <p>Please Enter a valid name</p>}
        </div>
        <div className={streetClasses}>
            <label htmlFor="street">Street</label>
            <input type='text' id="street" ref={streetRef} />
            {!formInputValidity.street && <p>Please Enter a valid street</p>}
        </div>
        <div className={pinCodeClasses}>
            <label htmlFor="pincode">Pin Code</label>
            <input type='text' id="pincode" ref={pincodeRef} />
            {!formInputValidity.pincode && <p>Please Enter a valid pincode(6 character long)</p>}
        </div>
        <div className={cityClasses}>
            <label htmlFor="city">City</label>
            <input type='text' id="city" ref={cityRef} />
            {!formInputValidity.city && <p>Please Enter a valid city</p>}
        </div>

        <div className={styles.actions}>
            <button type="button" onClick={onCancle}>Cancle</button>
            <button className={styles.submit}>Conform</button>
        </div>

    </form>

}

export default Checkout;