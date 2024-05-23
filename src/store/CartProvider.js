import { useReducer } from "react";  // Імпортуємо необхідний хук
import CartContext from "./Cart-Context";  // Імпортуємо контекст кошика

// Початковий стан кошика
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Редуктор для управління станом кошика
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
        // Додавання товару до кошика
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
      // Видалення товару з кошика
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {

    // Очищення кошика
    return defaultCartState;
  }

  return defaultCartState;
};

// Компонент CartProvider для управління станом кошика
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // Функція для додавання товару до кошика
  const addItemToCardHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  // Функція для видалення товару з кошика
  const removeItemFromCardHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // Функція для очищення кошика
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  // Контекст кошика
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    additem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
