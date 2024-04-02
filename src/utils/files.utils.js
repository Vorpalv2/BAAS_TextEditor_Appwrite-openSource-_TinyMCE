import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

class FileService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteUrlProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteUrlBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("AppWrite Service Error :: Uploading File error : ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteUrlBucketId, fileId);
      return true;
    } catch (error) {
      console.log("AppWrite Service Error :: Deleting File error : ", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    const file = await this.storage.getFilePreview(
      config.appwriteUrlBucketId,
      fileId
    );
    return file;
  }
}

const fileService = new FileService();

export default fileService;
