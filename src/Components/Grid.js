import React, {useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Node from './Node'

import './Grid.css'

const useStyles = makeStyles({
    root: props => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.colums}, 1fr)`, 
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
        alignSelf: 'flex-start',
        width: props.colums * 40,
        height: props.rows * 40,
        justifyContent: 'center',
    }),
});

const setWall = (grid, col, row) => {
	grid[col][row].isWall = true;
};

const setWalls = (grid, walls) => {
	for (let i = 0; i < walls.length; i++) {
		let wall = walls[i];
		setWall(grid, wall[0], wall[1]);
	}
};

// const validNode = (grid, row, col) => {
// 	var rowLength = grid.length;
// 	var colLength = grid[0].length;
// 	if (row < 0 || row >= rowLength || col < 0 || col >= colLength) {
// 		return false;
// 	}
// 	if (grid[row][col].isWall) {
// 		return false;
// 	}
// 	return true;
// };

// const getNeighbors = (grid, row, col) => {
// 	let neighbors = [];
// 	if (validNode(grid, row, col - 1)) {
// 		neighbors.push({
// 			row: row,
// 			col: col - 1,
// 		});
// 	}
// 	if (validNode(grid, row, col + 1)) {
// 		neighbors.push({
// 			row: row,
// 			col: col + 1,
// 		});
// 	}
// 	if (validNode(grid, row - 1, col)) {
// 		neighbors.push({
// 			row: row - 1,
// 			col: col,
// 		});
// 	}
// 	if (validNode(grid, row + 1, col)) {
// 		neighbors.push({
// 			row: row + 1,
// 			col: col,
// 		});
// 	}
// 	return neighbors;
// };

// const bfs = (grid, start, end) => {

// 	var location = {
// 		row: start[0],
// 		col: start[1],
// 	};

// 	var queue = [];
// 	queue.push(location);

// 	while (queue.length) {
// 		var currentLocation = queue.shift();
// 		if (currentLocation.row === end[0] && currentLocation.col === end[1]) {
// 			return currentLocation;
// 		}
// 		grid[currentLocation.row][currentLocation.col].isVisited = true;
// 		var neighbors = getNeighbors(grid, currentLocation.row, currentLocation.col);
// 		for (let neighbor of neighbors) {
// 			if (grid[neighbor.row][neighbor.col].isVisited !== true) {
// 				queue.push(neighbor);
// 				grid[neighbor.row][neighbor.col].prevNode = currentLocation;
// 			}
// 		}
// 	}

// 	return false;
// };

// const getPath = (grid, end) => {
// 	var path = [];
// 	var currentNodeCord = {
// 		row: end[0],
// 		col: end[1],
// 	}

// 	path.push(currentNodeCord);
// 	var curRow = currentNodeCord.row;
// 	var curCol = currentNodeCord.col;
// 	var prevNodeCord = grid[curRow][curCol].prevNode;
// 	while (prevNodeCord !== null) {
// 		currentNodeCord = prevNodeCord;
// 		path.push(currentNodeCord);
// 		var curRow = currentNodeCord.row;
// 		var curCol = currentNodeCord.col;
// 		var curNode = grid[curRow][curCol];
// 		prevNodeCord = curNode.prevNode;
// 	}

// 	return path;
// };

// const drawPath = (grid, path) => {
// 	console.log('draw path')
// 	for (let i = 0; i < path.length; i++) {
// 		let nodeCord = path[i];
// 		let row = nodeCord.row;
// 		let col = nodeCord.col;
// 		grid[row][col].isPath = true;
// 	}
// };

function Grid(props) {

    let classes = useStyles(props);
    const { rows, colums } = props;

	const [Grid, setGrid] = useState([]);
	const [Path, setPath] = useState([]);

	useEffect(() => {
		initGrid();
	}, []);

	var start = [colums / 4, 6];
	var end = [colums / 2, rows - 3];
	var walls = [
		[7, 3],
		[7, 4],
		[7, 5],
		[7, 6],
		[7, 7],
		[9, 9],
		[10, 9],
		[12, 8],
		[7, 8],
		[6, 8]
	];

	const initGrid = () => {
		var grid = [];
		for (let row = 0; row < rows; row++) {
			grid.push([])
			for (let col = 0; col < colums; col++) {
				grid[row].push(createNode(col, row));
			}
		}
		setGrid(grid);
	}

	const createNode = (col, row) => {
		return {
			col,
			row,
			isStart: col === start[0] && row === start[1],
			isEnd: col === end[0] && row === end[1],
			isVisited: false,
			isWall: false,
			isPath: false,
			distance: Infinity,
			prevNode: null,
		};
	 }

	 const bfs = () => {

		var location = {
			row: start[0],
			col: start[1],
		};
	
		var queue = [];
		var i = 1;
		queue.push(location);
	
		while (queue.length) {
			var currentLocation = queue.shift();
			var row = currentLocation.row;
			var col = currentLocation.col;
			if (row === end[0] && col === end[1]) {
				getPath();
				return currentLocation;
			}

			Grid[row][col].isVisited = true;
			// setTimeout(() => {
			// 	markPath(row, col);
			// }, 40 * i);
			var neighbors = getNeighbors(row, col);
			for (let neighbor of neighbors) {
				if (Grid[neighbor.row][neighbor.col].isVisited !== true) {
					queue.push(neighbor);
					Grid[neighbor.row][neighbor.col].prevNode = currentLocation;
				}
			}
			i++;
		}
	
		console.log(Grid);
		return false;
	};

	const getNeighbors = (row, col) => {
		let neighbors = [];
		if (validNode(row, col - 1)) {
			neighbors.push({
				row: row,
				col: col - 1,
			});
		}
		if (validNode(row, col + 1)) {
			neighbors.push({
				row: row,
				col: col + 1,
			});
		}
		if (validNode(row - 1, col)) {
			neighbors.push({
				row: row - 1,
				col: col,
			});
		}
		if (validNode(row + 1, col)) {
			neighbors.push({
				row: row + 1,
				col: col,
			});
		}
		return neighbors;
	};

	const validNode = (row, col) => {
		var rowLength = Grid.length;
		var colLength = Grid[0].length;
		if (row < 0 || row >= rowLength || col < 0 || col >= colLength) {
			return false;
		}
		if (Grid[row][col].isWall) {
			return false;
		}
		return true;
	};

	const getPath = () => {
		var path = [];
		var currentNodeCord = {
			row: end[0],
			col: end[1],
		}
	
		path.push(currentNodeCord);
		var curRow = currentNodeCord.row;
		var curCol = currentNodeCord.col;
		var prevNodeCord = Grid[curRow][curCol].prevNode;
		while (prevNodeCord !== null) {
			currentNodeCord = prevNodeCord;
			path.push(currentNodeCord);
			var curRow = currentNodeCord.row;
			var curCol = currentNodeCord.col;
			var curNode = Grid[curRow][curCol];
			prevNodeCord = curNode.prevNode;
		}
		
		setPath(path.reverse());
	};

	const animateAlgorithm = () => {

	};

	const drawPath = () => {
		for (let i = 1; i < Path.length - 1; i++) {
			let nodeCord = Path[i];
			let row = nodeCord.row;
			let col = nodeCord.col;
			Grid[row][col].isPath = true;
			setTimeout(() => {
				markPath(row, col);
			}, 40 * i);
		}
	};

	const markPath = (row, col) => {
		document.getElementById(`node-${row}-${col}`).className = 'node path';
	};

	const markVisited = (row, col) => {
		document.getElementById(`node-${row}-${col}`).className = 'node visited';
	};

	var GridMap = Grid.map((row, rowIndex) => {
		return (
			<div key={rowIndex}>
				{row.map((node, nodeIndex) => {
					const { row, col, isStart, isEnd, isWall, isPath, isVisited } = node;
					return (
						<Node
							key={`${row}${col}`}
							width={40}
							height={40}
							row={row}
							col={col}
							isStart={isStart}
							isEnd={isEnd}
							isWall={isWall}
							isPath={isPath}
							isVisited={isVisited}
						/> 
					);
				})}
			</div>
		);
	})

    return (
		<>
			<div className={classes.root}>
				{GridMap}
			</div>
			<Button variant="contained" color="primary" onClick={ () => bfs() }>Run BFS</Button>
			<Button variant="contained" color="secondary" onClick={ () => drawPath() } >Draw Path</Button>
		</>
    )
}

export default Grid