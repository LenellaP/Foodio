import { useRef, useState } from "react"; // Імпортуємо useRef та useState з React
import classes from "./Checkout.module.css"; // Імпортуємо стилі

const isEmpty = (value) => value.trim() === ""; // Перевірка на порожність значення
const isNot5Char = (value) => value.trim().length !== 5; // Перевірка на довжину значення

const Checkout = (props) => {
  // Визначаємо стан для перевірки валідності введених значень
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  // Використовуємо рефи для зберігання посилань на DOM елементи
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // Отримуємо значення з інпутів
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // Перевіряємо валідність значень
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isNot5Char(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    // Оновлюємо стан валідності
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredPostalCodeIsValid,
      postalCode: enteredCityIsValid,
    });

    // Перевіряємо чи форма є валідною
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    // Передаємо дані форми батьківському компоненту
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  // CSS класи для інпутів
  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Ваше ПІБ</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Введіть валідні дані!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Вулиця</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Введіть валідні дані!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Поштовий номер</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Введіть валідні дані! (5 символів мінімум)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Місто</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Введіть валідні дані!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Скасувати
        </button>
        <button className={classes.submit}>Замовити</button>
      </div>
    </form>
  );
};

export default Checkout;
