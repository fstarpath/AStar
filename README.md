# FStar

FStar example

https://fstarpath.github.io/FStar-test-1/


This is a demonstration of using a new pathfinding AI engine on a 2D grid. It provides improvement to a key step in the widely used AStar pathfinding algorithm. It helps the AStar algorithm pick a better next node in each path finding iteration. We have exposed this functionality via a web API. Anyone can use it in their own AStar implementation. It can be used to test grids with size up to 50x50. The actual engine, however, will work for grids of any size.


HTTP request

GET https://fstar.azurewebsites.net/api/test50x50f2

Parameters

end: A comma-separated coordinate of the end node.

openSet: The current open set of nodes of each path finding step.

code: The user API key (please send us a message for your own test key).




We call the algorithm with the new AI improvement FStar. Comparing with the original AStar implementation, we are seeing an average of 50% decrease in the number of iterations that were taken for finding a path. The video below shows the performance difference between AStar and FStar. The test is implemented in JavaScript using the code from <a href="https://github.com/CodingTrain/AStar"> CodingTrain</a>.

https://www.youtube.com/watch?v=rS_aC1BwaOY




