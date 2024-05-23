import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Foodio - доставимо смачну їжу вам додому!</h2>
      <p>
        Оберіть страву, якою б ви хотіли поласувати 
        і чекайте, доки наш кур'єр доставить її прямо вам в руки!
      </p>
      <p>
        Всі наші страви готуються одразу після замовлення, а найважлтвіше - 
        готують їх справжні МАЙСТРИ своєї справи!
      </p>
    </section>
  );
};

export default MealsSummary;
