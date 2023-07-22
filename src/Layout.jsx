import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./assets/images/logo6_edited.png"
export default function Layout({component:Component}) {
  
  return (
    <>
           <Link to="/">
        <div className="p-3 ">
           
           <img src={logo}/>
       
       </div>
    </Link>

    <Component/>
    </>
 
    
  )
}
