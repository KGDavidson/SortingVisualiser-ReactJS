import React, {useEffect, useState} from 'react';
import OptionsPanel from './OptionsPanelSV'
import BarPanel from './BarPanel'
import './SortingVisualiser.css';

var started = false;

const SortingVisualiser = () => {
    const [sampleSize, SetSampleSize] = useState(1);
    const [sortAlg, SetSortAlg] = useState("0");
    const [sortSpeed, SetSortSpeed] = useState(100);
    const [dataValues, SetDataValues] = useState([]);
    const [currentCheck, SetCurrentCheck] = useState([]);
    const [currentSwitching, SetCurrentSwitching] = useState([]);

    useEffect(() => {
        document.title = "Sorting Visualiser"
    }, []);

    function SetStarted(i) {
        started = i;
    }

    const SampleSizeSet = (sampleSizeVal) => {
        started = false;
        SetSampleSize(sampleSizeVal);
        SetDataValues(Array.from({length: sampleSizeVal}, () => Math.floor(Math.random() * 92) + 1));
    }

    const SortAlgSet = (sortAlgVal) => {
        SetSortAlg(sortAlgVal);
      }
  
    const SortSpeedSet = (sortSpeed) => {
        SetSortSpeed(100 * (1 - sortSpeed));
    }

    const StartSort = (started) => {
        SetStarted(started);
        if (started) {
            if (sortAlg === "0") {
            BubbleSort(dataValues, dataValues.length);
            }
            if (sortAlg === "1") {
            InsertionSort(dataValues, dataValues.length);
            }
            if (sortAlg === "2") {
            QuickSort(dataValues, 0, dataValues.length - 1);
            }
            if (sortAlg === "3") {
            MergeSort(dataValues, 0, dataValues.length - 1);
            }
        }
    }

    const wait = function() { 
        return new Promise(resolve => { 
            setTimeout(function() { 
            resolve(); 
            }, sortSpeed); 
        }); 
    };

    const BubbleSort = async function(dataValuesTemp, l) {
        var flag = 1;
        while (flag !== 0){
            flag = 0;
            for (var i = 0; i < l - 1; i++){
            SetCurrentSwitching([]);
            SetCurrentCheck([i, i+1]);
            await wait();
            if (dataValuesTemp[i] > dataValuesTemp[i+1]) {
                flag = 1;
                var temp = dataValuesTemp[i];
                dataValuesTemp[i] = dataValuesTemp[i+1];
                dataValuesTemp[i+1] = temp;
                SetCurrentSwitching([i, i+1]);
                await wait();
                SetDataValues(Array.from(dataValuesTemp));
            }
            await wait();
            if (!started) {
                break;
            }
            }
            if (!started) {
            break;
            }
        }
        SetCurrentSwitching([]);
        SetCurrentCheck([]);
        SetDataValues(Array.from(dataValuesTemp));
        await wait();
    }

    const InsertionSort = async function(dataValuesTemp, l) {
        for (var i = 1; i < l; i++) {
            SetCurrentSwitching([]);
            SetCurrentCheck([]);
            var temp = dataValuesTemp[i];
            SetCurrentCheck([i]);
            await wait();
            var j = i - 1;
            while (j >= 0 && temp < dataValuesTemp[j]){
            dataValuesTemp[j + 1] = dataValuesTemp[j];
            SetDataValues(Array.from(dataValuesTemp));
            SetCurrentCheck([j + 1, j]);
            await wait();
            j -= 1;

            SetCurrentSwitching([j+1]);
            dataValuesTemp[j + 1] = temp;
            SetDataValues(Array.from(dataValuesTemp));
            await wait();
            if (!started) {
                break;
            }
            }
            
            if (!started) {
            break;
            }
        }
        SetCurrentSwitching([]);
        SetCurrentCheck([]);
        SetDataValues(Array.from(dataValuesTemp));
        await wait();
    }

    var partition = async function(dataValuesTemp, low, high) {
        var i = low - 1;
        var pivot = dataValuesTemp[high];
        
        SetCurrentCheck([]);
        SetCurrentSwitching([]);

        for (var j = low; j < high; j++) {
            SetCurrentCheck([i, j]);
            await wait();
            if (dataValuesTemp[j] < pivot) {
                SetCurrentSwitching([i, j]);
            await wait();
            i += 1;
            var temp = dataValuesTemp[i];
            dataValuesTemp[i] = dataValuesTemp[j];
            dataValuesTemp[j] = temp;
            SetDataValues(Array.from(dataValuesTemp));
            await wait();
            }
            
            if (!started) {
            break;
            }
        }

        var temp = dataValuesTemp[i+1];
        dataValuesTemp[i+1] = dataValuesTemp[high];
        dataValuesTemp[high] = temp;
        
        SetDataValues(Array.from(dataValuesTemp));
        await wait();

        return (dataValuesTemp, i+1);
    }

    const QuickSort = async function(dataValuesTemp, low, high) {
        if (low < high && started) {
            var dataValuesTemp, pi = await partition(dataValuesTemp, low, high);
            
            SetDataValues(Array.from(dataValuesTemp));
            await wait();

            await QuickSort(dataValuesTemp, low, pi - 1);
            await QuickSort(dataValuesTemp, pi + 1, high);
        }

        SetCurrentCheck([]);
        SetCurrentSwitching([]);

        SetDataValues(Array.from(dataValuesTemp));
        }

    const merge = async function(arr, l, m, r) {
        SetCurrentSwitching([]);
        if (started) {
            var n1 = m - l + 1;
            var n2 = r - m;

            var L = [];
            var R = [];
            
            for (var i = 0; i < n1; ++i){
            L[i] = arr[l + i];
            }

            for (var j = 0; j < n2; ++j){
            R[j] = arr[m + 1 + j];
            }


            var i = 0;
            var j = 0;
            var k = l;

            while (i < n1 && j < n2) {
            SetCurrentSwitching([k]);
            SetCurrentCheck([l + i, m + 1 + j]);
            await wait();
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            SetDataValues(Array.from(arr));
            k++;
            }

            while (i < n1) {
            arr[k] = L[i];
            SetCurrentSwitching([k]);
            await wait();
            i++;
            k++;
            SetDataValues(Array.from(arr));
            }

            while (j < n2) {
            arr[k] = R[j];
            SetCurrentSwitching([k]);
            await wait();
            j++;
            k++;
            SetDataValues(Array.from(arr));
            }
        }
    }

    var MergeSort = async function(dataValuesTemp, start, end) {
        if(start < end && started) {
            var mid = parseInt((start + end) / 2);
            SetCurrentCheck([start, mid]);
            await wait();
            await MergeSort(dataValuesTemp, start, mid);
            SetCurrentCheck([end, mid+1]);
            await wait();
            await MergeSort(dataValuesTemp, mid+1, end);
            await merge(dataValuesTemp, start, mid, end);
        }

        SetDataValues(Array.from(dataValuesTemp));
        SetCurrentCheck([]);
        SetCurrentSwitching([]);
    }

    return (
        <div className="SortingVisualiser">
            <OptionsPanel SampleSizeSet={SampleSizeSet} SortAlgSet={SortAlgSet} StartSort={StartSort} SortSpeedSet={SortSpeedSet} started={started} sampleSize={sampleSize} SetStarted={SetStarted}/>
            <BarPanel sampleSize={sampleSize} dataValues={dataValues} currentCheck={currentCheck} currentSwitching={currentSwitching}/>
        </div>
    );
}

export default SortingVisualiser;