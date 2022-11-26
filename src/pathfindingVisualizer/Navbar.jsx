import React from 'react'
import Dropdown from './Dropdown';
import './Navbar.css';

function Navbar() {
  const algos=['Dijkstras Algorithm','A*Seacrh','Dfs'];
  const mazes=['maze1','maze2','maze3','maze4'];
  const speed=['fast','medium','slow'];
  return (
    <div className="navbar">
        <h3>Pathfinding Visualizer</h3>
        <Dropdown title={'Algorithms'} list={algos}/>
        <Dropdown title={'Maze&Patterns'} list={mazes}/>
        <button className='nav-buttons'>Add bomb</button>
        <button className='nav-buttons extra'>Visualize!</button>
        <button className='nav-buttons'>Clear Path</button>
        <button className='nav-buttons'>Clear Walls & Weights</button>
        <button className='nav-buttons'>Clear Board</button>
        <Dropdown title={'Speed'} list={speed}/>
    </div>
  )
}

export default Navbar