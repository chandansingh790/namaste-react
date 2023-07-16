const heading = React.createElement("h1", {id: "heading"}, "Hello World ! by React"); // React.createElement take 3 parameter // it is created in react core and 2nd parameter is to pass attributes or anything like id, class

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(heading);

// lets just create a nested html structure 
/** 
 * <div id="parent">
 *     <div id="child1">
 *          <h1>I'm h1 tag</h1>
 *          <h2>I'm h1 tag</h2> // lets add a second siblings here inside child // for that you have to pass an array as 3rd parameter
 *     </div>
 *     <div id="child2">
 *          <h1>I'm h1 tag</h1>
 *          <h2>I'm h1 tag</h2> // lets add a second siblings here inside child // for that you have to pass an array as 3rd parameter
 *     </div>
 * </div>
 * 
 * 
*/


/* React.createElement() creates a ReactElement object not html and react.Render() converts in HTML(Browser Understand) */
const parent = React.createElement(
    "div",
    {id : "parent"}, [
    React.createElement(
        "div",
        {id : "child1"}, [
        React.createElement("h1", {}, "I'm h1 tag"),
        React.createElement("h2", {}, "I'm h2 tag"),
        ]),
    React.createElement(
        "div",
        {id : "child2"}, [
        React.createElement("h1", {}, "I'm h1 tag"),
        React.createElement("h2", {}, "I'm h2 tag"),
        ])
    ]);

// Above code looks tidy, complicated just to created a div.. so here JSX come into picture
root.render(parent);
console.log(parent);
