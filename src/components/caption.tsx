import React from "react";
import "../style/caption.css"

function Caption(props: {title: string, explanation: string}) {
    return (
        <>
            <h3 className={"caption-title"}>
                {props.title}
            </h3>
            <div className={"caption-explanation"}>
                {props.explanation}
            </div>
        </>
    );
}

export default Caption;