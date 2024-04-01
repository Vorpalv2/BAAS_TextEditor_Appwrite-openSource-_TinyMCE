/* eslint-disable */
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteUrlProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppWrite Service Error :: getCurrentUser error : ", error);
    }
    return null;
  }

  // async getAllUsers(userid) {
  //   try {
  //     const value = await this.account.get(userid);
  //     console.log(value);
  //     return value;
  //   } catch (error) {
  //     console.log("AppWrite Service Error :: getError error : ", error);
  //   }
  // }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWrite Service Error :: Logout error : ", error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
