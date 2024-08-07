import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  resetOrder,
  selectOrderIsLoading,
  selectOrderBurger,
  createOrderBurger
} from '../../services/orderBurger';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetConstructor,
  selectChoosingBun,
  selectChoosingIngredients
} from '../../services/ingredientsConstructor';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/user';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const selectedBun = useSelector(selectChoosingBun);
  const selectedIngredients = useSelector(selectChoosingIngredients);
  const user = useSelector(selectUser);
  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedIngredients
  };
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrderBurger);
  console.log({ orderModalData });

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigator('/login');
      return;
    }
    const ingredientsIds = constructorItems.ingredients.map(
      (item: TConstructorIngredient) => item._id
    );

    dispatch(
      createOrderBurger([...ingredientsIds, constructorItems.bun._id])
    ).then(() => {
      dispatch(resetConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(resetOrder()); //сброс заказа
    navigator('/'); // переход на главную страницу
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
