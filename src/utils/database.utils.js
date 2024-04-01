import { Client, Databases, Query } from "appwrite";
import config from "../config/config";

class DatabaseConfig {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteUrlProjectId);
    this.databases = new Databases(this.client);
    // this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userID, status }) {
    try {
      return await this.databases.createDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userID,
          status,
        }
      );
    } catch (error) {
      console.log("AppWrite Service Error :: Create New Post error : ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("AppWrite Service Error :: Updating Post error : ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug
      );
      const selectedDocument = await this.databases.getDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug
      );
      console.log(
        `${selectedDocument} with ID : ${selectedDocument.$id} and ${slug} deleted Successfully`
      );
      return true;
    } catch (error) {
      console.log(
        `AppWrite Service Error :: Deleting Post error with ID ${slug} : `,
        error
      );
      return false;
    }
  }

  async getSinglePost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug
      );
    } catch (error) {
      console.log(
        "AppWrite Service Error :: Getting Single Post error : ",
        error
      );
      return false;
    }
  }
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId
        // queries
      );
    } catch (error) {
      console.log("AppWrite Service Error :: Listing All Post error : ", error);
      return false;
    }
  }
}

const databaseConfig = new DatabaseConfig();

export default databaseConfig;
