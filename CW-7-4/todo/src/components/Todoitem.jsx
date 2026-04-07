import React from "react";

const Todoitem = (props) =>{
    return (
          <li className="todo-item">
            <span>
                
                 {props.completed ? <></> : <input type="checkbox"/> }   
<span className="todo-itemtext">{props.text}</span>
                
            </span>
          </li>
                );
};

export default Todoitem;