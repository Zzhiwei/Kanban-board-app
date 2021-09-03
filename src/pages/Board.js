import React from 'react'
import Task from '../components/Task'
import '../css/App.css'

export default function Board() {
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
              <Task description="Eat sleep code repeat" />
            </div>
            <div className="board__column board__in-progress">
              <h1 className="board__column-title">
                In progress
              </h1>
            </div>
            <div className="board__column board__done">
              <h1 className="board__column-title">
                Done
              </h1>
            </div>
          </main>

      </div>
    </main> 
  )
}
