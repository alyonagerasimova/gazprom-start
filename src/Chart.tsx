import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {TooltipComponentOption} from 'echarts/components';
import data from "./data/data";
import {EChartsOption} from "echarts-for-react/src/types";

type Unified<T> = Exclude<T, T[]>;
type TooltipFormatterCallback = Exclude<NonNullable<TooltipComponentOption['formatter']>, string>;
type TooltipFormatterParams = Parameters<TooltipFormatterCallback>[0];
type SingleTooltipFormatterParams = Unified<TooltipFormatterParams>;
type MultipleTooltipFormatterParams = SingleTooltipFormatterParams[];
const names = ["В программе ЦП", "В программе ИТ", "Вне программ ЦП", "Вне программ ИТ"];
const periods = ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'];
type ParamType = {
    name: string,
    value: number,
    color: string
};
const color = ["#56B9F2",
    "#0078D2",
    "#22C38E",
    "#00724C"];


const valueFormatter = (value: number) => (value + ' шт.');

const formatter = (params: MultipleTooltipFormatterParams) => {
    let projectsValue: number[] = [];
    let projectIn: ParamType[] = [];
    let projectOut: ParamType[] = [];
    params.map(p => {
        projectsValue.push(p!.value as number);
        if (p?.seriesName?.includes("В программе")) {
            projectIn.push({
                name: p.seriesName,
                value: p.value as number,
                color: p.color as string
            });
        }
        if (p?.seriesName?.includes("Вне программ")) {
            projectOut.push({
                name: p.seriesName,
                value: p.value as number,
                color: p.color as string
            });
        }

    });

    let projectInSumValue: number = 0;
    for (let elem of projectIn) {
        projectInSumValue += elem.value;
    }
    let projectOutSumValue: number = 0;
    for (let elem of projectOut) {
        projectOutSumValue += elem.value;
    }

    const sumValue = projectsValue.reduce((prev, cur) => prev + cur);
    const formattedList = (projectInOrOut: ParamType[]) => {
        let list = '';
        for (let elem of projectInOrOut) {
            list += `<div style="margin-left: 0">
                            <div style="display: flex;align-items: center;">
                                <div style="
                                height: 12px; 
                                width: 12px;
                                border-radius: 50%; 
                                background-color:${elem.color};
                                margin-right: 8px"
                                ></div>
                                <div>${elem.name}</div>
                                <div style="font-weight: bold; position:absolute; right: 8px">
                                    ${valueFormatter(elem.value)}
                                 </div>
                            </div>
                            
                        </div>`
        }
        return list;
    }

    return `<div style="width: 191px; 
                            height: 189px; 
                            display: flex; 
                            border-radius: 4px; 
                            justify-content: space-evenly;
                            align-content: space-around;
                            flex-direction: column;
                            color: #002033;
                            font-size: 12px;">
            <div style="font-weight: bold; text-align: left">${params[0].name}</div>
            <div style="display: flex; justify-content: space-between;font-weight: bold;">
                <div>В программе</div>
                <div style=" position:absolute; right: 8px">${Math.round(projectInSumValue / sumValue * 100)}% | ${valueFormatter(projectInSumValue)}</div>
            </div>
            <div>${formattedList(projectIn)}</div>
            <div style="display: flex; justify-content: space-between;font-weight: bold;">
                <div>Вне программ</div>
                <div>${Math.round(projectOutSumValue / sumValue * 100)}% | ${valueFormatter(projectOutSumValue)}</div>
            </div>
            <div>${formattedList(projectOut)}</div>
            </div>`
}


function Chart() {
    let option: EChartsOption;
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];

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
            bottom: '0',
            icon: "circle"
        },
        grid: {
            width: 'auto',
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            formatter,
        },
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
                },
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
            }
        ],
        color
    }

    return (
        <ReactEcharts
            option={option}
        />
    );
}

export default Chart;
