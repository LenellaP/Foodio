import ReactDOM from 'react-dom'; // Імпортуємо ReactDOM для рендерингу компонентів React в DOM

import './index.css'; // Імпортуємо файл стилів для застосування глобальних CSS стилів
import App from './App'; // Імпортуємо головний компонент додатка

// Використовуємо метод render з ReactDOM для рендерингу компонента App в DOM елемент з id 'root'
ReactDOM.render(<App />, document.getElementById('root'));
