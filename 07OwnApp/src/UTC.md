# Understand The Code

## Contents:
1. [ENV variables in VITE](#env-variables-in-vite)
2. [Appwrite Authentication](#apprwrite-backend-authentication)
3. [Appwrite Database](#appwrite-database-service)  
4. [Appwrite Storage](#appwrite-storage-sevice)
5. [Reuseable Button Component](#reusable-button)
6. [React Hook Form](#react-hook-form)

***

### Env Variables in VITE:
Defining env variables varies according to the build tools.   
For `create-react-app` the variables should be decalred as `REACT_APP_VARIABLE_NAME` and is fetched using `process.env.REACT_APP_VARIABLE_NAME`.  
  
Similarly we have a different configuration for `vite`.  
Define variable as `VITE_VARIABLE_NAME`.  
Fetch them using `import.meta.env.VITE_VARIABLE_NAME`

#### Using env variables the production way:  
The env variables get loaded first when the app is ready due to which importing and accessing the env variables from different files may crash the app.  
So import all your env variables as `String` in a single file so that all of them can load together and use it from the file whenever necessary.  
```javascript
const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config
```
***[Go To Contents ->](#contents)***

***

### Apprwrite Backend Authentication:
In this project we have set up authentication using Appwrite.  
Before moving on go to your [project in appwrite](https://cloud.appwrite.io/console/project-65ef115d9a5372f5ab92/databases/database-65ef131ad61afd46d2ae) and update the permission setting for collections and storage.  
  
Now coming to the authentication part, we need a client and account to perform the authentication. This is how appwrite document guides us to create client and account:  
```javascript
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');               // Your project ID

const account = new Account(client);

const promise = account.create('[USER_ID]', 'email@example.com', '');
```  
We can sure set it up using this way, but we are gonna use a ***Future Proof*** approach.  
#### The ***Future Proof*** Approach:
So the idea is to create a class with all the required methods for authentication and we can easily access the methods by the object. 
```javascript 
import {Client, Account, ID} from "appwrite";
import config from "../config/config";

//THE CLASS
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        
        this.account = new Account(this.client)
    }

    //THE AUTH METHODS
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //if user is created, directly log them in.
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
            const loggedInUser =  await this.account.createEmailPasswordSession(email, password)
            return loggedInUser;
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

//create an object and export it directly.
const authService = new AuthService();

export default authService
```

Now whenever we need to create an account or login etc. we can just:  
```javascript 
import authService from "appwrite/auth.js"

const login = authService.loginAccount({
    email,
    password
})
```
What's **future proof** about this?  
Incase you decide to use `Firebase` or any other service you just have to change the *methods* and *constructor* in the class `AuthService` according to the service which you are using.  
  
The client side will have no idea which service you are using for backend they just know that `loginInAccount` will login to an account or `createAccount` will create an account.  
***[Go To Contents ->](#contents)***  

***

### Appwrite Database Service:
Similarly like in the [Authentication](#apprwrite-backend-authentication) use methods inside a class for a production way approach.   
Everything you need to know about `appwrite database` in in the [Appwrite Database Docs](https://appwrite.io/docs/references/cloud/client-web/databases).  
 
Here let's look about **Custom Queries**. 

*First Step for custom queries is that **You need to provide `index` for the attributes which will be used in custom queries***  
Example for a custom query:  
We need to get all the posts which has `status` as `active`.  
```javascript
 async getAllPosts(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Appwrite Error :: get all posts :: service.js error ::", error)
            return null;
        }
    }
```  
You can give any number of queries in the array using the keyword `Query` and for the quering methods check the [docs](https://appwrite.io/docs/products/databases/queries)  
***[Go To Contents ->](#contents)*** 
***

### Appwrite Storage Sevice:
All the basic stuffs about creating, deleting etc is available in the [docs](https://appwrite.io/docs/references/cloud/client-web/storage#deleteFile). 

There's one method which is `getFilePreview` which is a little unique.
```javascript
getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: get file preview :: service.js error ::", error)
        }
    }
```  
Notice this is not a `async` function because the preview is returned fast.  
This method compresses the file and returns which can be used as preview of the file.  
***[Go To Contents ->](#contents)*** 
***
### Reusable Button:  
React is all about reusing the components, let's look at a button example to understand how we can reuse any component.  
```javascript
const Button = ({
    text,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'white', 
    className = '',
    ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
    {...props}
    >

    </button>
  )
}

export default Button
```  
I think we can 80% understand what's happening here except for the `className` and `...props`.  
1. `className` is left empty because if a user decides to give custom classname, then they will be able to.  
Eg:  
```javascript
import Button from "../Button"

const SomeItem = () =>{
    return (
        <Button className="hover:bg-blue-500 shadow-lg">
        // this is the custom class
    )
}
```  
2. `...props` is used to take any other props for button.  
Eg:
```javascript
import Button from "../Button"

const SomeItem = () =>{
    return (
        <Button disabled="true">
        // the disable prop will be available in the 'props'.
    )
}
```
***[Go To Contents ->](#contents)***  
***
### React Hook Form:
***[Documentation](https://react-hook-form.com/)***  
  
Two main reasons to use `react-hook-form` is:  
1. You don't have to manage the input states
2. When we manually control a form, everytime when we type something in the input field the whole component get's re-rendered which results in performance degradation. But in `react-hook-form` it isolates the re-render which improves the performance.  
  

Two important components of `react-hook-form` is 
```javascript
const { register, handleSubmit } = useForm();
```   
1. `register`: It manages the input fields in the form.  
Syntax:  
```html
                <Input 
                label = "Email: "
                placeholder="enter your email"
                type="email"
                {...register("email", {
                    required:true
                })}
                />
                <Input 
                label = "Password: "
                placeholder="enter your password"
                type="password"
                {...register("password", {
                    required:true
                })}
                />
```  

2. `handleSubmit`: is a function which takes a function that we created to submit the form.  
Eg:
```javascript
//function i've defined to handle the form submit
const formSubmitHandler = async (data) => {
    setError("");
    try {
      const session = await authService.loginAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
```
```html
  {* The form *}
  <form action="" onSubmit={handleSubmit(formSubmitHandler)} className="mt-8">

            <div className="space-y-5">
                <Input 
                label = "Email: "
                placeholder="enter your email"
                type="email"
                {...register("email", {
                    required:true
                })}
                />
            . 
            . 

```    
The data will look like this:
```json
{"email":"email@gmail.com", "password":"thePassword"}
```  
***[Go To Contents ->](#contents)***  
***


