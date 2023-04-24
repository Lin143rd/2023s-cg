import React, { useRef, useState } from "react";
import { Point, PointMaterial, Points, Text, Line } from "@react-three/drei";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

// todo raycaster

function Draggable (props: {children:any, index: number, onDrag: any}) {
    const ref = useRef(null)
    const { camera, gl } = useThree()
    const [ isDragging, setIsDragging ] = useState<boolean>(false)

    const updateMousePosition = (event: any) => {
        if(!isDragging)
            return;
        const zero = new Vector3(gl.domElement.width / 2, gl.domElement.height / 2, 1)
        const x = (event.offsetX - zero.x) / camera.zoom;
        const y = -(event.offsetY - zero.y) / camera.zoom;
        const v = new Vector3(x, y, zero.z)
        props.onDrag(props.index, v)
    }

    const onPointerDown = (event: any) => {
        setIsDragging(true)
        gl.domElement.style.cursor = "grabbing"
    }

    const onPointerUp = (event: any) => {
        setIsDragging(false)
        gl.domElement.style.cursor = "grab"
    }

    const onPointerOver = (event: any) => {
        if(isDragging)
            gl.domElement.style.cursor = "grabbing"
        else
            gl.domElement.style.cursor = "grab"
    }

    const onPointerOut = (event: any) => {
        setIsDragging(false)
        gl.domElement.style.cursor = "default"
    }

    const onPointerMissed = (event: any) => {
        gl.domElement.style.cursor = "default"
    }

    return  (
        <group ref={ref} 
            // style={{
            //     cursor: isDragging ? "grabbing" : "grab"
            // }}
            onPointerMove={updateMousePosition} 
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerMissed={onPointerMissed}
        >
            {props.children}
        </group>
    );
}

function PointFromArray(props: {vertices: Vector3[], size: number, color: string, onDrag?: any})
{
    if(props.onDrag !== undefined)
        return (
            <Points limit={props.vertices.length}>
                <PointMaterial size={props.size} vertexColors />
                {props.vertices.map((item, idx) => {
                        return (
                            <>
                                <Draggable key={idx} index={idx} onDrag={props.onDrag}>
                                    <Point
                                        position = {[
                                        item.x,
                                        item.y,
                                        item.z
                                        ]}
                                        color={props.color}
                                    />
                                </Draggable>
                                <Text
                                    position={[
                                        item.x,
                                        item.y,
                                        0
                                    ]}
                                    color="red"
                                    fontSize={0.3}
                                    anchorX="center"
                                    anchorY="bottom"
                                    >
                                    P{idx + 1}
                                </Text>
                            </>
                        )
                    }
                )}
            </Points>
        )
    else {
        return (
            <>
                <Points limit={props.vertices.length}>
                    <PointMaterial size={props.size} vertexColors />
                    {props.vertices.map((item, idx) => {
                            return (
                                <Point
                                    key={idx}
                                    position = {[
                                    item.x,
                                    item.y,
                                    item.z
                                    ]}
                                    color={props.color}
                                />
                            )
                        }
                    )}
                </Points>
                <Line points={props.vertices} />
            </>
        );
    }
}

export default PointFromArray;