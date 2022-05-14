import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import styles from "./App.module.css";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";



function App() {

  const [isCartShown, setIsCartShown] = useState(false);

  const cartOpenHandler = () => {
    setIsCartShown(true);
  }

  const cartCloseHandler = () => {
    setIsCartShown(false);
  }

  return (
    <CartProvider>
      <main className={styles.main}>
        {isCartShown && <Cart onClose={cartCloseHandler} />}
        <Header onShow={cartOpenHandler} />
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
