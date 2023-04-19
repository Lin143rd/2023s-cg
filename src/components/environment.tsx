import React from "react";
import Caption from "./caption";
import config from "../config.json"

function Environment() {
    const caption = config.content[0].caption[0]
    return (
        <Caption title={caption.title} explanation={caption.explanation} />
    )
}

export default Environment;