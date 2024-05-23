import { Fragment } from "react";
import reactDom from "react-dom";  // Імпортуємо бібліотеку react-dom для порталів
import classes from "./Modal.module.css";

// Компонент для темної підкладки
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

// Компонент для модального вікна
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Встановлюємо місце для рендерингу порталу
const portalElement = document.getElementById("overlays");

// Основний компонент модального вікна, використовуємо портал для рендерингу компонента Backdrop та компонента ModalOverlay
const Modal = (props) => {
  return (
    <Fragment> 
      {reactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
