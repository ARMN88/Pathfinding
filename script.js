eruda.init({
  defaults: {
    theme: "Dark"
  }
})

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let scale = 10;

let player = {
  x: Math.round(Math.floor(Math.random() * (innerWidth-scale))/scale)*scale,
  y: Math.round(Math.floor(Math.random() * (innerHeight-scale))/scale)*scale,
  gCost: 0
}

let target = {
  x: Math.round(Math.floor(Math.random() * (innerWidth-scale))/scale)*scale,
  y: Math.round(Math.floor(Math.random() * (innerHeight-scale))/scale)*scale 
}

let points = [];

let openList = [];

let closedList = [];

let finalList = [];

closedList.push(player);

let currentNode = player;

let found = false;

let obstacles = [
  /*{x: 600, y: 300},
  {x: 630, y: 300},
  {x: 660, y: 300},
  {x: 690, y: 300},
  {x: 600, y: 330},
  {x: 600, y: 360},
  {x: 630, y: 360},
  {x: 210, y: 210},
  {x: 210, y: 180},
  {x: 210, y: 150},
  {x: 210, y: 7000
  {x: 210, y: 90},
  {x: 240, y: 90},
  {x: 270, y: 90}*/
];

function Start() {
  for(let i = 0; i < 4000; i++) {
      obstacles.push({
        x: Math.round(Math.floor(Math.random() * (innerWidth-scale))/scale)*scale,
        y: Math.round(Math.floor(Math.random() * (innerHeight-scale))/scale)*scale 
    });
  }
  obstacles = obstacles.filter(value => {
    var isAvaliable = true;
    if(target.x === value.x && target.y === value.y) {
      isAvaliable = false;
    }
    return isAvaliable;
  });
  for(let x = 0; x < innerWidth; x+=scale) {
    for(let y = 0; y < innerHeight; y+=scale) {
      points.push({
        x: x,
        y: y
      });
    } 
  }
  points = points.filter(value => {
    var isAvaliable = true;
    for(obstacle of obstacles) {
      if(obstacle.x === value.x && obstacle.y === value.y) {
        isAvaliable = false;
      }
    }
    return isAvaliable;
  });
  Update();
}
let tick = 0;
let isMazeGenerated = true;

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //DrawGrid();

  if(isMazeGenerated) {
    if(!found) {
      for(let point of GetNearestPoints(currentNode)) {
        point.gCost = currentNode.gCost + getDistance(point, currentNode);

        point.hCost = getDistance(point, target);

        point.fCost = point.hCost + point.gCost;
        openList.push(point);

        point.parent = currentNode;
      }
      var lowestFValue = Infinity;
      var lowestFNode;
      for(let point of openList) {
        if(point.fCost < lowestFValue) {
          lowestFValue = point.fCost;
          lowestFNode = point;
        }
      }
      if(lowestFNode) {
        points = points.filter(value => {
        var isOpen = true;
        if(value.x === lowestFNode.x && value.y === lowestFNode.y) {
          isOpen = false;
        }
        return isOpen;
      });
      openList = openList.filter(value => {
        var isOpen = true;
        if(value.x === lowestFNode.x && value.y === lowestFNode.y) {
          isOpen = false;
        }
        return isOpen;
      });
        closedList.push(lowestFNode);
        currentNode = lowestFNode;
      }
      if(target.x === currentNode.x && target.y === currentNode.y) {
        found = true;
        while(currentNode.parent) {
          finalList.push(currentNode);
          if(currentNode.parent) {
            currentNode = currentNode.parent;
          }
        }
      }
    }
  }else {
  }

  ctx.fillStyle = "grey";
  for(let point of openList) {
    ctx.fillRect(point.x, point.y, scale, scale);
  }

  ctx.fillStyle = "darkred";
  for(let point of closedList) {
    ctx.fillRect(point.x, point.y, scale, scale);
  }

  ctx.fillStyle = "green";
  for(let point of finalList) {
    ctx.fillRect(point.x, point.y, scale, scale);
  }

  ctx.fillStyle = "dodgerblue";
  ctx.fillRect(player.x, player.y, scale, scale);

  ctx.fillStyle = "yellow";
  ctx.fillRect(target.x, target.y, scale, scale);

  ctx.fillStyle = "purple";
  for(let point of obstacles) {
    ctx.fillRect(point.x, point.y, scale, scale);
  }

  tick++;
}

function DrawGrid() {
  ctx.strokeStyle = "#cecece";
  for(let x = 0; x < innerWidth; x+=scale) {
    for(let y = 0; y < innerHeight; y+=scale) {
      ctx.strokeRect(x, y, scale, scale);
    }
  }
}

function GetNearestPoints(location, threshold=scale){
  var nearestPoints = [];
  for(let point of points) {
    if(getDistance(point, location) <= threshold) {
      nearestPoints.push(point);
    }
  }
  return nearestPoints;
}

function getDistance(v1, v2) {
  return Math.sqrt(
    Math.pow(v2.x - v1.x, 2) +
    Math.pow(v2.y - v1.y, 2)
  );
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

function arrayRemove(arr, value) { 
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

window.onload = () => {
  Start();
}

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
