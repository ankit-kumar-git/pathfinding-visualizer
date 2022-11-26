import React from 'react';
import './Dropdown.css';
import {useState} from 'react';

function Dropdown({title,list}) {
  const [open,setOpen]=useState(false);

  const handleOpen=()=>{
    setOpen(!open);
  };
  // handleClick(menuItems){
  //   this.setState({open:false});
  // }

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleOpen}>{title}<span> &#9662;</span></button>
      {open?(
        <ul className="menu"> 
          {list.map((menuItems,index)=>(
            <li key={index} className="menu-items">
              <button onClick={()=>this.handleClick(menuItems)}>{menuItems}</button>
            </li>
          ))} 
        </ul>
      ):null}
    </div>
    
  )
}

export default Dropdown