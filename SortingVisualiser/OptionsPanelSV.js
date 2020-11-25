import React, {useState} from 'react';
import './OptionsPanelSV.css';

function OptionsPanel(props) { 
    const [started, setStarted] = useState(false);

    function startButton() {
        if (props.sampleSize !== 0) {
            setStarted(!started);
            props.startButton(!started);
        }
    }

    function returnSampleSize(value){
        setStarted(false);
        props.sampleSizeSet(value);
    }

    function returnInputValue(e) {
        var value = e.target.value;
        if (value < 1) {
            value = 1;
        }
        if (value > 100) {
            value = 100;
        }
        e.target.value = value;
        returnSampleSize(value);
    }

    function returnSortAlg(e) {
        props.sortAlgSet(e.target.value);
    }

    function returnSpeed(e) {
        props.sortSpeedSet(e.target.value);
    }

    return(
        <div className="OptionsPanel">
            <h1>SORTING VISUALISER</h1>
            <h3>Sample Size
                <br/>
                <input className="ssInput" onChange={e => {returnInputValue(e)}} type="number" defaultValue={1}/>
            </h3>
            <br/>
            <h3>Sorting Algorithm
                <br/>
                <select onChange={e => {returnSortAlg(e)}}>
                    <option value="0">Bubble Sort</option>
                    <option value="1">Insertion Sort</option>
                    <option value="2">Quick Sort</option>
                    <option value="3">Merge Sort</option>
                </select>    
            </h3>
            <br/>
            <h3>Sorting Speed
                <br/>
                <input onChange={e => {returnSpeed(e)}} className="slider" type="range" min="0" max="0.99" step="0.01"/>
            </h3>
            <br/>
            <button onClick={startButton}>{started ? "Reset" : "Start"}</button>
        </div>
    );
}

export default OptionsPanel;