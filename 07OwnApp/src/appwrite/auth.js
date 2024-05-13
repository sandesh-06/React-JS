import {Client, Account, ID} from "appwrite";
import config from "../config/config";

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
                
                return this.loginAccount({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite Error :: create account :: auth.js error ::", error)
        }
    }

    async loginAccount({email, password}){
        try {
            const loggedInUser =  await this.account.createEmailPasswordSession(email, password)
            return loggedInUser;
        } catch (error) {
            console.log("Appwrite Error :: login account :: auth.js error ::", error)
        }
    }

    async getCurrentUser(){
        try {
            const acc = this.account.get();
            if(acc) return acc;
            else return null;
        } catch (error) {
            console.log("Appwrite Error :: get user account :: auth.js error ::", error)
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Error :: logout account :: auth.js error ::", error)
        }
    }
}

const authService = new AuthService();

export default authService