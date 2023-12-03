import Canvas from './Canvas'
import React, {useState, useEffect} from 'react'
import Slider from 'react-input-slider'
// https://www.npmjs.com/package/react-input-slider
import Switch from "react-switch";
// https://www.npmjs.com/package/react-switch
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

  const [ForceTube, setForceTube] = useState(params.get('force_tube')  === "true");
  
  const [Bipod, setBipod] = useState(params.get('bipod')  === "true");

  const [BipodOffset, setBipodOffset] = useState(parseInt(params.get('bipod_offset')) || 500);

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
    + `&strap_mount_offset_1=${StrapMountOffsets[1]}`
    + `&force_tube=${ForceTube}`
    + `&bipod=${Bipod}`
    + `&bipod_offset=${BipodOffset}`;
    
    window.history.pushState({}, "", url + params);
  },[Bipod, BipodOffset, StockPivotAngles, CheekRestHeight, CupPivotAngles, CupOffsets, StrapMountOffsets, ForceTube]);

  const sliderStyles = {    
    track: {
      width: "190px",
    },
    active: {
      backgroundColor: '#eb651a'
    }
  }

  return <div className="App">
    <h2>ProTubeVR MagTube Gunstock Configurations Beta</h2>
    <h4>substatica (<a href="https://youtube.com/substatica" target="_blank">youtube.com/substatica</a>)</h4>
    <span>Configure your <a href="https://www.protubevr.com/" target="_blank">ProTubeVR</a> MagTube stock and either download and save the result, or share/bookmark the URL which updates with your changes. Source available on <a href="https://github.com/substatica/magtube-config/" target="_blank">GitHub</a>.</span>
    <div>
      <label>
        <div className="LabelDiv">Stock Pivot Angles</div>
        <div className="SliderDiv"><Slider styles={sliderStyles} stylesaxis="x" xmin={ForceTube ? 0 : -90} xmax={90} x={StockPivotAngles[0]} onChange={({x}) => setStockPivotAngles([x, StockPivotAngles[1], StockPivotAngles[2]])} /><span className="InputValue">{StockPivotAngles[0]}&deg;</span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={-180} xmax={180} x={StockPivotAngles[1]} onChange={({x}) => setStockPivotAngles([StockPivotAngles[0], x, StockPivotAngles[2]])} /><span className="InputValue">{StockPivotAngles[1]}&deg;</span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={-180} xmax={180} x={StockPivotAngles[2]} onChange={({x}) => setStockPivotAngles([StockPivotAngles[0], StockPivotAngles[1], x])} /><span className="InputValue">{StockPivotAngles[2]}&deg;</span></div>
      </label>
    </div>    
    <div>
      <label>
        <div className="LabelDiv">Cup Offsets <span className="OrangeDot"></span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={0} xmax={525} x={CupOffsets[0]} onChange={({x}) => setCupOffsets([x, CupOffsets[1]])} /><span className="InputValue">{CupOffsets[0]}</span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={0} xmax={525} x={CupOffsets[1]} onChange={({x}) => setCupOffsets([CupOffsets[0], x])} /><span className="InputValue">{CupOffsets[1]}</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Cup Pivot Angles</div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={-180} xmax={0} x={CupPivotAngles[0]} onChange={({x}) => setCupPivotAngles([x, CupPivotAngles[1]])} /><span className="InputValue">{CupPivotAngles[0]}&deg;</span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={-180} xmax={0} x={CupPivotAngles[1]} onChange={({x}) => setCupPivotAngles([CupPivotAngles[0], x])} /><span className="InputValue">{CupPivotAngles[1]}&deg;</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Strap Mount Offsets <span className="GreyDot"></span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={0} xmax={525} x={StrapMountOffsets[0]} onChange={({x}) => setStrapMountOffsets([x, StrapMountOffsets[1]])} /><span className="InputValue">{StrapMountOffsets[0]}</span></div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={0} xmax={525} x={StrapMountOffsets[1]} onChange={({x}) => setStrapMountOffsets([StrapMountOffsets[0], x])} /><span className="InputValue">{StrapMountOffsets[1]}</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Cheek Rest Height</div>
        <div className="SliderDiv"><Slider styles={sliderStyles} axis="x" xmin={0} xmax={125} x={CheekRestHeight} onChange={({x}) => setCheekRestHeight(x)} /><span className="InputValue">{CheekRestHeight}</span></div>
      </label>
    </div>
    <div>
      <label>
        <div className="LabelDiv">Bipod</div>
        <div className="SliderDiv">
          <Switch activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0)" onColor="#eb651a" checked={Bipod} onChange={() => setBipod(!Bipod)} />
        </div>
      </label>
        <div className="SliderDiv">
          <Slider styles={sliderStyles} axis="x" xmin={0} xmax={525} x={BipodOffset} onChange={({x}) => setBipodOffset(x)} />
          <span className="InputValue">{BipodOffset}</span>
        </div>
      
    </div>
    <div>
      <label>
        <div className="LabelDiv">ForceTube Module</div>
        <div className="SliderDiv"><Switch activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0)" onColor="#eb651a" checked={ForceTube} onChange={() => setForceTube(!ForceTube)} /></div>
      </label>
    </div>
    <Canvas Height="750" Width="750" Bipod={Bipod} BipodOffset={BipodOffset} ForceTube={ForceTube} StockPivotAngles={StockPivotAngles} CheekRestHeight={CheekRestHeight} CupPivotAngles={CupPivotAngles} CupOffsets={CupOffsets} StrapMountOffsets={StrapMountOffsets}/>
  </div>
}

export default App