import React, { Fragment } from "react"; // Імпортуємо React та Fragment
import HeaderCartButton from "./HeaderCartButton"; // Імпортуємо компонент HeaderCartButton
import mealsImg from "../../assets/meals.jpg"; // Імпортуємо зображення
import classes from "./Header.module.css"; // Імпортуємо стилі

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Foodio</h1>
        <HeaderCartButton onClick={props.onShowCart} /> {/* Кнопка для показу кошика */}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of delicious food!" /> {/* Зображення їжі */}
      </div>
    </Fragment>
  );
};

export default Header;
