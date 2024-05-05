# Custom React

Let's try to create our own custom react to understand how react works.

1. Create an `index.html` file.
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="customreact.js"></script>
  </body>
</html>
```

This `index.html` file contains a div with id of root where all the jsx will be rendered.

***
2. `customreact.js`
```javascript
const mainContainer = document.getElementById('root')
```
The mainContainer targets the div with id root.
***

3. Create a reactElement:
```javascript
const reactElement = {
    type: 'a',
    props:{
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click me to visit google'
}
```
- Here we have created our own react element.
- The jsx elements gets converted into react element which looks like this before getting rendered in the `index html`.   
- React doesn't understand `html`, so the bundler like 'vite' or 'babel' converts the jsx we give into these react elements.
- **NOTE: If you're thinking that when you directly give this react element instead of jsx, will the reactDOM render this? Good question.**  
**When we give a react element directly to render it will definetly do it. But if we give the above written react element it won't.<br> That's because of the react element we have written is for our custom render and the render function in reactDOM might vary. Like say the react developers might have used a different naming which may not match with ours. Eg: They could have used 'prop' instead of 'props'.<br> So incase you want to render a react element directly(idk why would you) check for the parameters used by the developers and go with it.**
4. Create custom render function:
```javascript
function customRender(reactElement, mainContainer){
    //1. Create a dom element
    const domEle = document.createElement(reactElement.type)

    //2. Add the html content in the element
    domEle.innerHTML = reactElement.children

    //3. Set the attributes for the element
    for(const prop in reactElement.props){
         domEle.setAttribute(prop, reactElement.props[prop])
    }

    //4. Now add the element into the container
    mainContainer.appendChild(domEle)
}
customRender(reactElement, mainContainer)
```
This is our own render function which renders the reactElement into html and injects it to the `index.html` file.  

The rendered reactElement then get's displayed in the browser through `index.html` file.


## Creating a React Element.

React provides a method to create a react element.
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
const ReactElement = React.createElement(
  'a', //tag
  {href:"https://www.google.com", target: '_blank'}, //attributes
  'click me to visit google' //children
)
ReactDOM.createRoot(document.getElementById('root')).render(
  ReactElement
)
```

## Injecting JS in JSX
You can inject **'Evaluated Expressions'** inside the jsx using `{(your expression)}`  
Eg:
```javascript
function App() {
  const myname = "Sandesh"
  return (
    <>
     <h1>Hello World</h1>
     <p>Hello {myname}</p>
    </>
  )
}
export default App
```
**It is called as 'Evaluated Expression' because you can only inject the final evaluated value into the jsx. All the javascript code should be written outside the jsx.**