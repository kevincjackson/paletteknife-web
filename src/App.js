import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useContext
} from "react-router-dom";
import Stepper from "./stepper";
import Hsl from "./hsl";

// React-router requires keeping query as a React child object.
export default function App() {
  return (
    <Router>
      <ColorLayout />
    </Router>
  );
}

function ColorLayout(props) {
  const query = new URLSearchParams(useLocation().search);
  const args = getArgs(query); // { a, b, steps }
  const validatedArgs = validate(args);
  const colorContentList = [validatedArgs.a, validatedArgs.b]; //[a,b];
  const colorLayout = <div style={{backgroundColor: "orange"}}>{JSON.stringify(args.a)}</div>;
  return Debug(validatedArgs);
}

// React-Router Query -> { a: Hsl?, b: Hsl?, steps: Int? }
function getArgs(query) {
  return { 
    a: query.get("a") || Hsl.encode(Hsl.rand()), 
    b: query.get("b") || Hsl.encode(Hsl.rand()), 
    steps: query.get("steps") || "4"
  }
}

// { a: Hsl, b: Hsl, steps: Int } -> 
// [{ a: Hsl, aError: String? }, { steps: Int, stepsError: String? }, { b: Hsl, bError: String? } ]
function validate(args) {
  var valArgs = [];

  const maybeA = Hsl.try_decode(args.a)
  if (maybeA) {
    valArgs.push({ a: maybeA, error: null });
  } else {
    valArgs.push({ a: args.a, error: "Ooops! Something's wrong with a."});
  }

  const maybeSteps = parseInt(args.steps);
  if (maybeSteps) {
    valArgs.push({ steps: maybeSteps, error: null });
  }
  else {
    valArgs.push({ steps: args.steps, error: "Ooops Something's wrong with steps." });
  }

  const maybeB = Hsl.try_decode(args.b)
  if (maybeB) {
    valArgs.push({ b: maybeB, error: null });
  } else {
    valArgs.push({ b: args.b, error: "Ooops! Something's wrong with b." });
  }

  return valArgs
}

function Debug(params) {
  return <div>{JSON.stringify(params)}</div>;
}