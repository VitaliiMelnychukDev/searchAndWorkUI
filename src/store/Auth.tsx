import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { apiAuthPath, apiGeneralPath } from '../constants/apiPaths';
import { TokenHelper } from '../helpers/TokenHelper';
import searchAndWorkClient from '../clients/searchAndWork';
import { LoginResponse, User } from '../types/User';
import { Loader } from '../components/Loader/Loader';


type LoadingStatus = {
  loading: boolean;
  error?: string
}

type AuthContextType = {
  user: User | null;
  initialLoading: boolean,
  loadingStatus: LoadingStatus,
  login: (email: string, password: string) => Promise<void>;
  logout:  () => Promise<void>;
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>({ loading: false });

  const login = async (email: string, password: string): Promise<void> => {
    setLoadingStatus({ loading: true });
    try {
      const loginResponse:LoginResponse = await searchAndWorkClient.post(apiAuthPath.login, {
        email,
        password
      });

      setUser(loginResponse.user);
      TokenHelper.saveTokens(loginResponse.accessToken, loginResponse.refreshToken);
      setLoadingStatus({loading: false});
    } catch (e: any) {
      setLoadingStatus({loading: false, error: e.message});
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await searchAndWorkClient.post(apiAuthPath.logout, {
        refreshToken: TokenHelper.getRefreshToken()
      });

      clearUserData();
    } catch {
      clearUserData();
    }
  }

  const clearUserData = () => {
    TokenHelper.clearTokens();
    setUser(null);
  }

  const setAccount = async (): Promise<void> => {
    try {
      const user: User = await searchAndWorkClient.get(apiGeneralPath.account);
      setUser(user);
      setInitialLoading(false);
    } catch {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    const accessToken = TokenHelper.getAccessToken();

    if (!accessToken) {
      setInitialLoading(false);
      return;
    }

    setAccount();
  }, []);

  return {
    user, initialLoading, loadingStatus, login, logout
  }
}

const AuthContext = React.createContext<AuthContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: Props) => {
  const { user, initialLoading, loadingStatus, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, initialLoading, loadingStatus, login, logout }}>
      {initialLoading && <Loader />}
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

const useAuthContext = (): AuthContextType => {
  const currentUser = useContext(AuthContext);

  if (!currentUser) {
    throw new Error(
      "useCurrentUser has to be used within <AuthContext.Provider>"
    );
  }

  return currentUser;
}

export default useAuthContext;