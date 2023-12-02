import Canvas from './Canvas'
import React, {useState, useEffect} from 'react'
import Slider from 'react-input-slider'
import './App.css'

const App = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);

  const [StockPivotAngles, setStockPivotAngles] = useState([
    parseInt(params.get('stock_pivot_angle_0')) || 35,
    parseInt(params.get('stock_pivot_angle_1')) || -60,
    parseInt(params.get('stock_pivot_angle_2')) || 45,
  ]);

  const [CheekRestHeight, setCheekRestHeight] = useState(parseInt(params.get('cheek_rest_height')) || 50);

  const [CupPivotAngles, setCupPivotAngles] = useState([
    parseInt(params.get('cup_pivotangle_0')) || -45,
    parseInt(params.get('cup_pivotangle_1')) || -40
  ]);

  const [CupOffsets, setCupOffsets] = useState([
    parseInt(params.get('cup_offset_0')) || 250,
    parseInt(params.get('cup_offset_1')) || 475
  ]);

  const [StrapMountOffsets, setStrapMountOffsets] = useState([
    parseInt(params.get('strap_mount_offset_0')) || 50,
    parseInt(params.get('strap_mount_offset_1')) || 425
  ]);

  useEffect(() => {
    const url = window.location.href.split('?')[0];
    const params = `?stock_pivot_angle_0=${StockPivotAngles[0]}`
    + `&stock_pivot_angle_1=${StockPivotAngles[1]}`
    + `&stock_pivot_angle_2=${StockPivotAngles[2]}`
    + `&cheek_rest_height=${CheekRestHeight}`
    + `&cup_pivotangle_0=${CupPivotAngles[0]}`
    + `&cup_pivotangle_1=${CupPivotAngles[1]}`
    + `&cup_offset_0=${CupOffsets[0]}`
    + `&cup_offset_1=${CupOffsets[1]}`
    + `&strap_mount_offset_0=${StrapMountOffsets[0]}`
    + `&strap_mount_offset_1=${StrapMountOffsets[1]}`;
    
    window.history.pushState({}, "", url + params);
  },[StockPivotAngles, CheekRestHeight, CupPivotAngles, CupOffsets, StrapMountOffsets]);
  
  return <div className="App">
    <h2>ProTubeVR MagTube Gunstock Configurations Beta</h2>
    <h4>substatica (<a href="http://youtube.com/substatica">http://youtube.com/substatica</a>)</h4>
    <span>Configure your stock and either download and save the result, or share or bookmark the URL which updates with your changes.</span>
    <div>
      <label>
        <div className="LabelDiv">Stock Pivot Angles</div>
        <div className="SliderDiv"><Slider axis="x" xmin={-180} xmax={180} x={StockPivotAngles[0]} onChange={({x}) => setStockPivotAngles([x, StockPivotAngles[1], StockPivotAngles[2]])} /><span className="InputValue">{StockPivotAngles[0]}&deg;</span></div>
        <div className="SliderDiv"><Slider axis="x" xmin={-180} xmax={180} x={StockPivotAngles[1]} onChange={({x}) => setStockPivotAngles([StockPivotAngles[0], x, StockPivotAngles[2]])} /><span className="InputValue">{StockPivotAngles[1]}&deg;</span></div>
        <div className="SliderDiv"><Slider axis="x" xmin={-180} xmax={180} x={StockPivotAngles[2]} onChange={({x}) => setStockPivotAngles([StockPivotAngles[0], StockPivotAngles[1], x])} /><span className="InputValue">{StockPivotAngles[2]}&deg;</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Cup Pivot Angles</div>
        <div className="SliderDiv"><Slider axis="x" xmin={-180} xmax={180} x={CupPivotAngles[0]} onChange={({x}) => setCupPivotAngles([x, CupPivotAngles[1]])} /><span className="InputValue">{CupPivotAngles[0]}&deg;</span></div>
        <div className="SliderDiv"><Slider axis="x" xmin={-180} xmax={180} x={CupPivotAngles[1]} onChange={({x}) => setCupPivotAngles([CupPivotAngles[0], x])} /><span className="InputValue">{CupPivotAngles[1]}&deg;</span></div>
      </label>
    </div>    
    <div>
      <label>
        <div className="LabelDiv">Cup Offsets &#128308;</div>
        <div className="SliderDiv"><Slider axis="x" xmin={0} xmax={525} x={CupOffsets[0]} onChange={({x}) => setCupOffsets([x, CupOffsets[1]])} /><span className="InputValue">{CupOffsets[0]}</span></div>
        <div className="SliderDiv"><Slider axis="x" xmin={0} xmax={525} x={CupOffsets[1]} onChange={({x}) => setCupOffsets([CupOffsets[0], x])} /><span className="InputValue">{CupOffsets[1]}</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Strap Mount Offsets &#128994;</div>
        <div className="SliderDiv"><Slider axis="x" xmin={0} xmax={525} x={StrapMountOffsets[0]} onChange={({x}) => setStrapMountOffsets([x, StrapMountOffsets[1]])} /><span className="InputValue">{StrapMountOffsets[0]}</span></div>
        <div className="SliderDiv"><Slider axis="x" xmin={0} xmax={525} x={StrapMountOffsets[1]} onChange={({x}) => setStrapMountOffsets([StrapMountOffsets[0], x])} /><span className="InputValue">{StrapMountOffsets[1]}</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Cheek Rest Height</div>
        <div className="SliderDiv"><Slider axis="x" xmin={0} xmax={125} x={CheekRestHeight} onChange={({x}) => setCheekRestHeight(x)} /><span className="InputValue">{CheekRestHeight}</span></div>
      </label>
    </div>
    <Canvas Height="750" Width="750" StockPivotAngles={StockPivotAngles} CheekRestHeight={CheekRestHeight} CupPivotAngles={CupPivotAngles} CupOffsets={CupOffsets} StrapMountOffsets={StrapMountOffsets}/>
  </div>
}

export default App