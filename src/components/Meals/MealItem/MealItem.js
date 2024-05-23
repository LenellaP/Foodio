import { useContext } from "react";
import CartContext from "../../../store/Cart-Context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const cartContext = useContext(CartContext);  // Отримуємо доступ до контексту кошика
    const price = `₴${props.price.toFixed(2)}`;  // Форматуємо ціну до двох знаків після коми

    // Функція для додавання страви в кошик
    const addToCartHandler = (amount) => {
        cartContext.additem({  // Викликаємо метод additem з контексту кошика, передаючи дані про страву
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <MealItemForm onAddToCart={addToCartHandler} />
        </li>
    );
};

export default MealItem;
