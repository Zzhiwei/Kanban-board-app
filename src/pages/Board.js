import React, { useRef, useEffect, useCallback } from 'react'
import Task from '../components/Task'
import '../css/App.css'


function getDragAfterElement(container, dropYCoordinate) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  const taskToPlaceAboveOf = draggableElements.reduceRight((closest, taskBox) => {
    const box = taskBox.getBoundingClientRect()
    const offsetBtwTaskAndDrop = dropYCoordinate - box.top - box.height / 2
    if (offsetBtwTaskAndDrop < 0 ) {
      //if drop is above element, return the element
      return taskBox
    } else {
      return closest
    }
  }, null)
  return taskToPlaceAboveOf
}

/*
I am using vanilla js to do the drag N drop entirely,

If i were to do it with react, I would keep a state of what each container has,
then at drop event change state causing rerender.
*/

export default function Board() {

  const renderTodoTasks = useCallback(() => {
    console.log("rendering todo tasks")
  },[])

  const renderDoneTasks = useCallback(() => {
    console.log("rendering done tasks")
  },[])

  const renderInProgressTasks = useCallback(() => {
    console.log("rendering in progress tasks")
  },[])
  

  
  useEffect(() => {
    const containers = document.querySelectorAll('.board__draggable-container')
    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const dropYCoordiante = e.clientY;
        const taskToPlaceAboveOf = getDragAfterElement(container, dropYCoordiante)
        const isAboveSomeTask = taskToPlaceAboveOf != null
        const draggable = document.querySelector('.dragging')
        if (!isAboveSomeTask) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, taskToPlaceAboveOf)
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
          <div className="board__columns">
            <div className="board__column board__todo">
              <h1 className="board__column-title">
                Todo
              </h1>
              <div className="board__draggable-container">
                {
                  renderTodoTasks()
                }
                <Task description="1" />
                <Task description="2" />

              </div>
            </div>
            <div className="board__column board__in-progress">
              <h1 className="board__column-title">
                In progress
              </h1>
              <div className="board__draggable-container">
                {
                  renderInProgressTasks()
                }
                <Task description="3" />
              </div>
            </div>
            <div className="board__column board__done">
              <h1 className="board__column-title">
              {
                  renderDoneTasks()
                }
                Done
              </h1>
              <div className="board__draggable-container">
                <Task description="4" />
              </div>
            </div>
          </div>

      </div>
    </main> 
  )
}
