/* eslint-disable */
import { Client, Account, ID } from "appwrite";
import config from "../../config/config";

class AuthHandler {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteUrlProjectId);
    this.account = new Account(this.client);
  }

  async createNewUser(username, password, email) {
    try {
      const createdUser = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );

      if (createdUser) {
        //either run a function which logs the user in or redirect it to another webpage to login
        this.logInUser(email, password);
      } else {
        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async logInUser(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logOutUser() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }
}

export const authHandler = new AuthHandler();
