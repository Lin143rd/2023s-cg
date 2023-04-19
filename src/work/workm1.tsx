import React, { ReactElement, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber"
import PointFromArray from "../threecomponents/pointfromarray";
import Caption from "../components/caption";
import config from "../config.json"
import "../style/canvas.css"
import { Vector3 } from "three";

function BezierCurve2D(props: {p0: Vector3, p1: Vector3, p2: Vector3, setState?: any[]}) {
  const SIZE = 3;
  const LENGTH = 100;
  const vertices = [];
  for(let i = 0; i <= LENGTH; ++i) {
    let t1 = i / LENGTH;
    let t2 = 1 - t1;
    const x = (t1 * t1 * props.p0.x + 2 * t1 * t2 * props.p1.x + t2 * t2 * props.p2.x);
    const y = (t1 * t1 * props.p0.y + 2 * t1 * t2 * props.p1.y + t2 * t2 * props.p2.y);
    const z = 0;
    const vertex = new Vector3(x, y, z)
    vertices.push(vertex);
  }

  const corner = [props.p0, props.p1, props.p2];

  return (
    <>
      {/* curve itself */}
      <PointFromArray vertices={vertices} size={SIZE} color="red" />
      {/* corner */}
      <PointFromArray vertices={corner} size={SIZE} color="black" setState={props.setState}/>
    </>
  );
}  

function WorkM1(props: {trigger: number}) {
  let element: ReactElement[] = [];
  const [p0, setp0] = useState(new Vector3(-2, -2, 1))
  const [p1, setp1] = useState(new Vector3(0, 0, 1))
  const [p2, setp2] = useState(new Vector3(2, -2, 1))
  const bezier2dSetStates = [setp0, setp1, setp2]
  element.push(
    <BezierCurve2D p0={p0} p1={p1} p2={p2} setState={bezier2dSetStates}/>
  );
  element.push(
    <BezierCurve2D p0={p0} p1={p1} p2={p2} setState={bezier2dSetStates}/>
  );
  element.push(
    <BezierCurve2D p0={p0} p1={p1} p2={p2} setState={bezier2dSetStates}/>
  );
  element.push(
    <BezierCurve2D p0={p0} p1={p1} p2={p2} setState={bezier2dSetStates}/>
  );

  const caption = config.content[1].caption

  return (
      <>
        {
          caption?.map((item, idx) => (
            <div key={idx}>
              <Caption title={item.title} explanation={item.explanation} />
              <div className="canvas">
                <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
                  <ambientLight />
                  <pointLight position={[20, 20, 20]} />
                  {element[idx]}
                </Canvas>
              </div>
            </div>
          ))
        }
      </>
  );
}

export default WorkM1;