import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '../../components/ui/preloader';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  selectUserOrders,
  selectHistoryLoading
} from '../../services/userHistory';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(selectUserOrders);

  const isHistoryLoading = useSelector(selectHistoryLoading);

  if (isHistoryLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
