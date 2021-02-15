import { useLocalStorage } from 'react-use';
import { AuthJWT } from '../../types/auth';
import jwtDecode from 'jwt-decode';

const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'abe-auth-token';

export function getAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
}

export function useUserInfo() {
  const [userTokenValue, setUserTokenValue, removeUserTokenValue] = useLocalStorage(AUTH_TOKEN_LOCAL_STORAGE_KEY, '');
  let user: AuthJWT['user'];
  if (userTokenValue) {
    try {
      const token: AuthJWT = jwtDecode(userTokenValue);
      user = token.user;
    } catch (e) {
      console.error('Could not decode JWT:')
      console.error(e);
    }
  }

  return {
    login: (jwt: string) => setUserTokenValue(jwt),
    logout: removeUserTokenValue,
    user,
  }
}
