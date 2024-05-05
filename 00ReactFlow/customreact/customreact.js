//4. defining customRender
function customRender(reactElement, mainContainer){
    //1. Create a dom element
    const domEle = document.createElement(reactElement.type)

    //2. Add the html content in the element
    domEle.innerHTML = reactElement.children

    //3. Set the attributes for the element using a loop
    for(const prop in reactElement.props){
        domEle.setAttribute(prop, reactElement.props[prop])
    }
    // domEle.setAttribute('href', reactElement.props.href)
    // domEle.setAttribute('target', reactElement.props.target)

    //4. Now add the element into the container
    mainContainer.appendChild(domEle)
}


//1. This is main container where we inject the html code through react
const mainContainer = document.getElementById('root')

//2. Creating a react element to render it in main container
const reactElement = {
    type: 'a',
    props:{
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click me to visit google'
} //this is how a html tag gets converted into.

//3. Render the react element in the main container using a render function
customRender(reactElement, mainContainer); //render the reactElement in mainContainer

