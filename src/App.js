import { useState } from "react"; // Імпортуємо хук useState для керування станом
import Cart from "./components/Cart/Cart"; // Імпортуємо компонент Cart
import Header from "./components/Layout/Header"; // Імпортуємо компонент Header
import Meals from "./components/Meals/Meals"; // Імпортуємо компонент Meals
import CartProvider from "./store/CartProvider"; // Імпортуємо провайдер контексту CartProvider

function App() {
    const [cartIsShown, setCartIsShown] = useState(false); // Визначаємо стан cartIsShown, який зберігає чи відображається кошик

    const showCartHandler = () => {
        setCartIsShown(true); // Функція для відображення кошика
    };

    const hideCartHandler = () => {
        setCartIsShown(false); // Функція для приховування кошика
    };

    return (
        // Всі компоненти обгорнуті в CartProvider для доступу до контексту кошика
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />} 
            {/* Відображаємо компонент Cart, якщо cartIsShown true, і передаємо функцію закриття як пропс */}
            <Header onShowCart={showCartHandler} />
            {/* Відображаємо компонент Header і передаємо функцію відкриття кошика як пропс */}
            <main>
                <Meals />
                {/* Відображаємо компонент Meals */}
            </main>
        </CartProvider>
    );
}

export default App; // Експортуємо компонент App за замовчуванням
