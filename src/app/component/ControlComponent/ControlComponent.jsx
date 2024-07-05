import config from '../../config/config.json'

export default function ControlComponent(props) {

  const handledEvent = (roof) => {
    if (config.currentPosition !== roof.level) {
      props.onEventRoof(roof);
    }
  }

  return (
    <div className="w-full flex flex-wrap gap-1">
        {config.times.map((el, indx) => (
                // eslint-disable-next-line react/prop-types
                <button onClick={() => handledEvent(el)} key={indx} className="w-[48%] h-[100px] rounded-xl bg-lime-600 hover:bg-lime-500 text-2xl font-bold text-white">
                   {el.tag}
               </button>
        ))}
    </div>
  )
}
