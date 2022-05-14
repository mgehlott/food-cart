
import React from "react";

const CartContex = React.createContext({
    items: [],
    totalAmoutn: '',
    addItem: (item) => { },
    removeItem: (id) => { }
});
export default CartContex;