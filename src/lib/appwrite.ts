import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b6273400341a9582d9"); // Your Appwrite Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const appwriteConfig = {
  databaseId: "67c0db48003b78e0938c",
  productsCollectionId: "67c0dbac00319653e312",
  storageId: "67b6276f001e4ecf53c2",
};
