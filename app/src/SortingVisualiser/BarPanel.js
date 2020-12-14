import React from 'react';
import './BarPanel.css';

const BarPanel = (props) => {
    const GenBars = () => {
        var barWidth = 70 / props.sampleSize;
        var barsArray = [];
        var barColour = "ea5455";
        for (var i = 0; i < props.sampleSize; i++) {
            barColour = "ea5455";
            if (props.currentCheck.includes(i)) {
                barColour = "f07b3f";
            }
            if (props.currentSwitching.includes(i)) {
                barColour = "e8e8e8";
            }
            barsArray.push(Bar(barWidth, props.dataValues[i], barColour))
        }
        return (barsArray);
    }
    
    const Bar = (barWidth, dataValues, barColour) => {
        return (
            <div style={{width: + barWidth + 'vw', height: dataValues + 'vh', marginTop: 93 - dataValues + 'vh', backgroundColor: '#' + barColour}} className="Bar"></div>
        );
    }
    
    return (
        <div className="BarPanel">
                {GenBars()}
        </div>
    );
}

export default BarPanel;