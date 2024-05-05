# Understand The Code

`react-router-dom` is a third party library which we use for routing in react.  

It provides functionalities with which we can route pages with ease.  

- Let's understand the difference between `Link` and `NavLink` which is used for navigation.

`Link` and `NavLink` both does exactly same work, but `NavLink` provides some addition functionalities.
Eg:
```html
 <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  className={({isActive}) =>
                    `block ${isActive ? "text-orange-500" : "text-gray-700"}
                  }
                >
                  Home
                </NavLink>
              </li>
            </ul>
```
`isActive` is an inbuilt functionality of NavLink which tells whether page is active or not.

## How to set up router:

1. Inject the `Routerprovider` component in **main.jsx**:
```javascript
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={myRouter}/>
  </React.StrictMode>,
)
```

2. Notice we have router={myRouter}, so we have to create `myRouter`
```javascript
const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: "",
        element: <Home/>
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "contact",
        element: <Contact/>
      },
    ]
  }
])
```
How this myRouter works?  
1. Use the `createBrowserRouter` method for creating the router.
2. Declare it in an array
3. The `App` component is the layout which has header and footer predefined.
4. The `Outlet` in App component is provided by react-router-dom, it takes the component from myRouter and renders it in App component using the Outlet.
5. The main path is "/" and the children path is followed after main path.
6. So when we give path as "/about" the `About` component renders.

## MODERN SYNTAX FOR R-R-D:

```javascript
const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
   <Route loader={githubInfoFetcher} path='github' element={<Github />}/>
    </Route>
  )
)
```

## Understanding Loader and useLoader hook:

- Loader is used for optimized API calls.  
- useEffect fetches the data when the page loads, but using `loader` we can fetch the data before loading the page. While you hover on the `github` in navbar, the data is fetched by the loader at that time and keeps in cache and when you click it displays.

1. Declare the loader function in the same file and return the json response.
```javascript
export const githubInfoFetcher = async()=>{
    const res = await fetch("https://api.github.com/users/sandesh-06")
    return res.json()
}
```

2. Get the response in using the `loader` in `Route`.
```javascript
  <Route loader={githubInfoFetcher} path='github' element={<Github />}/>
```

3. Now how to get the data in the loader? Yes, we have a hook to get data from the loader which is `useLoaderData`.
```html
 const data = useLoaderData()
  return (
    <div className='bg-slate-700 flex justify-evenly'>
        <div>
            <p className='text-white text-2xl p-6'>Github Name: {data["name"]}</p>
            <p className='text-white text-2xl p-6'>Username: {data["login"]}</p>
            <p className='text-white text-2xl p-6'>Followers: {data["followers"]}</p>
            <p className='text-white text-2xl p-6'>Repositories: {data["public_repos"]}</p>
        </div>
        <div>
            <img src={data["avatar_url"]} alt="" />
        </div>
    </div>
  )
}
```