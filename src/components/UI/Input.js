import React from "react";  // Імпортуємо React

import classes from "./Input.module.css";  // Імпортуємо стилі для введення

// Компонент введення
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;
