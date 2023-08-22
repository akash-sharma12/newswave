import React, { useEffect, useState } from 'react';

function UseEffectHook() {

const [counter, setCounter] = useState(0);
const [name, setName] = useState('');

// cleanup work done here  by using following function
function callThisOnUnmount() {

}


useEffect(() => {
 console.log(name, 'name updated');


return callThisOnUnmount();

}, [ name])


useEffect(() => {
    console.log('first time mounted function');
}, [])


useEffect(() =>{
   console.log('re-rendering happened');
})



  return (
    <div style={{textAlign: 'center', height: '300px', width:'1400px'}} >
        <p>{counter}</p>
        <input type="text" onChange={(e) => setName(e.target.value)} />
    <button onClick = {() => setCounter(counter+1)} >Increment</button>

{/* 
    <select name="" id="">
  {arr.map((element) => {
    return <option>choose {element}</option>
  })}
</select> */}

    </div>
  );
}

export default UseEffectHook;