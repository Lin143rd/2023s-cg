import React, { useState } from 'react';
import Title from './components/title';
import Menu from './components/menu';
import Content from './components/content';
import "./style/header.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [radioValue, setRadioValue] = useState<number>(0);
  return (
    <>
      <header className='header'>
        <Title path="./index.html" />
        <Menu radioValue={radioValue} setRadioValue={setRadioValue} />
      </header>
      <Content radioValue={radioValue}/>
    </>
  );
}

export default App;
