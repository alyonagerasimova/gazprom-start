import React from 'react';
import './App.css';
import Chart from "./Chart";

function App() {
    return (
        <div className="app">
            <h1>Проекты в программах и вне программ</h1>
            <p>Сумма и процентное соотношение проектов, находящихся в программах и вне программ</p>
            <div className="app__chart">
                <Chart/>
            </div>
        </div>
    );
}

export default App;
