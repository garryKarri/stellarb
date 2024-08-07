import { Preloader } from '@ui';
import { Navigate } from 'react-router';
import { useSelector } from '../../services/store';
import { selectIsChecked, selectIsLogin } from '../../services/user';
import { useLocation } from 'react-router-dom';

type TProtectedRoutesProps = {
  children: React.ReactElement;
  guest?: boolean;
};

export const ProtectedRoutes = ({ children, guest }: TProtectedRoutesProps) => {
  const isUserLogin = useSelector(selectIsLogin);
  const isAuthChecked = useSelector(selectIsChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!guest && !isUserLogin) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  if (guest && isUserLogin) {
    console.log(location.state?.from);
    return <Navigate to={'/'} />;
  }

  return children;
};
