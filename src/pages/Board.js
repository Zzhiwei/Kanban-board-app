import React, { useRef, useEffect } from 'react'
import Task from '../components/Task'
import '../css/App.css'

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduceRight((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 ) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

export default function Board() {
  
  
  useEffect(() => {
    const containers = document.querySelectorAll('.board__draggable-container')
    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const isAfterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (isAfterElement == null) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, isAfterElement)
        }
      })
    })

  }, [])


  return (
    <main className="board">
      <div className="max-width">
          <header className="heading board__heading">
          ~ Your board name ~
          </header>
          <main className="board__columns">
            <div className="board__column board__todo">
              <h1 className="board__column-title">
                Todo
              </h1>
              <div className="board__draggable-container">
                <Task description="Eat sleep code repeat" />
                <Task description="Eat sleep code repeat" />

              </div>
            </div>
            <div className="board__column board__in-progress">
              <h1 className="board__column-title">
                In progress
              </h1>
              <div className="board__draggable-container">
                <Task description="Eat sleep code repeat" />
              </div>
            </div>
            <div className="board__column board__done">
              <h1 className="board__column-title">
                Done
              </h1>
              <div className="board__draggable-container">
                <Task description="Eat sleep code repeat" />
              </div>
            </div>
          </main>

      </div>
    </main> 
  )
}
