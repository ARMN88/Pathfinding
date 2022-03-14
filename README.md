# Pathfinding
A simple pathfinder using the A* Algorithm. Made using Vanilla JavaScript.

## How It Works
The algorithm is given a target and a starting point. From that starting point, it will 
find the F Cost of the 4 surrounding cells. The F Cost is the sum of the H Cost and G Cost. 
The G Cost is the length of the current path to the starting point. The H Cost does its best 
to determine the estimated distance to the end point. It then finds the cell with the lowest 
F Cost, and moves to that point. It keeps track of all possible movement points. This keeps 
going until it finds the end point, which then it will trace its steps back to the starting 
node.

*Wednesday, February 9, 2022*
