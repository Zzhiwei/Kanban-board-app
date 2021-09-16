import React, { useRef, useEffect } from 'react'
import '../css/Task.css'

export default function Task({ index, description, taskType }) {
  debugger
  const draggableRef = useRef()

  useEffect(() => {
    const draggable = draggableRef.current
    draggable.addEventListener('dragstart', e => {
      draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', e => {
      draggable.classList.remove('dragging')
    })
  }, [])


  return (
    <div ref={draggableRef} className="task draggable" draggable="true" taskType={taskType} index={index} >
      {description}
    </div>
  )
}
