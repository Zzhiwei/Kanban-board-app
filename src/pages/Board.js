import React, { useRef, useState, useEffect, useCallback } from 'react'
import Task from '../components/Task'
import '../css/App.css'

//in modular js, function is not added to global object property
function getDragAfterElement(container, dropYCoordinate) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  const taskToPlaceAboveOf = draggableElements.reduceRight((closest, taskBox) => {
    const box = taskBox.getBoundingClientRect()
    const offsetBtwTaskAndDrop = dropYCoordinate - box.top - box.height / 2
    if (offsetBtwTaskAndDrop < 0 ) {
      //negative offsetBtwTaskAndDrop means drop is above element
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
  const DATA_STORAGE_NAME = "boardData"
  const [boardData, setBoardData] = useState(null);
  const taskType = {
    TODO: "todo",
    IN_PROGRESS: "inProgress",
    DONE: "done"
  }

  /*
  1)using a param for boardData instead of using state directly
  removes dependency of children
  2)DATA_STORAGE_NAME is constant => so don't need add dependency?
  */
  const saveBoardData = (boardData) => {
    localStorage.setItem(DATA_STORAGE_NAME, JSON.stringify(boardData))
  }

  
  useEffect(() => {  
    //retrieve data
    const storageData = localStorage.getItem(DATA_STORAGE_NAME)

    if (storageData) { 
      const boardData = JSON.parse(storageData)
      setBoardData(boardData)
    }
  }, [])
    
    /*
    ```window.addEventListener('beforeunload', saveThisBoardData)```
    This method is unnecessary as every time user drags and drops, a callback is triggered to save data
    The implementation of this involves an unsolved problem of accessing latest boardData state 
    Note the use of useRef to try to access latest state can't work because we are dependent on useState to trigger action
    after each state change
    */
    

  //save data to storage every time boardData changes
  useEffect(() => {
    if (!boardData) {
      return 
    }
    saveBoardData(boardData)
  }, [boardData])

  /*
  There is absolutely no need to use useCallback here honestly, there is no "callback" 
  happening here. Use it only when children depends on a function being passed down
  */
  const getTodoTasks = () => {
    if (!boardData) {
      return
    }
    return boardData.todo
  }

  const getDoneTasks = () => {
    if (!boardData) {
      return
    }
    return boardData.inProgress
  }

  const getInProgressTasks = () => {
    if (!boardData) {
      return
    }
    return boardData.done
  }


  
  useEffect(() => {
    const containers = document.querySelectorAll('.board__draggable-container')

    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()

        const dropYCoordiante = e.clientY;
        const taskToPlaceAboveOf = getDragAfterElement(container, dropYCoordiante)
        const isAboveSomeTask = taskToPlaceAboveOf != null
        
        const draggable = document.querySelector('.dragging')
        const taskType = draggable.attributes.taskType.value
        debugger

        const draggableIndex = draggable.attributes.index.value

        //index of start [1][2]
        //index of end [0][2]
        
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
                  getTodoTasks()?.map((task, id) => (
                    <Task key={id} description={task} taskType={taskType.TODO} />
                  ))
                }
              </div>
            </div>
            <div className="board__column board__in-progress">
              <h1 className="board__column-title">
                In progress
              </h1>
              <div className="board__draggable-container">
                {
                  getInProgressTasks()?.map((task, id) => (
                    <Task key={id} description={task} taskType={taskType.IN_PROGRESS} />
                  ))
                }
              </div>
            </div>
            <div className="board__column board__done">
              <h1 className="board__column-title">
              
                Done
              </h1>
              <div className="board__draggable-container">
                {
                  getDoneTasks()?.map((task, id) => {
                    debugger
                    return (
                      //interestingly key is need here, but is undefined inside the child component itself
                      <Task key={id} index={id} description={task} taskType={taskType.DONE} />
                    )
                  })
                }
              </div>
            </div>
          </div>

      </div>
    </main> 
  )
}
