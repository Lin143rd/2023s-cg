import React, { Dispatch, SetStateAction } from 'react';
import "../style/menu.css";
import config from "../config.json"
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from 'react-bootstrap/ToggleButton';

interface Props {
    radioValue: number,
    setRadioValue: any
}

function Menu(props: Props) {
    const radios = config.content;
    return (
        <ButtonGroup className="buttongroup" defaultValue={props.radioValue}>
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-secondary"
                    name="radio"
                    value={radio.value}
                    checked={props.radioValue === radio.value}
                    onChange={(e) => {props.setRadioValue(Number(e.target.value))}}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}

export default Menu;
