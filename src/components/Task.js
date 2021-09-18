import React, { useRef, useEffect } from 'react'
import '../css/Task.css'



export default function Task({ index, description, taskType, endPosition, setBoardData }) {
  // debugger
  const draggableRef = useRef()

  useEffect(() => { 
    const draggable = draggableRef.current

    const dragStartCallback = e => {
      draggable.classList.add('dragging')
    }

    

    const dragEndCallback = e => {
      draggable.classList.remove('dragging')
      // debugger 
      
      
      setBoardData(prev => {
        const updateData = (boardData, startPosition, endPosition) => {
          // debugger
          const startArray = boardData[startPosition.taskType]
          const movingTask = startArray.splice(startPosition.draggableIndex, 1)
          const endArray =  boardData[endPosition.taskType]
          endArray.splice(endPosition.draggableIndex, 0, movingTask[0])
        }

        // debugger
        
        const startPosition = {
          taskType,
          draggableIndex: index
        }        
        const dataCpy = {
          todo: [...prev.todo],
          inProgress: [...prev.inProgress],
          done: [...prev.done]
        }
        updateData(dataCpy, startPosition, endPosition.current)
        return dataCpy
      })
    }
    

    draggable.addEventListener('dragstart', dragStartCallback)

    //taskGetting rerendered after setState, nv unmount? 
    draggable.addEventListener('dragend', dragEndCallback)

    return () => {
      draggable.removeEventListener('dragstart', dragStartCallback)
      draggable.removeEventListener('dragend', dragEndCallback)
    }

    
  }, [])

  return (
    <div ref={draggableRef} className="task draggable" draggable="true" taskType={taskType} index={index} >
      {description}
    </div>
  )
}

