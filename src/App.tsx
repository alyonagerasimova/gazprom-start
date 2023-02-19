import React, {CSSProperties} from 'react';
import './App.css';
import Chart from "./Chart";


// const style: CSSProperties = {
//     width: "191px",
//     height: "189px",
//     borderRadius: "4px",
//     display: "flex",
//     justifyContent: "space-around",
//     flexDirection: "column",
// }

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
