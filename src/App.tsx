import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import {TooltipComponentOption} from 'echarts/components';
import data from "./data/data";
import {EChartsOption} from "echarts-for-react/src/types";


type Unified<T> = Exclude<T, T[]>;
type TooltipFormatterCallback = Exclude<NonNullable<TooltipComponentOption['formatter']>, string>;
// single and multiple params
type TooltipFormatterParams = Parameters<TooltipFormatterCallback>[0];
// single params
type SingleTooltipFormatterParams = Unified<TooltipFormatterParams>;
// multiple params
type MultipleTooltipFormatterParams = SingleTooltipFormatterParams[];

function App() {
    let option: EChartsOption;
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    const names = ["В программе ЦП", "В программе ИТ", "Вне программ ЦП", "Вне программ ИТ"];
    const periods = ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'];

    function labelLayout(params: any) {
        return {
            x: params.rect.x + 10,
            y: params.rect.y + params.rect.height / 2,
            verticalAlign: 'middle',
            align: 'left'
        }
    }

    const valueFormatter = (value: number) => (value + ' шт.');

    const formatter = (params: MultipleTooltipFormatterParams) => {
        const projectsValue: number[] = [];
        const projectsNames: string[] = [];
        params.map(p => {
            projectsValue.push(p.value as number);
            projectsNames.push(p.seriesName as string);
        });
        const projectIn = projectsValue[0] + projectsValue[1];
        const sumValue = projectsValue.reduce((prev, cur) => prev + cur);
        const projectOut = projectsValue[2] + projectsValue[3];

        const formattedList = (from: number, to: number) => {
            let list = '';
            for (let i = from; i <= to; i++) {
                list += `<span>${projectsNames[i]}
                    <div>${valueFormatter(projectsValue[i])}</div></span>`
            }
            return list;
        }

        return ` <b>${params[0].name}</b><br/>
            <div>В программе ${Math.round(projectIn / sumValue * 100)}% | ${valueFormatter(projectIn)}</div>
            ${formattedList(0, 1)}
            <b>Вне программ</b> ${Math.round(projectOut / sumValue * 100)}% | ${valueFormatter(projectOut)}<br/>
           ${formattedList(2, 3)}`
    }

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
    // console.log(data1)
    option = {
        legend: {
            data: names,
            bottom: '0',
            icon: "circle"
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
            trigger: "axis",
            //{a} for series name, {b} for category name, {c} for data value, {d} for none
            formatter,
            // `<b>{b}</b>
            // <br/>
            // <b>В программе</b>
            // <br/>
            // {c0} + {c1} шт.
            // <br/>
            // {c0}{b1}: {c1}`
        },
        // dataset: {
        //     dimensions: ["", "В программе ЦП", "В программе ИТ", "Вне программ ЦП", "Вне программ ИТ"],
        //     source: data
        // },
        xAxis: {
            data: periods,
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
                label: {
                    show: true,
                    position: 'top',
                    // valueAnimation: true
                },
                tooltip: {
                    valueFormatter,
                },
                // barWidth: '50%'
                // barGap: '5%',
                // barCategoryGap: '50%'
            },
            {
                name: names[1],
                type: 'bar',
                stack: 'one',
                data: data2,
                label: {
                    show: true,
                    position: 'top',
                },
                tooltip: {
                    valueFormatter
                },
            },
            {
                name: names[2],
                type: 'bar',
                stack: 'two',
                data: data3,
                label: {
                    show: true,
                    position: 'top',
                },
                tooltip: {
                    valueFormatter
                },
            },
            {
                name: names[3],
                type: 'bar',
                stack: 'two',
                data: data4,
                label: {
                    show: true,
                    position: 'top',
                },
                labelLayout: {
                    dataIndex: 1,
                    seriesIndex: 2
                },
                tooltip: {
                    valueFormatter
                },
            }
        ],
        color: ["#56B9F2", "#0078D2", "#22C38E", "#00724C"]
    }

    return (
        <ReactEcharts
            option={option}
        />
    );
}

export default App;
