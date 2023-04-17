import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber"
import { Point, PointMaterial, Points } from "@react-three/drei";

function Box(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function BezierCurve2D(props: {p0: number[], p1: number[], p2: number[]}) {
  const SIZE = 3;
  const LENGTH = 100;
  const vertices = [];
  for(let i = 0; i <= LENGTH; ++i) {
    let t1 = i / LENGTH;
    let t2 = 1 - t1;
    const x = (t1 * t1 * props.p0[0] + 2 * t1 * t2 * props.p1[0] + t2 * t2 * props.p2[0]);
    const y = (t1 * t1 * props.p0[1] + 2 * t1 * t2 * props.p1[1] + t2 * t2 * props.p2[1]);
    const z = 0;
    vertices.push([x, y, z]);
  }

  return (
    <Points limit={LENGTH * 2}>
      <PointMaterial size={SIZE} vertexColors />
      <Point key={LENGTH + 2} position={[props.p0[0], props.p0[1], 50]} color="black" />
      <Point key={LENGTH + 3} position={[props.p1[0], props.p1[1], 50]} color="black" />
      <Point key={LENGTH + 4} position={[props.p2[0], props.p2[1], 50]} color="black" />
      {vertices.map((item, idx) => (
        <Point
          key={idx}
          position = {[
            item[0],
            item[1],
            item[2]
          ]}
          color="red"
        />
      ))}
    </Points>
  );
}

  

function WorkM1() {
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }} style={{ width: "50vw", height: "50vh", backgroundColor: "whitesmoke"}}>
            <ambientLight />
            <pointLight position={[20, 20, 20]} />
            {/* <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> */}
            <BezierCurve2D p0={[-2, -2]} p1={[0, 0]} p2={[2, -2]} />
        </Canvas>
    );
}

export default WorkM1;