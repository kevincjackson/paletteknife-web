import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

// React Router does not have any opinions about
// how you should parse URL query strings.
//
// If you use simple key=value query strings and
// you do not need to support IE 11, you can use
// the browser's built-in URLSearchParams API.
//
// If your query strings contain array or object
// syntax, you'll probably need to bring your own
// query parsing function.

export default function QueryParamsExample() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}

const colors = [
  "hsl(0,100%,50%)"
  , "hsl(30,100%,50%)"
  , "hsl(60,60%,60%)"
];

function ColorList() {
  const hite = 100 / colors.length;
  return colors.map(c => ColorBlock(c, hite));
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
      <div>
        <div style={{ height: "10vh" }}>
          <Child name={query.get("name")} />
        </div>
        <div style={{ height: "90vh" }}>
          { ColorList() }
        </div>
      </div>
    </div>
  );
}

function Child({ name }) {
  return (
    <div>
      {name ? (
        <h3>
          The <code>name</code> in the query string is &quot;{name}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}

function ColorBlock(bgcol, hite) {
  return (
    <div style={{ backgroundColor: bgcol, width: "100%", height: hite.toString() + "%" }}>
      {bgcol}
    </div>
  )
}
