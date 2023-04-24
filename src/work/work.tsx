import React, { ReactElement } from "react";
import WorkM1 from "./workm1";
import Environment from "../components/environment";
import "../style/work.css"

function Work(props: {value: number})
{
    let element: ReactElement = <></>;

    switch(props.value) {
        case 0:
            element = <Environment />;
            break;
        case 1:
            element = <WorkM1 trigger={props.value}/>;
            break;
        default:
            break;
    }

    return (
        <div className="work">
            {element}
        </div>
    );
}

export default Work;