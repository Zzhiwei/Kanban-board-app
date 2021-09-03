import React from 'react'
import '../css/Task.css'

export default function Task({ description }) {
  return (
    <div className="task">
      {description}
    </div>
  )
}
