import React, {useEffect, useState} from 'react';
import OptionsPanel from './OptionsPanelSV'
import BarPanel from './BarPanel'
import './SortingVisualiser.css';

var isStarted = false;

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

    const Pause = () => { 
        return new Promise(resolve => { 
            setTimeout(() => { 
                resolve(); 
            }, sortSpeed); 
        }); 
    }

    const SetStarted = (i) => {
        isStarted = i;
    }

    const SampleSizeSet = (sampleSizeVal) => {
        isStarted = false;
        SetSampleSize(sampleSizeVal);
        SetDataValues(Array.from({length: sampleSizeVal}, () => Math.floor(Math.random() * 92) + 1));
    }

    const SortAlgSet = (sortAlgVal) => {
        SetSortAlg(sortAlgVal);
      }
  
    const SortSpeedSet = (sortSpeedVal) => {
        SetSortSpeed(100 * (1 - sortSpeedVal));
    }

    const StartSort = (isStartedVal) => {
        SetStarted(isStartedVal);
        if (isStarted) {
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

    const QuickSortPartitionData = async (dataValuesTemp, low, high) => {
        var i = low - 1;
        const pivot = dataValuesTemp[high];
        
        SetCurrentCheck([]);
        SetCurrentSwitching([]);

        for (var j = low; j < high; j++) {
            SetCurrentCheck([i, j]);
            await Pause();
            if (dataValuesTemp[j] < pivot) {
                SetCurrentSwitching([i, j]);
            await Pause();
            i += 1;
            const temp = dataValuesTemp[i];
            dataValuesTemp[i] = dataValuesTemp[j];
            dataValuesTemp[j] = temp;
            SetDataValues(Array.from(dataValuesTemp));
            await Pause();
            }
            
            if (!isStarted) {
            break;
            }
        }

        const temp = dataValuesTemp[i+1];
        dataValuesTemp[i+1] = dataValuesTemp[high];
        dataValuesTemp[high] = temp;
        
        SetDataValues(Array.from(dataValuesTemp));
        await Pause();

        return (dataValuesTemp, i+1);
    }

    const MergeSortMergeArrays = async (arr, start, mid, end) => {
        SetCurrentSwitching([]);
        if (isStarted) {
            const n1 = mid - start + 1;
            const n2 = end - mid;

            var L = [];
            var R = [];
            
            for (var i = 0; i < n1; ++i){
                L[i] = arr[start + i];
            }

            for (var j = 0; j < n2; ++j){
                R[j] = arr[mid + 1 + j];
            }


            var i = 0;
            var j = 0;
            var k = start;

            while (i < n1 && j < n2) {
                SetCurrentSwitching([k]);
                SetCurrentCheck([start + i, mid + 1 + j]);
                await Pause();
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
                await Pause();
                i++;
                k++;
                SetDataValues(Array.from(arr));
            }

            while (j < n2) {
                arr[k] = R[j];
                SetCurrentSwitching([k]);
                await Pause();
                j++;
                k++;
                SetDataValues(Array.from(arr));
            }
        }
    }

    const BubbleSort = async (dataValuesTemp, l) => {
        var flag = 1;
        while (flag !== 0){
            flag = 0;
            for (var i = 0; i < l - 1; i++){
                SetCurrentSwitching([]);
                SetCurrentCheck([i, i+1]);
                await Pause();
                if (dataValuesTemp[i] > dataValuesTemp[i+1]) {
                    flag = 1;
                    var temp = dataValuesTemp[i];
                    dataValuesTemp[i] = dataValuesTemp[i+1];
                    dataValuesTemp[i+1] = temp;
                    SetCurrentSwitching([i, i+1]);
                    await Pause();
                    SetDataValues(Array.from(dataValuesTemp));
                }
                await Pause();
                if (!isStarted) {
                    break;
                }
            }
            if (!isStarted) {
                break;
            }
        }
        SetCurrentSwitching([]);
        SetCurrentCheck([]);
        SetDataValues(Array.from(dataValuesTemp));
        await Pause();
    }

    const InsertionSort = async (dataValuesTemp, l) => {
        for (var i = 1; i < l; i++) {
            SetCurrentSwitching([]);
            const temp = dataValuesTemp[i];
            SetCurrentCheck([i]);
            await Pause();
            var j = i - 1;
            while (j >= 0 && temp < dataValuesTemp[j]){
                dataValuesTemp[j + 1] = dataValuesTemp[j];
                SetDataValues(Array.from(dataValuesTemp));
                SetCurrentCheck([j + 1, j]);
                await Pause();
                j -= 1;

                SetCurrentSwitching([j+1]);
                dataValuesTemp[j + 1] = temp;
                SetDataValues(Array.from(dataValuesTemp));
                await Pause();
                if (!isStarted) {
                    break;
                }
            }
            
            if (!isStarted) {
                break;
            }
        }
        SetCurrentSwitching([]);
        SetCurrentCheck([]);
        SetDataValues(Array.from(dataValuesTemp));
        await Pause();
    }

    const QuickSort = async (dataValuesTemp, low, high) => {
        if (low < high && isStarted) {
            var dataValuesTemp, pi = await QuickSortPartitionData(dataValuesTemp, low, high);
            SetDataValues(Array.from(dataValuesTemp));

            await Pause();
            await QuickSort(dataValuesTemp, low, pi - 1);
            await QuickSort(dataValuesTemp, pi + 1, high);
        }

        SetCurrentCheck([]);
        SetCurrentSwitching([]);
        SetDataValues(Array.from(dataValuesTemp));
    }

    const MergeSort = async (dataValuesTemp, start, end) => {
        if(start < end && isStarted) {
            const mid = parseInt((start + end) / 2);
            SetCurrentCheck([start, mid]);
            await Pause();
            await MergeSort(dataValuesTemp, start, mid);
            SetCurrentCheck([end, mid+1]);
            await Pause();
            await MergeSort(dataValuesTemp, mid+1, end);
            await MergeSortMergeArrays(dataValuesTemp, start, mid, end);
        }

        SetDataValues(Array.from(dataValuesTemp));
        SetCurrentCheck([]);
        SetCurrentSwitching([]);
    }

    return (
        <div className="SortingVisualiser">
            <OptionsPanel SampleSizeSet={SampleSizeSet} SortAlgSet={SortAlgSet} StartSort={StartSort} SortSpeedSet={SortSpeedSet} sampleSize={sampleSize} SetStarted={SetStarted}/>
            <BarPanel sampleSize={sampleSize} dataValues={dataValues} currentCheck={currentCheck} currentSwitching={currentSwitching}/>
        </div>
    );
}

export default SortingVisualiser;