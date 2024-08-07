import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/ingredients';

import { checkLogin } from '../../services/user';
import { ProtectedRoutes } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const closeModal = (): void => {
    // закрываем модальное окно и возвращаемся обратно
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkLogin());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoutes guest>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoutes guest>
              <Register />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoutes guest>
              <ForgotPassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoutes guest>
              <ResetPassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoutes>
              <ProfileOrders />
            </ProtectedRoutes>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
