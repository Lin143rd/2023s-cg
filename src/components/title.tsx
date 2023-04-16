import React from 'react';
import "../style/title.css";

function Title(props: {path: string}) {
  return (
    <a href={props.path} className='title'>2023s-cg</a>
  );
}

export default Title;
