import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import data from "./data/data";

function App() {
    let option;
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    const names = ["В программе ЦП", "В программе ИТ", "Вне программ ЦП", "Вне программ ИТ"];
    const periods = ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'];

    for (let i = 0; i < data.length; i++) {
        if (data[i].name === names[0]) {
            data1.push(data[i].value);
        }
        if (data[i].name === names[1]) {
            data2.push(data[i].value);
        }
        if (data[i].name === names[2]) {
            data3.push(data[i].value);
        }
        if (data[i].name === names[3]) {
            data4.push(data[i].value);
        }
    }
    option = {
        legend: {
            data: names,
            bottom: '0'
        },
        // toolbox: {
        //     feature: {
        //         magicType: {
        //             type: ['stack']
        //         },
        //         dataView: {}
        //     }
        // },
        grid: {
           width: 'auto',
            containLabel: true,
        },
        tooltip: {
            trigger: "axis"
        },
        // dataset: {
        //     dimensions: ["", "В программе ЦП", "В программе ИТ", "Вне программ ЦП", "Вне программ ИТ"],
        //     source: data
        // },
        xAxis: {
            data: periods,
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(3,3,3,0.57)"
                }

            }
        },
        yAxis: {},
        series: [
            {
                name: names[0],
                type: 'bar',
                stack: 'one',
                data: data1,
                // barWidth: '50%'
                // barGap: '5%',
                // barCategoryGap: '50%'
            },
            {
                name: names[1],
                type: 'bar',
                stack: 'one',
                data: data2,
            },
            {
                name: names[2],
                type: 'bar',
                stack: 'two',
                data: data3,
            },
            {
                name: names[3],
                type: 'bar',
                stack: 'two',
                data: data4,
            }
        ],
        color: ["#56B9F2","#0078D2", "#22C38E","#00724C"]
    }

    return (
        <ReactEcharts
            option={option}
        />
    );
}

export default App;
