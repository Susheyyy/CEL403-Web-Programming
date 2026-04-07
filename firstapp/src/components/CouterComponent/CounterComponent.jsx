import React from 'react'
import { useState } from 'react';

function CounterComponent() {
    const[count,setcount]=useState(15);
    const[value,setvalue]=useState("React");
  return (
    <>
      <p>Count Components - {count}</p>
      <h6>Number is {count%2===0?"even":"odd"}</h6>
      <h6>Value is {value}</h6>
      <button onClick={value}>Change</button>
      <button onClick={()=>setcount(count+1)}>Increment</button>
      <button onClick={()=>setcount(count-1)}>Decrement</button>
    </>
  )
}

export default CounterComponent
