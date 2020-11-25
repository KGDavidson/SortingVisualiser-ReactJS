import React, {useEffect, useState} from 'react';
import './SortingVisualiser.css';
import OptionsPanel from './OptionsPanelSV'
import BarPanel from './BarPanel'

var started = false;

function SortingVisualiser() {
  useEffect(() => {
    document.title = "Sorting Visualiser"
  }, []);

  const [sampleSize, setSampleSize] = useState(1);
  const [sortAlg, setSortAlg] = useState("0");
  const [sortSpeed, setSortSpeed] = useState(100);
  const [dataValues, setDataValues] = useState([]);
  const [currentCheck, setCurrentCheck] = useState([]);
  const [currentSwitching, setCurrentSwitching] = useState([]);

  function setStarted(i) {
    started = i;
  }

  const sampleSizeSet = (sampleSizeVal) => {
    started = false;
    setSampleSize(sampleSizeVal);
    setDataValues(Array.from({length: sampleSizeVal}, () => Math.floor(Math.random() * 92) + 1));
  }

  const sortAlgSet = (sortAlgVal) => {
    setSortAlg(sortAlgVal);
  }

  const sortSpeedSet = (sortSpeed) => {
    setSortSpeed(100 * (1 - sortSpeed));
  }

  const StartSort = (started) => {
    setStarted(started);
    console.log(sortAlg);
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

  var wait = function() { 
    return new Promise(resolve => { 
        setTimeout(function() { 
        resolve(); 
        }, sortSpeed); 
    }); 
  };

  var BubbleSort = async function(dataValuesTemp, l) {
    var flag = 1;
    while (flag !== 0){
      flag = 0;
      for (var i = 0; i < l - 1; i++){
        setCurrentSwitching([]);
        setCurrentCheck([i, i+1]);
        await wait();
        if (dataValuesTemp[i] > dataValuesTemp[i+1]) {
          flag = 1;
          var temp = dataValuesTemp[i];
          dataValuesTemp[i] = dataValuesTemp[i+1];
          dataValuesTemp[i+1] = temp;
          setCurrentSwitching([i, i+1]);
          await wait();
          setDataValues(Array.from(dataValuesTemp));
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
    setCurrentSwitching([]);
    setCurrentCheck([]);
    setDataValues(Array.from(dataValuesTemp));
    await wait();
  }

  var InsertionSort = async function(dataValuesTemp, l) {
    for (var i = 1; i < l; i++) {
      setCurrentSwitching([]);
      setCurrentCheck([]);
      var temp = dataValuesTemp[i];
      setCurrentCheck([i]);
      await wait();
      var j = i - 1;
      while (j >= 0 && temp < dataValuesTemp[j]){
        dataValuesTemp[j + 1] = dataValuesTemp[j];
        setDataValues(Array.from(dataValuesTemp));
        setCurrentCheck([j + 1, j]);
        await wait();
        j -= 1;

        setCurrentSwitching([j+1]);
        dataValuesTemp[j + 1] = temp;
        setDataValues(Array.from(dataValuesTemp));
        await wait();
        if (!started) {
          break;
        }
      }
      
      if (!started) {
        break;
      }
    }
    setCurrentSwitching([]);
    setCurrentCheck([]);
    setDataValues(Array.from(dataValuesTemp));
    await wait();
  }

  var partition = async function(dataValuesTemp, low, high) {
    var i = low - 1;
    var pivot = dataValuesTemp[high];
    
    setCurrentCheck([]);
    setCurrentSwitching([]);

    for (var j = low; j < high; j++) {
      setCurrentCheck([i, j]);
      await wait();
      if (dataValuesTemp[j] < pivot) {
        setCurrentSwitching([i, j]);
        await wait();
        i += 1;
        var temp = dataValuesTemp[i];
        dataValuesTemp[i] = dataValuesTemp[j];
        dataValuesTemp[j] = temp;
        setDataValues(Array.from(dataValuesTemp));
        await wait();
      }
      
      if (!started) {
        break;
      }
    }

    var temp = dataValuesTemp[i+1];
    dataValuesTemp[i+1] = dataValuesTemp[high];
    dataValuesTemp[high] = temp;
    
    setDataValues(Array.from(dataValuesTemp));
    await wait();

    return (dataValuesTemp, i+1);
  }

  var QuickSort = async function(dataValuesTemp, low, high) {
    if (low < high && started) {
      var dataValuesTemp, pi = await partition(dataValuesTemp, low, high);
      
      setDataValues(Array.from(dataValuesTemp));
      await wait();

      await QuickSort(dataValuesTemp, low, pi - 1);
      await QuickSort(dataValuesTemp, pi + 1, high);
    }

    setCurrentCheck([]);
    setCurrentSwitching([]);

    setDataValues(Array.from(dataValuesTemp));
  }

  var merge = async function(arr, l, m, r) {
    setCurrentSwitching([]);
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
        setCurrentSwitching([k]);
        setCurrentCheck([l + i, m + 1 + j]);
        await wait();
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        setDataValues(Array.from(arr));
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        setCurrentSwitching([k]);
        await wait();
        i++;
        k++;
        setDataValues(Array.from(arr));
      }

      while (j < n2) {
        arr[k] = R[j];
        setCurrentSwitching([k]);
        await wait();
        j++;
        k++;
        setDataValues(Array.from(arr));
      }
    }
  }

  var MergeSort = async function(dataValuesTemp, start, end) {
    console.log(dataValuesTemp);
    if(start < end && started) {
      var mid = parseInt((start + end) / 2);
      setCurrentCheck([start, mid]);
      await wait();
      await MergeSort(dataValuesTemp, start, mid);
      setCurrentCheck([end, mid+1]);
      await wait();
      await MergeSort(dataValuesTemp, mid+1, end);
      await merge(dataValuesTemp, start, mid, end);
    }

    setDataValues(Array.from(dataValuesTemp));
    setCurrentCheck([]);
    setCurrentSwitching([]);
  }

  return (
    <div className="SortingVisualiser">
    <OptionsPanel sampleSizeSet={sampleSizeSet} sortAlgSet={sortAlgSet} startButton={StartSort} sortSpeedSet={sortSpeedSet} started={started} sampleSize={sampleSize} setStarted={setStarted}/>
    <BarPanel sampleSize={sampleSize} setValues={dataValues} currentCheck={currentCheck} currentSwitching={currentSwitching}/>
    </div>
  );
}

export default SortingVisualiser;