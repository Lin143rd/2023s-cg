import React, { useEffect, useRef, useState } from "react";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { Camera, Raycaster, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { DragControls } from "three-stdlib";

// todo raycaster

function Draggable (props: {children:any, setState: any}) {
    const ref = useRef(null)
    const { scene, camera, viewport } = useThree()
    const vec3 = new Vector3()
    const [ isDragging, setIsDragging ] = useState<boolean>(false)

    const updateMousePosition = (event: any) => {
        if(!isDragging)
            return;
        const zero = new Vector3(event.rangeParent.width / 2, event.rangeParent.height / 2, 1)
        const x = (event.offsetX - zero.x) / camera.zoom;
        const y = -(event.offsetY - zero.y) / camera.zoom;
        props.setState(new Vector3(x, y, zero.z))
    }

    const onPointerDown = (event: any) => {
        setIsDragging(true)
        event.rangeParent.style.cursor = "grabbing"
    }

    const onPointerUp = (event: any) => {
        setIsDragging(false)
        event.rangeParent.style.cursor = "grab"
    }

    const onPointerOver = (event: any) => {
        if(isDragging)
            event.rangeParent.style.cursor = "grabbing"
        else
            event.rangeParent.style.cursor = "grab"
    }

    const onPointerOut = (event: any) => {
        setIsDragging(false)
        event.rangeParent.style.cursor = "default"
    }

    const onPointerMissed = (event: any) => {
        event.rangeParent.style.cursor = "default"
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

function PointFromArray(props: {vertices: Vector3[], size: number, color: string, setState?: any[]})
{
    return (
        <Points limit={props.vertices.length}>
            <PointMaterial size={props.size} vertexColors />
            {props.vertices.map((item, idx) => {
                if(props.setState !== undefined) {
                    return (
                        <Draggable key={idx} setState={props.setState[idx]}>
                            <Point
                                position = {[
                                item.x,
                                item.y,
                                item.z
                                ]}
                                color={props.color}
                            />
                        </Draggable>
                    )
                } else {
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
                    );
                }
            })}
        </Points>
    );
}

export default PointFromArray;