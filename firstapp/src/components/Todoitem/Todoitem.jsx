import React from 'react'

function Todoitem(props) {
  return (
    <>
      <li className='todo-item'>
        <span>
            {props.completed?<></>:<input type='checkbox' />}
            <span className='todo-itemtext' >{props.text}</span>
        </span>
        <p>...</p>
      </li>
    </>
  )
}

export default Todoitem
