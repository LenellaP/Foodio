import { Fragment, useContext, useState } from "react"; // Імпортуємо Fragment, useContext, та useState з React
import CartContext from "../../store/Cart-Context"; // Імпортуємо контекст кошика
import Modal from "../UI/Modal"; // Імпортуємо компонент Modal
import classes from "./Cart.module.css"; // Імпортуємо стилі
import CartItem from "./CartItem"; // Імпортуємо компонент CartItem
import Checkout from "./Checkout"; // Імпортуємо компонент Checkout

const Cart = (props) => {
  // Визначаємо стан для перевірки чи є процес оформлення замовлення
  const [isCheckout, setCheckout] = useState(false); 

  // Визначаємо стан для перевірки чи є процес відправки замовлення
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Визначаємо стан для перевірки чи замовлення було відправлене
  const [submitted, setSubmitted] = useState(false); 

  // Використовуємо контекст кошика
  const cartContext = useContext(CartContext); 

  // Форматуємо загальну суму
  const totalAmount = `₴${cartContext.totalAmount.toFixed(2)}`; 

  // Перевіряємо чи є товари в кошику
  const hasItems = cartContext.items.length > 0; 

  // Обробник видалення товару з кошика
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  // Обробник додавання товару до кошика
  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };

  // Обробник натискання кнопки замовлення
  const orderHandler = () => {
    setCheckout(true);
  };

  // Обробник відправки замовлення
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://orders-9f9bd-default-rtdb.firebaseio.com/",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setSubmitted(true);
    cartContext.clearCart();
  };

  // Генерація списку товарів в кошику
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item, id) => (
        <CartItem
          key={id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // Кнопки дій в модальному вікні
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Закрити
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Замовити
        </button>
      )}
    </div>
  );

  // Контент модального вікна кошика
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Сума:</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  // Контент модального вікна при відправці замовлення
  const isSubmittingModalContent = <p>Обробка замовлення...</p>;

  // Контент модального вікна після успішної відправки замовлення
  const submittedModalContent = (
    <Fragment>
      <p>Замовлення успішно відправлено!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Закрити
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && submitted && submittedModalContent}
    </Modal>
  );
};

export default Cart;
