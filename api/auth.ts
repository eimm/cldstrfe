import axios from "@/foundation/axios";
import {
  LoginFormDTO,
  LoginResDTO,
  RegFormDTO,
  RegResDTO,
  User,
} from "./dto/auth.dto";
import { destroyCookie } from "nookies";

export const login = async (values: LoginFormDTO): Promise<LoginResDTO> => {
  return (await axios.post("/auth/login", values)).data;
};

export const register = async (values: RegFormDTO): Promise<RegResDTO> => {
  return (await axios.post("/auth/register", values)).data;
};

export const getMe = async (): Promise<User> => {
  return (await axios.get("/users/me")).data;
};

export const logout = () => {
  destroyCookie(null, "_token", { path: "/" });
};
