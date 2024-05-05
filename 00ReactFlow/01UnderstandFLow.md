# UNDERSTAND HOW REACT WORKS

- *React* is a single page application(SPA). It is SPA because all the manipulations take place in the `index.html` file.
- All the jsx gets injected into the `index.html` file through DOM Manupulation.

INDEX.HTML:
```html
 <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
```
MAIN.JSX:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
- Here we are importing the core react library and ReactDOM which creates a virtual DOM. The virtual DOM is used to compare with the actual DOM and make changes only when needed.  
- `createRoot` lets you create a root to display React components inside a browser DOM node.
- Then we get the `root` from index.html file and render the "App" inside it.

```javascript
function App() {
  return (
    <>
     <h1>Hello World</h1>
    </>
  )
}
export default App
```
- App is nothing but a function that returns `html`.  
- This `html` get's injected to the div with id=root in `index.html` file using react.

## SOME BASIC RULES:
- You should return all the html code under one tag in a component. 
- The component name should start with a Capital Letter.