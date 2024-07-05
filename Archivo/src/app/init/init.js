'use client';
import { useState } from 'react'
import ControlComponent from '../component/ControlComponent/ControlComponent'
import Counter from '../component/Counter/Counter'
import RoofComponent from '../component/RoofComponent/RoofComponent'
import config from '../config/config.json';
import writeConfig from '../utils/writeConfig';



function Init() {

  const [activeCounter, setActiveCounter] = useState(false);
  const [timeRoof, setTimeRoof] = useState(0); 

  const evtRoof = async (action) => {  
    const roofs = [];
    const eventRoof = (id) => {
        fetch(`http://${id}/${action}`)
    }
    config.roof.forEach((el) => {
        roofs.push(eventRoof(el));
    });
    Promise.allSettled(roofs);
}

  const roofEvent = (roof) => {
    if (roof.level > config.currentPosition) {
        const action = 'open';
        if (config.currentPosition === 0) {
            setTimeRoof(roof.seconds);
            evtRoof(action);
            setActiveCounter(true)
        } else {
            const secondsValue = roof.level - config.currentPosition;
            setTimeRoof(secondsValue);
            evtRoof(action);
            setActiveCounter(true)
        }
    }

    if (roof.level < config.currentPosition) {
        const action = 'close';
        const secondsValue = config.currentPosition -  roof.level;
        setTimeRoof(secondsValue);
        evtRoof(action);
        setActiveCounter(true)
    }
    writeConfig(roof.level);
  }

  const finishEvent = () => {
    setActiveCounter(false);
    setTimeRoof(0);
    evtRoof('none');
  }

  return (
    <main>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Roof</h3>
      </div>
      <RoofComponent/>
      <ControlComponent onEventRoof={roofEvent}/>
      {activeCounter && <Counter timeRoof={timeRoof} onFinish={finishEvent} />}
    </main>
  )
}

export default Init
