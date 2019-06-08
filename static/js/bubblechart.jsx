"use-strict";

import BubbleChart from '@weknow/react-bubble-chart-d3';
import {TONE_COLORS} from './constants.jsx'
import '../css/bubblechart.css';
function Bubble(props) {
    const tones = props.tone_data;
    // console.log('tones', tones);
    const obj_list = [];
    const data = tones.map(tone => {
      obj_list.push({
          label:tone.tone,
          value:tone.score,
          color:TONE_COLORS[tone.tone]
      })
    });
    // console.log('obj_list', obj_list);
    return (
      <div className="col-md-auto col-lg-auto" id="bubblechart">
      <BubbleChart id='bubble-chart-jsx'
      graph= {{
        zoom: 0.4,
        offsetX: 0.05,
        offsetY: 0.01,
      }}
      width={600}
      height={200}
      padding={0} // optional value, number that set the padding between bubbles
      showLegend={false} // optional value, pass false to disable the legend.
      legendPercentage={20} // number that represent the % of with that legend going to use.
      legendFont={{
          family: 'Arial',
          size: 12,
          color: '#000',
          weight: 'bold'
      }}
      showValue={false}
      valueFont={{
          family: 'Arial',
          size: 9,
          color: '#fff',
          weight: 'bold',
      }}
      labelFont={{
          family: 'Arial',
          size: 14,
          color: '#fff',
          weight: 'bold',
      }}
      data={obj_list}
    />
    </div>)
}

export default Bubble;