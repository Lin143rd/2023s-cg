import React from "react";
import config from "../config.json"
import Work from "../work/work"
import "../style/content.css"

function Content(props: {radioValue: number})
{
    const radios = config.content;
    return (
        <div className="content">
            {radios.map((radio, idx) => {
                return (props.radioValue === radio.value && 
                    <Work key={idx} value={radio.value} />
                )}
            )}
        </div>
    );
}

export default Content;