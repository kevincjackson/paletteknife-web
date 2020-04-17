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
      <TestElement a="apple" />
      <ErrorScreen stepError={{ a: 1, steps: "a", b: 5 }}/>
    </Router>
  );
}

function Validator() {
  const query = new URLSearchParams(useLocation().search);
  const a = query.get("a") || Hsl.rand();
  const b = query.get("b") || Hsl.rand();
  const steps = parseInt(query.get("steps")) || 4;

  try {
    const cs = Stepper.stepO(a,b,steps); 
    const css = cs.map(c => Hsl.toCss(c));
    const hite = 100 / css.length;
    const cblocks = css.map(c => ColorBlock(c,hite));
    return <SuccessScreen a={a} b={b} steps={steps}/>
  }
  catch(err) {
    return <ErrorScreen a={a} b={b} steps={steps}/>
  }
}

function SuccessScreen({a, b, steps}) {
  const cs = Stepper.stepO(a,b,steps); 
  const css = cs.map(c => Hsl.toCss(c));
  const hite = 100 / css.length;
  const cblocks = css.map(c => ColorBlock(c,hite));

  return (
    <Router>
      <div>
        <div>
          <div style={{ height: "5vh" }}>
            {JSON.stringify("Yay!")}
          </div>
          <div style={{ height: "95vh" }}>
            {cblocks}
          </div>
        </div>
      </div>
    </Router>
  );
}

function TestElement(props) {
  return <div>Hello!{props.a}</div>
}

function ErrorScreen({ stepError }) {
  return (
    <div style={{ height: "95vh" }}>
      <div style={{ height: "33.33vh", color: "grey", backgroundColor: "black" }}>
        <div>Ooops! Expected an input like a={"{"}h:0,s:100,l:50{"}"}, got {stepError.a} instead.</div>
      </div>
      <div style={{ height: "33.33vh", color: "grey", backgroundColor: "black" }}>
        <div>Ooops! Expected an input like steps=4, got {stepError.steps} instead.</div>
      </div>
      <div style={{ height: "33.33vh", color: "grey", backgroundColor: "black" }}>
        <div>Ooops! Expected an input like b={"{"}h:0,s:100,l:50{"}"}, got {stepError.b} instead.</div>
      </div>
    </div>
  )
}


function ColorBlock2(bgcol, content) {

}

function ColorBlockList2(colorBlocks) {
}

function ColorBlock(bgcol, hite) {
  return (
    <div style={{ backgroundColor: bgcol, width: "100%", height: hite.toString() + "%" }}>
      {bgcol}
    </div>
  )
}
