import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectFeedOrders,
  selectFeedIsLoading,
  getFeedsAll
} from '../../services/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isFeedLoading = useSelector(selectFeedIsLoading);
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(getFeedsAll());
  };

  useEffect(() => {
    dispatch(getFeedsAll());
  }, []);

  if (!orders.length || isFeedLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
