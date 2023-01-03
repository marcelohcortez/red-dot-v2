import { useState } from 'react'

import './App.scss'

function App() {
  const [dotsList, setDotsList] = useState([])
  const [undoList, setUndoList] = useState([])

  const detectClick = (event: { clientX: number; clientY: number }) => {
    const newDot = {clientX: event.clientX, clientY: event.clientY} //capture the X and Y of the clicked point

    setDotsList((prev) => [...prev, newDot]) //spread the current value and add the new dot value to the end of it
  }

  const undoClick = (event) => {
    event.stopPropagation() //don't allow dots on top of the button

    if (dotsList.length === 0) return //if there are no dots, return
    
    const lastItem = dotsList[dotsList.length - 1] //get the last item from the dotsList

    setUndoList((prev) => [...prev, lastItem]) //spread the current value and add the new dot value to the end of it

    setDotsList((prev) => {
      const copyDotsList = [...prev].slice(0, -1) //spread the current value and remove the last value
      return copyDotsList
    })
  }

  const redoClick = (event) => {
    event.stopPropagation() //don't allow dots on top of the button

    if (undoList.length === 0) return //if there are no dots on the undoList, return
    
    const lastItem = undoList[undoList.length - 1] //get the last item from the undoList

    setDotsList((prev) => [...prev, lastItem]) //spread the current value and add the new dot value to the end of it

    setUndoList((prev) => {
      const copyUndoList = [...prev].slice(0, -1) //spread the current value and remove the last value
      return copyUndoList
    })
  }

  return (
    <div className="App" onClick={ detectClick }>
      <button onClick={ undoClick }>UNDO</button>
      <button onClick={ redoClick }>REDO</button>
      
      { dotsList.map((dot, index) => (
        <span key={index} className="redDot" style={{ left: dot.clientX, top: dot.clientY}}></span>
      ))}
      
    </div>
  )
}

export default App
