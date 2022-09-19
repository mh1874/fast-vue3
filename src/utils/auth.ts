const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';
const TokenPrefix = 'Bearer ';

const isLogin = () => {
  return !!localStorage.getItem(accessTokenKey);
};
const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
};
const getRefreshToken = () => {
  return localStorage.getItem(refreshTokenKey);
};
const setAccessToken = (token: string) => {
  localStorage.setItem(accessTokenKey, token);
};
const setRefreshToken = (token: string) => {
  localStorage.setItem(refreshTokenKey, token);
};
const clearToken = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
};
export { TokenPrefix, isLogin, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearToken };
