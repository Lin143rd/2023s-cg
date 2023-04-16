import React, { ReactElement } from "react";
import WorkM1 from "./workm1";

function Work(props: {value: number})
{
    let element: ReactElement = <></>;

    switch(props.value) {
        case 0:
            element = <WorkM1 />;
    }

    return element;
}

export default Work;