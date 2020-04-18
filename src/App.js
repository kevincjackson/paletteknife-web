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
  const validatedArgs = validate(args); // { a, b, steps, aError, bError, stepsError }
  const colorContentList = getColorContentList(validatedArgs); // [{ hsl, content }]
  // const colorLayout = <div style={{backgroundColor: "orange"}}>{JSON.stringify(args.a)}</div>; // [div]
  return (
    <div>
      <Debug params={validatedArgs} /><br />
      <Debug params={colorContentList} /><br />
    </div>
  )
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
// { a: Hsl, b: Hsl, steps: }
function validate(args) {

  const maybeA = Hsl.try_decode(args.a)
  const maybeB = Hsl.try_decode(args.b)
  const maybeSteps = parseInt(args.steps);

  return {
    a: maybeA ? maybeA : args.a,
    b: maybeB ? maybeB : args.b,
    steps: maybeSteps ? maybeSteps : args.steps,
    aError: maybeA ? null : "Ooops! Something's wrong with a.",
    bError: maybeB ? null : "Ooops! Something's wrong with b.",
    stepsError: maybeSteps ? null : "Ooops! Something's wrong with steps"
  }
}

// { a: Hsl, b: Hsl, steps: Int?, aError: String?, bError: String?, stepsError: String } =>
// [{ color: String, content: String }];
function getColorContentList(valArgs) {
    // Happy Path
    if (valArgs.aError == null && valArgs.bError == null && valArgs.stepsError == null) {
       return Stepper.stepO(valArgs.a, valArgs.b, valArgs.steps)
                     .map(hsl => { return { color: Hsl.toCss(hsl), content: Hsl.toCss(hsl) }});
    } 
    // Sad Path
    else {
      const a = valArgs.aError ? { color: "black", content: valArgs.aError } : 
                                 { color: Hsl.toCss(valArgs.a), content: Hsl.toCss(valArgs.a) };
      const s = valArgs.stepsError ? { color: "black", content: valArgs.stepsError } : 
                                     { color: "grey", content: valArgs.steps.toString() }; 
      const b = valArgs.bError ? { color: "black", content: valArgs.bError } : 
                                 { color: Hsl.toCss(valArgs.b), content: Hsl.toCss(valArgs.b) };
      return [a,s,b];
    }
}

function Debug(params) {
  return <div>{JSON.stringify(params)}</div>;
}