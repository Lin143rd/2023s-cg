import React, { ReactElement, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber"
import PointFromArray from "../threecomponents/pointfromarray";
import Caption from "../components/caption";
import config from "../config.json"
import "../style/canvas.css"
import { Vector3 } from "three";
import { Combination } from "../util/combination";

function BezierCurve(props: {p: Vector3[], isRegularInterval: boolean, onDrag?: any}) {
  const LINEAR_SIZE = 4;
  const CORNER_SIZE = 4;
  const LENGTH = 20;
  const n = props.p.length;
  const vertices = [];

  // create line vertices
  if(props.isRegularInterval) {
    for(let i = 0; i <= LENGTH - 1; ++i) {
      const t = i / (LENGTH - 1)
      let x = 0;
      let y = 0;
      let z = 0;
      for(let j = 0; j < n; ++j) {
        const weight = Math.pow(1 - t, n - 1 - j) * Math.pow(t, j) * Combination.nCk(n - 1, j);
        x += props.p[j].x * weight
        y += props.p[j].y * weight
      }
      const vertex = new Vector3(x, y, z)
      vertices.push(vertex);
    }
  } else {
    const createVertexFromDeCasteljau = (t: number, now: Vector3[]): Vector3 => {
      // k次ベジェ曲線
      if(now.length === 1)
        return now[0]
      let nxt = []
      for(let i = 0; i < now.length - 1; ++i) {
        nxt[i] = new Vector3((1 - t) * now[i].x + t * now[i + 1].x, (1 - t) * now[i].y + t * now[i + 1].y, 1)
      }
      return createVertexFromDeCasteljau(t, nxt);
    }
    for(let i = 0; i <= LENGTH - 1; ++i) {
      const t = i / (LENGTH - 1)
      const vertex = createVertexFromDeCasteljau(t, props.p)
      vertices.push(vertex);
    }
  }

  return (
    <>
      {/* curve itself */}
      <PointFromArray vertices={vertices} size={LINEAR_SIZE} color="black" />
      {/* corner */}
      <PointFromArray vertices={props.p} size={CORNER_SIZE} color="red" onDrag={props.onDrag}/>
    </>
  );
}  

function BezierCurveWeight(props: {p: Vector3[], w: number[], onDrag?: any}) {
  const LINEAR_SIZE = 4;
  const CORNER_SIZE = 4;
  const LENGTH = 20;
  const n = props.p.length;
  const vertices = [];

  // create line vertices
  for(let i = 0; i <= LENGTH - 1; ++i) {
    const t = i / (LENGTH - 1)
    let x = 0;
    let y = 0;
    let z = 1;

    // normalize weight
    let weight = [];
    for(let j = 0; j < n; ++j) {
      weight[j] = Math.pow(1 - t, n - 1 - j) * Math.pow(t, j) * Combination.nCk(n - 1, j);
      weight[j] *= props.w[j];
    }
    const w_sum = weight.reduce((a, b) => { return a + b; })
    weight = weight.map(w => w / w_sum);

    for(let j = 0; j < n; ++j) {
      x += props.p[j].x * weight[j];
      y += props.p[j].y * weight[j];
    }
    const vertex = new Vector3(x, y, z)
    vertices.push(vertex);
  }

  return (
    <>
      {/* curve itself */}
      <PointFromArray vertices={vertices} size={LINEAR_SIZE} color="black" />
      {/* corner */}
      <PointFromArray vertices={props.p} size={CORNER_SIZE} color="red" onDrag={props.onDrag}/>
    </>
  );
}  

function WorkM1(props: {trigger: number}) {
  let input: ReactElement[] = [];
  let element: ReactElement[] = [];

  // Bezier ND
  const maxN = 20;
  useEffect(() => {
    Combination.init(maxN);
  }, [])
  const [bezierN, setBezierN] = useState(maxN)
  const [p, setP] = useState(Array.from({length: maxN}, () => new Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1)))
  const dragP = (index: number, v: Vector3) => {
    setP(
        p.map((vertex, idx) => (idx === index ? v : vertex))
    )
  }
  const onSlideBezierN = (event: any) => {
    setBezierN(event.target.value)
  }
  useEffect(() => {
    setP(Array.from({length: bezierN}, () => new Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1)))
  }, [bezierN])
  input.push(
    <>
      <input type="range" id="bezier_n" name="bezier_n" value={bezierN} min="3" max={maxN} onChange={onSlideBezierN} />
      <label htmlFor="bezier_n">number of vertices: {bezierN}</label>
    </>
  )
  element.push(
    <>
      <BezierCurve p={p} onDrag={dragP} isRegularInterval={true}/>
    </>
  );

  // Bezier ND with de Casteljau
  const [bezierN_De, setBezierN_De] = useState(maxN)
  const [p_De, setP_De] = useState(Array.from({length: maxN}, () => new Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1)))
  const dragP_De = (index: number, v: Vector3) => {
    setP_De(
        p_De.map((vertex, idx) => (idx === index ? v : vertex))
    )
  }
  const onSlideBezierN_De = (event: any) => {
    setBezierN_De(event.target.value)
  }
  useEffect(() => {
    setP_De(Array.from({length: bezierN_De}, () => new Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1)))
  }, [bezierN_De])
  input.push(
    <>
      <input type="range" id="bezier_n_de" name="bezier_n_de" value={bezierN_De} min="3" max={maxN} onChange={onSlideBezierN_De} />
      <label htmlFor="bezier_n_de">number of vertices: {bezierN_De}</label>
    </>
  )
  element.push(
    <BezierCurve p={p_De} onDrag={dragP_De} isRegularInterval={false}/>
  );

  // Bezier ND with weight
  useEffect(() => {
    Combination.init(maxN);
  }, [])
  const [bezierN_w, setBezierN_w] = useState(maxN)
  const [p_w, setP_w] = useState(Array.from({length: maxN}, () => new Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1)))
  const dragP_w = (index: number, v: Vector3) => {
    setP_w(
        p_w.map((vertex, idx) => (idx === index ? v : vertex))
    )
  }
  const onSlideBezierN_w = (event: any) => {
    setBezierN_w(event.target.value)
  }
  useEffect(() => {
    setP_w(Array.from({length: bezierN_w}, () => new Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1)))
  }, [bezierN_w])
  const [weight, setWeight] = useState(Array.from({length: maxN}, () => Math.floor(Math.random() * 10)))
  const onSlideWeight = (event: any) => {
    setWeight(
        weight.map((w, idx) => (event.target.id === `w_${idx + 1}` ? event.target.value : w))
    )
  }
  input.push(
    <>
      <input type="range" id="bezier_n_w" name="bezier_n_w" value={bezierN_w} min="3" max={maxN} onChange={onSlideBezierN_w} />
      <label htmlFor="bezier_n_w">number of vertices: {bezierN_w}</label>
      <br/>
      <br/>
      {weight.map((w, idx) => {
        const w_name = `w_${idx + 1}`
        if(idx >= bezierN_w)
          return(<></>);
        return (
          <div key={idx}>
            <input type="range" id={w_name} name={w_name} value={weight[idx]} min="-10" max="10" onChange={onSlideWeight} />
            <label htmlFor={w_name}>weight_{idx + 1}: {weight[idx]}</label>
          </div>
        )
      })}
    </>
  )
  element.push(
    <>
      <BezierCurveWeight p={p_w} w={weight} onDrag={dragP_w} />
    </>
  );

  const caption = config.content[1].caption

  return (
      <>
        {
          caption?.map((item, idx) => (
            <div key={idx}>
              <Caption title={item.title} explanation={item.explanation} />
              {input[idx]}
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