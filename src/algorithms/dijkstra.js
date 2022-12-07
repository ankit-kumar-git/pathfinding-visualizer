export const dijkstra=(grid,startNode,finishNode)=>{
    console.log('hello1');
    const visitedNodesInOrder=[];
    startNode.distance=0;
    const unvisitedNodes=getUnvisitedNodes(grid);

    while(unvisitedNodes.length){
        sortUnvisitedNodesByDistance(unvisitedNodes);
        const nearestNode=unvisitedNodes.shift();

        if(nearestNode.isWall==true) continue;

        //When further movement not possible from the node and we are trapped
        if(nearestNode.distance===Infinity) return visitedNodesInOrder;

        nearestNode.isVisited=true;
        visitedNodesInOrder.push(nearestNode);

        if(nearestNode===finishNode) return visitedNodesInOrder;

        updateUnvisitedNearestNodeNeighbours(nearestNode,grid);

    }
};

const getUnvisitedNodes=(grid)=>{
    const unvisitedNodes=[];
    for(const row of grid){
        for(const node of row){
            unvisitedNodes.push(node);
        }
    }
    return unvisitedNodes;
};
const sortUnvisitedNodesByDistance=(unvisitedNodes)=>{
    unvisitedNodes.sort((nodeA,nodeB)=>
        nodeA.distance-nodeB.distance
    );
};

const updateUnvisitedNearestNodeNeighbours=(nearestNode,grid)=>{
    const neighbourNodes=getUnvisitedNeighbourNodes(nearestNode,grid);
    for(const nodes of neighbourNodes){
        nodes.distance=nearestNode.distance+1;
        nodes.previousNode=nearestNode;
    }
};

const getUnvisitedNeighbourNodes=(nearestNode,grid)=>{
    const requiredNodes=[];
    const {row,col}=nearestNode;

    if(row>0){
        if(grid[row-1][col].isVisited==false) requiredNodes.push(grid[row-1][col]);
    }

    if(row<grid.length-1){
        if(grid[row+1][col].isVisited==false) requiredNodes.push(grid[row+1][col]);
    }

    if(col>0){
        if(grid[row][col-1].isVisited==false) requiredNodes.push(grid[row][col-1]);
    }

    if(col<grid[0].length-1){
        if(grid[row][col+1].isVisited==false) requiredNodes.push(grid[row][col+1]);
    }

    return requiredNodes;
};


export const getShortestPathNodesInOrder=(finishNode)=>{
    console.log('hello2');
    const requiredNodes=[];
    let currNode=finishNode;
    while(currNode!==null){
        requiredNodes.unshift(currNode);
        currNode=currNode.previousNode;
    }
    return requiredNodes;
};
