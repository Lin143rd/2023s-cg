import React from "react";
import "../style/caption.css"

function Environment() {
    return (
        <>
            <h3 className={"caption-title"}>
                環境
            </h3>
            <div className={"caption-explanation"}>
                React.js, Three.jsを使用<br/>
                <a href="https://github.com/Lin143rd/2023s-cg">
                    ソースコード
                </a>
                <br/>
                src/work/work$(assinment_number)に課題の内容を記載<br/>
                React使用につき、可読性が低いかもしれません<br/>
            </div>
        </>
    );
}

export default Environment;