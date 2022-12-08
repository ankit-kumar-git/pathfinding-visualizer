import React,{useState} from 'react'
import Navbar from './Navbar';
import Node from './Node';
import './PathfindingVisualizer.css';
import {dijkstra,getShortestPathNodesInOrder} from '../algorithms/dijkstra';

const start_node_row=8;
const start_node_col=10;
const finish_node_row=3;
const finish_node_col=26;

const getInitialGrid=()=>{
  const grid=[];
  for(let row=0;row<=15;row++){
    const currRow=[];
    for(let col=0;col<40;col++){
      currRow.push(createNode(col,row));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode=(col,row)=>{
  return{
    col,
    row,
    isStart: row === start_node_row && col===start_node_col,
    isFinish: row === finish_node_row && col===finish_node_col,
    isWall:false,
    isVisited:false,
    previousNode:null,
    distance:Infinity,
  };
};

const getNewGridWithWallToggled=(grid,row,col)=>{
  const newGrid=grid.slice();
  const node=newGrid[row][col];
  const newNode={
    ...node,
    isWall:!node.isWall,
  };
  newGrid[row][col]=newNode;
  return newGrid;
};

export default function PathfindingVisualizer() {
  const [grid,setGrid]=useState(getInitialGrid());
  const [isMousePressed,setIsMousePressed]=useState(false);


  const handleMouseEnter=(row,col)=>{
    console.log('MouseEnter');
    if(!isMousePressed) return;
    const newGrid=getNewGridWithWallToggled(grid,row,col);
    setGrid={newGrid};
  };

  const handleMouseDown=(row,col)=>{
    console.log('Mouse Down');
    const newGrid=getNewGridWithWallToggled(grid,row,col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseUp=()=>{
    console.log('Mouse Up');
    setIsMousePressed(false);
  };

  const animateShortestPath=(shortestPathNodesInOrder)=>{
    console.log('hello4');
    const len=shortestPathNodesInOrder?.length || 0;
    for(let i=0;i<len;i++){
      setTimeout(()=>{
        const currNode=shortestPathNodesInOrder[i];
      document.getElementById(`node-${currNode.row}-${currNode.col}`).className='node node-shortestPath';
      },50*i);
    }
  };

  const animateDijkstra=(visitedNodesInOrder,shortestPathNodesInOrder)=>{
    console.log('hello3');
    const len=visitedNodesInOrder?.length || 0;
    for(let i=0;i<=len;i++){
      if(i<len){
        setTimeout(()=>{
          const node=visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
        },10*i);
      }
      else{
        setTimeout(()=>{
          animateShortestPath(shortestPathNodesInOrder);
        },10*i);
        return;
      }
    }
    
  };
  const visualizeDijkstra=()=>{
    console.log('hello');
    const startNode=grid[start_node_row][start_node_col];
    const finishNode=grid[finish_node_row][finish_node_col];

    const visitedNodesInOrder=dijkstra(grid,startNode,finishNode);
    const shortestPathNodesInOrder=getShortestPathNodesInOrder(finishNode);
    console.log(visitedNodesInOrder);
    console.log(shortestPathNodesInOrder);
    animateDijkstra(visitedNodesInOrder,shortestPathNodesInOrder);
  };


  return (
    <>
    <Navbar/>
    <button onClick={()=>visualizeDijkstra()} className='btn'>Visualize Dijkstra</button>
    <div className="grid">
      {grid.map((row,rowId)=>{
        return(
          <div key={rowId} className='grid-row'>
            {row.map((node,nodeId)=>{
              const {row,col,isStart,isFinish,isWall}=node;
              return(
                <Node
                key={nodeId}
                col={col}
                row={row}
                isStart={isStart}
                isFinish={isFinish}
                isWall={isWall}
                isMousePressed={isMousePressed}
                onMouseDown={(row,col)=>handleMouseDown(row,col)}
                onMouseEnter={(row,col)=>handleMouseEnter(row,col)}
                onMouseUp={()=>handleMouseUp()}
                >
                </Node>
              );
            })}
          </div>
        )
      })}
    </div>
    </>
  )
}



