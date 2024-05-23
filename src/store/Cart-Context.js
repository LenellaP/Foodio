import React from "react";

// Створюємо контекст кошика за допомогою методу createContext
const CartContext = React.createContext({
  items: [], // Список товарів в кошику
  totalAmount: 0,  // Загальна сума кошика 
  additem: (item) => {},  // Функція для додавання товару до кошика
  removeItem: (id) => {},   // Функція для видалення товару з кошика
  clearCart: () => {},
});

export default CartContext;
