import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../constants/paths';

export const Works = (): JSX.Element => {
  const { user } = useAuthContext();

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return <div>Works</div>;
}