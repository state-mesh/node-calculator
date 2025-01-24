import React, {useState} from "react";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './index.css';
import {Card} from "primereact/card";
import {Slider} from "primereact/slider";
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";

const averageDaysInMonth = 30.437;
const averageHoursInAMonth = averageDaysInMonth * 24;


export default function App() {
    const SAFETZY_FACTOR = 1.25;
    const OVERCOMMIT_FACTOR = 2;

    const AVG_CPU_PRICE_EU = 0.0035, AVG_RAM_PRICE_EU = 0.0005;
    const AVG_CPU_PRICE_SG = 0.0067, AVG_RAM_PRICE_SG = 0.0012;
    const NODE_COST_EU = 220, NODE_COST_SG = 710;

    const [cpuCount, setCpuCount] = useState(96);
    const [memGb, setMemGb] = useState(256);
    const [zone, setZone] = useState("eu");
    const [usage, setUsage] = useState(100);
    const [nodeCost, setNodeCost] = useState(NODE_COST_EU);

    let sellPricePerHour = 0;
    switch (zone) {
        case "eu": {
            sellPricePerHour = cpuCount * OVERCOMMIT_FACTOR * AVG_CPU_PRICE_EU + memGb * AVG_RAM_PRICE_EU;
            break;
        }
        case "sg": {
            sellPricePerHour = cpuCount * OVERCOMMIT_FACTOR * AVG_CPU_PRICE_SG + memGb * AVG_RAM_PRICE_SG;
            break;
        }
    }
    const sellPricePerMonth = sellPricePerHour * averageHoursInAMonth * SAFETZY_FACTOR * usage / 100;
    const revenuePerMonth = sellPricePerMonth - nodeCost < 0 ? 0 : sellPricePerMonth - nodeCost;

    return (
        <div className='p-3'>
            <div className='flex flex-column gap-1 pb-2 md:pb-4'>
                <p className='font-semibold m-0 text-2xl'>Estimate your revenue</p>
                <p className='text-sm text-600 m-0'>Estimate your revenue as a Node Operator</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex align-items-center">
                    <RadioButton inputId="eu" name="eu" value="eu"
                                 onChange={(e) => {
                                     setZone(e.value)
                                     if (e.value === 'eu') {
                                         setNodeCost(NODE_COST_EU)
                                     } else {
                                         setNodeCost(NODE_COST_SG)
                                     }
                                 }} checked={zone === 'eu'}/>
                    <label htmlFor="ingredient1" className="ml-2">Europe</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="sg" name="eu" value="sg"
                                 onChange={(e) => {
                                     setZone(e.value)
                                     setZone(e.value)
                                     if (e.value === 'eu') {
                                         setNodeCost(NODE_COST_EU)
                                     } else {
                                         setNodeCost(NODE_COST_SG)
                                     }
                                 }} checked={zone === 'sg'}/>
                    <label htmlFor="ingredient2" className="ml-2">Singapore</label>
                </div>
            </div>

            <div className='flex flex-column gap-2 pt-3 md:pt-0'>
                <p className='m-0 font-bold text-xl'>Cost of your node</p>
                <p className="m-0 text-sm font-medium text-600">Monthly cost of your node in $</p>
            </div>
            <div className='flex align-items-center justify-content-between gap-2 px-2 pb-2 md:pb-4'>
                <Slider className='w-full' value={nodeCost} min={1} max={2000} step={1}
                        onChange={(e) => setNodeCost(e.value)}/>
                <InputText className='w-4rem text-xl font-bold text-center' value={nodeCost.toString()}
                           onChange={(e) => setNodeCost(Number(e.target.value))}/>
            </div>

            <div className='flex flex-column gap-2 pt-3 md:pt-0'>
                <p className='m-0 font-bold text-xl'>Node Occupation</p>
                <p className="m-0 text-sm font-medium text-600">Percent of node occupation</p>
            </div>
            <div className='flex align-items-center justify-content-between gap-2 px-2 pb-2 md:pb-4'>
                <Slider className='w-full' value={usage} min={1} max={100} step={1}
                        onChange={(e) => setUsage(e.value)}/>
                <InputText className='w-4rem text-xl font-bold text-center' value={usage.toString()}
                           onChange={(e) => setUsage(Number(e.target.value))}/>
            </div>

            <div className='flex flex-column gap-2 pt-3 md:pt-0'>
                <p className='m-0 font-bold text-xl'>CPU Threads</p>
                <p className="m-0 text-sm font-medium text-600">The total number of threads your CPU has.</p>
                <p className="m-0 text-sm font-medium text-600">Virtual machines have 1 thread per CPU, while bare-metal machines typically have <i className='font-semibold'>2 * number of CPUs * number of CPU cores</i></p>
            </div>
            <div className='flex align-items-center justify-content-between gap-2 px-2 pb-2 md:pb-4'>
                <Slider className='w-full' value={cpuCount} min={1} max={100} step={1}
                        onChange={(e) => setCpuCount(e.value)}/>
                <InputText className='w-4rem text-xl font-bold text-center' value={cpuCount.toString()}
                           onChange={(e) => setCpuCount(Number(e.target.value))}/>
            </div>

            <div className='flex flex-column gap-2'>
                <p className='m-0 font-bold text-xl'>Memory</p>
                <p className="m-0 text-sm font-medium text-600">The total amount of RAM your node has</p>
            </div>
            <div className='flex align-items-center justify-content-between gap-2 px-2 pb-2 md:pb-4'>
                <Slider className='w-full' value={memGb} min={1} max={512} step={1}
                        onChange={(e) => setMemGb(e.value)}/>
                <InputText className='w-4rem text-xl font-bold text-center' value={memGb.toString()}
                           onChange={(e) => setMemGb(Number(e.target.value))}/>
            </div>

            <div
                className="flex flex-column pb-3 md:p-1 md:flex-row align-items-center md:justify-content-center border-round-md w-full mt-5"
                style={{border: '1px solid #2c9b27'}}>
                <div>
                    <img className='w-7rem'
                         src='https://sm-price-calculator.s3.eu-central-1.amazonaws.com/logo.jpg'/>
                </div>
                <div className='flex flex-column align-items-center justify-content-center md:align-items-start gap-2'>
                    <p className='m-0 text-lg font-bold'>Estimated Revenue</p>
                    <div>
                        <span className='text-2xl font-bold' style={{color: '#2c9b27'}}>${revenuePerMonth.toFixed(2)}</span>
                        <span className='font-medium text-lg'> / month</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

