import React from 'react';
import './BarPanel.css';

function BarPanel(props) {
    
    function GenBars(props) {
        var w = 70 / props.sampleSize;
        var bars = [];
        var colour = "66fcf1";
        for (var i = 0; i < props.sampleSize; i++) {
            colour = "66fcf1";
            if (props.currentCheck.includes(i)) {
                colour = "E03616";
            }
            if (props.currentSwitching.includes(i)) {
                colour = "62AB37";
            }
            bars.push(Bar(w, props.setValues[i], colour))
        }
        return (bars);
    }

    function Bar(w, setValues, colour){
        return (
            <div style={{width: + w + 'vw', height: setValues + 'vh', marginTop: 93 - setValues + 'vh', backgroundColor: '#' + colour}} className="Bar"></div>
        );
    }

    return (
        <div className="BarPanel">
                {GenBars(props)}
        </div>
    );
}
export default BarPanel;