import { useContext, useEffect, useState } from "react"; // Імпортуємо useContext, useEffect, та useState з React
import CartContext from "../../store/Cart-Context"; // Імпортуємо контекст кошика
import classes from "./HeaderCartButton.module.css"; // Імпортуємо стилі

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false); // Стан для підсвітки кнопки
  const cartContext = useContext(CartContext); // Використовуємо контекст кошика
  const { items } = cartContext; // Витягуємо товари з контексту

  // Рахуємо загальну кількість товарів в кошику
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // Класи для кнопки, включаючи підсвітку
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true); // Вмикаємо підсвітку кнопки

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false); // Вимикаємо підсвітку після 300 мс
    }, 300);

    return () => {
      clearTimeout(timer); // Очищуємо таймер при анмаунті
    };
  }, [items]); // Виконуємо ефект при зміні товарів в кошику

  return (
    <button className={btnClasses} onClick={props.onClick}> {/* Викликаємо onClick з пропсів */}
      <span className={classes.icon}>
        <i className="fas fa-shopping-cart"></i> {/* Іконка кошика */}
      </span>
      <span>Кошик</span>
      <span className={classes.badge}>{numberOfCartItems}</span> {/* Кількість товарів */}
    </button>
  );
};

export default HeaderCartButton;
