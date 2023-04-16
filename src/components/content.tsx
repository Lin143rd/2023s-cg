import React from "react";
import config from "../config.json"
import "../style/content.css"
import Work from "../work/work"

function Content(props: {radioValue: number})
{
    const radios = config.button;
    return (
        <div className="content">
            {radios.map((radio, idx) => (
                props.radioValue === radio.value && (
                    <Work value={radio.value} key={idx}/>
                )
            ))}
        </div>
    );
}

export default Content;