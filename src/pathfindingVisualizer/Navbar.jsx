import React from 'react'
import Dropdown from './Dropdown';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
        <h3>Pathfinding Visualizer</h3>
        <Dropdown>Algorithms</Dropdown>
        <Dropdown>Maze & Patterns</Dropdown>
        <button className='nav-buttons'>Add bomb</button>
        <button className='nav-buttons extra'>Visualize!</button>
        <button className='nav-buttons'>Clear Path</button>
        <button className='nav-buttons'>Clear Walls & Weights</button>
        <button className='nav-buttons'>Clear Board</button>
        <Dropdown>Speed</Dropdown>
    </div>
  )
}

export default Navbar