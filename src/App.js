import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import Stepper from "./stepper";
import Hsl from "./hsl";

// Keep as is or get useContext error.
export default function App() {
  return (
    <Router>
      <Steps />
    </Router>
  );
}

function Steps() {
  const query = new URLSearchParams(useLocation().search);
  const a =  Hsl.rand();
  const b =  Hsl.rand();
  //const a = query.get("a") || Hsl.rand();
  //const b = query.get("b") || Hsl.rand();
  //const steps = query.get("steps") || 4;
  const steps = 4;
  //const cs = Stepper.stepO(a,b,steps);
  //const hite = 100 / colors.length;
  //const c2 = colors.map(c => ColorBlock(c, hite));
  const cs = Stepper.stepO(a,b,steps); 
  const css = cs.map(c => Hsl.toCss(c));
  const hite = 100 / css.length;
  const cblocks = css.map(c => ColorBlock(c,hite));

  return (
    <Router>
      <div>
        <div>
          <div style={{ height: "5vh" }}>
            {JSON.stringify(hite)}
            {/*<Debug a={a} b={b} steps={steps} />*/}
          </div>
          <div style={{ height: "95vh" }}>
            {cblocks}
          </div>
        </div>
      </div>
    </Router>
  );
}

function ColorList() {
  const query = new URLSearchParams(useLocation().search);
  const a = query.get("a") || Hsl.rand();
  const b = query.get("b") || Hsl.rand();
  const steps = query.get("steps") || 4;
  const colors = Stepper.stepO(a,b,steps).map(c => Hsl.toCss(c));
  const hite = 100 / colors.length;
  return colors.map(c => ColorBlock(c, hite));
}

function ColorBlock(bgcol, hite) {
  return (
    <div style={{ backgroundColor: bgcol, width: "100%", height: hite.toString() + "%" }}>
      {bgcol}
    </div>
  )
}

function Debug({ a, b, steps }) {
  return (
    <div>
      <span>a={a ? a : null}</span>
      <span>,b={b ? b : "null"}</span>
      <span>,steps={steps ? steps : "null"}</span>
    </div>
  );
}
