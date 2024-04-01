const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteUrlProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteUrlDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteUrlCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteUrlBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  TINYMCEAPIKEY: import.meta.env.TINYMCE_APIKEY,
};

export const TINYMCEAPI = "zpsey48cqqhvkrthcd8lr1v9xxfolr46jzjoyyp7g5x71xfu";

export default config;
