import { axiosInstance, userAuthStore } from '../api';
import { AuthApiEndPoint } from './apiEndPoint';

export const login = async (email, password) => {
  try {
    const { data } = await axiosInstance.post(AuthApiEndPoint.LOGIN, { email, password });
    userAuthStore.getState().setAuth(data.user);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message ?? 'Login failed';
  }
};

export const register = async (email, password, name, role = 'user') => {
  try {
    const { data } = await axiosInstance.post(AuthApiEndPoint.REGISTER, { email, password, name, role });
    userAuthStore.getState().setAuth(data.user);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message ?? 'Registration failed';
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post(AuthApiEndPoint.LOGOUT);
  } catch (error) {
    console.log(error);
  } finally {
    userAuthStore.getState().clearAuth();
  }
};

export const checkUser = async () => {
  userAuthStore.getState().setCheckingAuth(true);
  try {
    const { data } = await axiosInstance.post(AuthApiEndPoint.CHECK);
    userAuthStore.getState().setAuth(data.user);
    return data;
  } catch (error) {
    console.log(error);
    userAuthStore.getState().clearAuth();
    return null;
  }
};
