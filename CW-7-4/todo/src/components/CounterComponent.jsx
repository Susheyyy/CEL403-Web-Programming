import React, {useState} from "react";

const CounterComponent = () => {
    const[count,setCount] = useState(15);
    const[value, setValue] = useState("React");
return (
    <div>
        <p>Count Components - {count}</p>
        <h6>Number is {count %2 ==0? "Even" : "Odd"}</h6>
        <h6>Value is {value}</h6>
        <button onClick={value}>Change</button>
        <button onClick={ () => setCount(count+1)}>Increment</button>
        <button onClick={ () => setCount(count-1)}>Decrement</button>
    </div>
);
};

export default CounterComponent;
