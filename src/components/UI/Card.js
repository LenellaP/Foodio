import classes from "./Card.module.css";

// Компонент картки
const Card = (props) => {
    return <div className={classes.card}>{props.children}</div>; // Повертаємо div з класом card, який містить дітей
};

export default Card;
