import styles from "./Modal.module.css";
import ReactDom from 'react-dom';

const Backdrop = ({ onClick }) => {
    return <div className={styles.backdrop} onClick={onClick}></div>
}

const ModalOverlay = ({ children }) => {
    return <div className={styles['modal-overlay']}>{children}</div>
}

const elePos = document.getElementById('overlay');

const Modal = ({ children, onClose }) => {

    return <>
        {ReactDom.createPortal(<Backdrop onClick={onClose} />, elePos)}
        {ReactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, elePos)}
    </>
}

export default Modal;