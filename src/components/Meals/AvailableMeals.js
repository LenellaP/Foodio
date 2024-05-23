import { useState, useEffect } from "react"; // Імпортуємо необхідні хуки
import Card from "../UI/Card";  // Імпортуємо компонент картки
import classes from "./AvailableMeals.module.css";  // Імпортуємо стилі для доступних страв
 
import DUMMY_MEALS from "./dummy-meals"; // Імпортуємо фейкові дані про страви
import MealItem from "./MealItem/MealItem"; // Імпортуємо компоненти страви

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);   // Стан для зберігання списку страв
  const [isLoading, setLoading] = useState(true);  // Стан для відображення індикатора завантаження
  const [httpErrror, setHttpError] = useState();  // Стан для зберігання помилки HTTP

  console.log(meals)

  useEffect(() => {
    const fetchMeals = async () => {
      const responce = await fetch(
        "https://food-fc671-default-rtdb.firebaseio.com/meals.json"
      );

      const data = await responce.json();

      console.log(data);

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((err) => {
      setLoading(false);
      setHttpError(err.message);
    });
  }, []);

    // Перевірка наявності індикатора завантаження
  if (isLoading) {
    return (
      <section className={classes.mealsloading}>
        <p>Loading...</p>
      </section>
    );
  }

   // Перевірка наявності помилки HTTP
  if (httpErrror) {
    return (
      <section className={classes.mealserror}>
        <p>{httpErrror}</p>
      </section>
    );
  }

  // Створення списку страв
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
