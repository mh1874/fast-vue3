// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';
import { UserState } from '/@/store/modules/user/types';
// import axios from 'axios';
enum URL {
  login = '/user/login',
  logout = '/user/logout',
  profile = '/user/profile',
}
interface LoginRes {
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export const getUserProfile = async () => get<UserState>({ url: URL.profile });
export const login = async (data: LoginData) => post<any>({ url: URL.login, data });
export const logout = async () => post<LoginRes>({ url: URL.logout });
export default { getUserProfile, logout, login };
