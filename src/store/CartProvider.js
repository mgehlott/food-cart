import { useReducer } from "react";
import CartContex from "./cart-contex";


const INITIAL_CART = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    switch (action.type) {
        case 'ADD': {
            // const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
            const isExist = state.items.findIndex((i) => {
                return i.id === action.item.id;
            });

            let updatedItems;
            if (state.items[isExist]) {
                let updateItem = state.items[isExist];
                updateItem = {
                    ...updateItem,
                    amount: updateItem.amount + 1
                }
                updatedItems = [...state.items];
                updatedItems[isExist] = updateItem;
            }
            else {
                updatedItems = state.items.concat(action.item);
            }



            //  updatedItems.push(action.item);
            const updatedTotalAmount = updatedItems.reduce((pre, curr) => {
                return pre + curr.amount * curr.price;
            }, 0)
            console.log('total' + updatedTotalAmount);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        }
            break;

        case 'REMOVE': {
            let index = state.items.findIndex(i => i.id === action.id);
            let updatedItems = [...state.items];
            const itemAtIntex = updatedItems[index];
            if (itemAtIntex.amount === 1) {
                updatedItems = updatedItems.filter((i) => {
                    return action.id !== i.id;
                });
            }
            else {
                updatedItems[index] = {
                    ...itemAtIntex,
                    amount: updatedItems[index].amount - 1
                };
            }

            const totalAmountt = updatedItems.reduce((pre, currItem) => {
                return pre + currItem.amount * currItem.price;
            }, 0);
            return {
                items: updatedItems,
                totalAmount: totalAmountt
            }

        };
            break;
        default: return state;
    }
}


const CartProvider = ({ children }) => {


    const [cartState, dispatchCartAction] = useReducer(cartReducer, INITIAL_CART);

    const addItem = (item) => { dispatchCartAction({ type: 'ADD', item: item }) };
    const removeItem = (id) => { dispatchCartAction({ type: 'REMOVE', id: id }) };

    const cartContex = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItem,
        removeItem: removeItem
    }

    return <CartContex.Provider value={cartContex}>
        {children}
    </CartContex.Provider>

}

export default CartProvider;