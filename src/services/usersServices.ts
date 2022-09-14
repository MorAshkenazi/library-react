import axios from "axios";
import { User } from "../interfaces/User";

const api: string = process.env.REACT_APP_API || "";

// add new user
export const register = (newUser: User): Promise<User> => {
  return axios.post(`${api}users`, newUser);
};

// check existing user for login
export const findUser = (user: User): Promise<any> => {
  return axios.get(`${api}users?email=${user.email}`);
};
