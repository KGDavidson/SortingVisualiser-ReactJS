import React from 'react';
import './BarPanel.css';

const BarPanel = (props) => {
    const GenBars = () => {
        var barWidth = 70 / props.sampleSize;
        var barsArray = [];
        var barColour = "66fcf1";
        for (var i = 0; i < props.sampleSize; i++) {
            barColour = "66fcf1";
            if (props.currentCheck.includes(i)) {
                barColour = "E03616";
            }
            if (props.currentSwitching.includes(i)) {
                barColour = "62AB37";
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