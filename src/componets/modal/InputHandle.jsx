import React,{useState} from 'react'

export default function InputHandle() {
    const [allcheck, setAllCheck] = useState(false)
  return (
   
    <input type="checkbox"  checked={allcheck} onClick={()=>{setAllCheck(!allcheck)}} />
   
  )
}
 