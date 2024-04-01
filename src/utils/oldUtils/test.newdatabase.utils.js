import { Client, Databases, Query } from "appwrite";
import config from "../../config/config";

class DatabaseConfig {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteUrlProjectId);

    this.database = new Databases(this.client);
  }

  async listAllDocuments(query = [Query.equal("status", ["active"])]) {
    try {
      return await this.database.listDocuments(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        query
      );
    } catch (error) {
      console.error("APPWrite API Error :: error Reading Database ", error);
      return false;
    }
  }

  async getSingleDocument(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug
      );
    } catch (error) {
      console.error("APPWrite API Error :: error getting Database ", error);
      return false;
    }
  }

  async createDocument({
    title,
    slug,
    content,
    featuredImage,
    status,
    userID,
  }) {
    try {
      return await this.database.createDocument(
        config.appwriteUrlDatabaseId,
        config.appwriteUrlCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.error(
        "APPWrite API Error :: error creating document in  Database ",
        error
      );
      return false;
    }
  }
}

const databaseConfig = new DatabaseConfig();

export default databaseConfig;
