import config from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class Service{
    client = new Client();
    database;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.database = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    //service methods.

    //1. TO CREATE A POST
    //Eg-> title: chai aur code; slug: chai-aur-code
    //featuredImage: will be an ID which we will receive after uploading the file using storage.
    async createPost({title, slug, content, featuredImage, status, userId}){
       try {
        console.log("method called")
         return await this.database.createDocument(
             config.appwriteDatabaseId,
             config.appwriteCollectionId,
             slug, //here slug is our unique value
             {
                 title,
                 content,
                 featuredImage,
                 status,
                 userId
             }
         )
       } catch (error) {
        console.log("Appwrite Error :: create post :: service.js error ::", error)
       }
    }

    //2. TO UPDATE A POST
    async updatePost(slug, {title, content, featuredImage, status}){
      try {
          return await this.database.updateDocument(
              config.appwriteDatabaseId,
              config.appwriteCollectionId,
              slug,
              {
                  title,
                  content,
                  featuredImage,
                  status
              }
          )
      } catch (error) {
        console.log("Appwrite Error :: update post :: service.js error ::", error)
      }
    }

    //3. TO DELETE A POST
    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Error :: delete post :: service.js error ::", error)
            return false;
        }
    }

    //4. TO GET A SINGLE POST
    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Error :: get post :: service.js error ::", error)
        }
    }

    //5. GET ALL POSTS WHOSE STATUS IS 'ACTIVE'
    async getAllPosts(){
        try {
            const allPosts = await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
            return allPosts
        } catch (error) {
            console.log("Appwrite Error :: get all posts :: service.js error ::", error)
            return null;
        }
    }

    //STORAGE METHODS.

    //1. UPLOAD A FILE
    async uploadFile(file){
        try {
            //will return the fileId
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Error :: upload file :: service.js error ::", error)
        }
    }

     //2. DELETE A FILE
     async deleleFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: delete file :: service.js error ::", error)
        }
    }

    //3. GET FILE PREVIEW
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            `${fileId}`
        )
    }
}

const service = new Service();

export default service;