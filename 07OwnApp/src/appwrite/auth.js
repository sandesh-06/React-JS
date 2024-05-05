import {Client, Account, ID} from "appwrite";
import config from "../config/config";

//we are using a class to create account for user
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //directly login the user
                return this.loginAccount({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async loginAccount({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService