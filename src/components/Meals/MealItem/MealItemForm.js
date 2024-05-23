import { useRef, useState } from "react"; // Імпортуємо необхідні хуки
import Input from "../../UI/Input"; // Імпортуємо компонент введення
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsvalid, setAmountIsValid] = useState(true); // Стан для перевірки правильності введеної кількості
    const amountInputRef = useRef(); // Реф для отримання значення введеної кількості

    const submitHandler = (event) => {
        event.preventDefault(); // Зупиняємо стандартну подію форми

        const enteredAmount = amountInputRef.current.value; // Отримуємо введене значення кількості
        const enteredAmountNumber = +enteredAmount; // Перетворюємо введене значення в число

        // Перевіряємо чи введена кількість валідна (в межах від 1 до 5)
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false); // Встановлюємо стан невалідної кількості
            return;
        }
        props.onAddToCart(enteredAmountNumber); // Викликаємо колбек-функцію onAddToCart із введеною кількістю
    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef} // Передаємо реф для введення кількості
                label="Кількість"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Додати</button>
            {!amountIsvalid && <p>Введіть валідну кількість (1-5)</p>} {/* Відображаємо повідомлення про невалідну кількість */}
        </form>
    );
};

export default MealItemForm;
