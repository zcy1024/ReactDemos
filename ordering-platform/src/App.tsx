import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { increment, decrement, addNum } from "./store/modules/counterStore"
import { fetchChanelList } from "./store/modules/channelStore"

function App() {
  const {count} = useSelector((state: any) => state.counter)
  const {channelList} = useSelector((state: any) => state.channel)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChanelList())
  }, [dispatch])

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addNum(10))}>+10</button>
      <button onClick={() => dispatch(addNum(20))}>+20</button>
      <ul>
        {
          channelList.map((item: any) => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App
