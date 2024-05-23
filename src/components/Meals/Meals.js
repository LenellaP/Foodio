import { Fragment } from "react"; // Імпортуємо Fragment
import MealsSummary from "./MealsSummary"; // Імпортуємо компонент підсумків страв
import AvailableMeals from "./AvailableMeals"; // Імпортуємо компонент доступних страв

// Головний компонент Meals, який відображає підсумки страв та доступні страви
const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>
    );
};

export default Meals;
