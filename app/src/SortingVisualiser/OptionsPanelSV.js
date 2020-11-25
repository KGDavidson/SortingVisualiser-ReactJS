import React, {useState} from 'react';
import './OptionsPanelSV.css';

const OptionsPanel = (props) => {
    const [isStarted, SetStarted] = useState(false);

    const StartSort = () => {
        if (props.sampleSize !== 0) {
            SetStarted(!isStarted);
            props.StartSort(!isStarted);
        }
    }

    const ReturnSampleSize = (value) => {
        SetStarted(false);
        props.SampleSizeSet(value);
    }

    const ReturnInputValue = (e) => {
        var value = e.target.value;
        if (value < 1) {
            value = 1;
        }
        if (value > 100) {
            value = 100;
        }
        e.target.value = value;
        ReturnSampleSize(value);
    }

    const ReturnSortAlg = (e) => {
        props.SortAlgSet(e.target.value);
    }

    const ReturnSpeed = (e) => {
        props.SortSpeedSet(e.target.value);
    }

    return (
        <div className="OptionsPanel">
            <h1>SORTING VISUALISER</h1>
            <h3>Sample Size
                <br/>
                <input className="ssInput" onChange={e => {ReturnInputValue(e)}} type="number" defaultValue={1}/>
            </h3>
            <br/>
            <h3>Sorting Algorithm
                <br/>
                <select onChange={e => {ReturnSortAlg(e)}}>
                    <option value="0">Bubble Sort</option>
                    <option value="1">Insertion Sort</option>
                    <option value="2">Quick Sort</option>
                    <option value="3">Merge Sort</option>
                </select>    
            </h3>
            <br/>
            <h3>Sorting Speed
                <br/>
                <input onChange={e => {ReturnSpeed(e)}} className="slider" type="range" min="0" max="0.99" step="0.01"/>
            </h3>
            <br/>
            <button onClick={StartSort}>{isStarted ? "Reset" : "Start"}</button>
        </div>
    );
}

export default OptionsPanel;