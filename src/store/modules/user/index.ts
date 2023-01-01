import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout, getUserProfile, LoginData } from '/@/api/user/index';
import { setAccessToken, setRefreshToken, clearToken } from '/@/utils/auth';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_name: undefined,
    avatar: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    profileBio: undefined,
    devLanguages: undefined,
    role: '',
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'user' : 'admin';
        resolve(this.role);
      });
    },
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    async login(loginForm: LoginData) {
      const result = await userLogin(loginForm);
      if (result?.data.access_token) {
        setAccessToken(result?.data.access_token);
        setRefreshToken(result?.data.refresh_token);
      }
      return result;
    },
    // 静态判断登录
    mockLogin(loginForm: LoginData) {
      const response = {
        code: 1,
        data: {
          access_token: 'test access token',
          refresh_token: 'test refresh token',
        },
        msg: '',
      };
      const { username, password } = toRaw(loginForm);
      if (username === 'liurudong' && password === 'liurudong888') {
        response.code = 1;
        response.msg = '登录成功';
      } else {
        response.code = 2;
        response.msg = '账号密码错误';
      }
      setAccessToken(response?.data.access_token);
      setRefreshToken(response?.data.refresh_token);
      return new Promise((resolve) => {
        resolve(response);
      });
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      // location.reload();
    },
  },
});
