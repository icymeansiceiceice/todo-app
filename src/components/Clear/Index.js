import React from 'react'

export default function Clear({clearComplete}) {
  return (
        <div>
          <button className="button" onClick={clearComplete}>Clear completed</button>
        </div>
  )
}
