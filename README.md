# FStar

FStar example

https://fstarpath.github.io/FStar-test-1/

This is a demonstration of using a new pathfinding algorithm (FStar) on a 2D grid. We have exposed the new algorithm via a web API for people who would like to test it in their own code. You can use it to test any grid with size up to 50x50. The actual algorithm, however, will work for any size.


HTTP request

GET https://fstar.azurewebsites.net/api/test50x50f2

Parameters

end: A comma-separated coordinate of the end node.

openSet: The current open set of nodes of each path finding step.

code: The user API key (please send us a message for your own test key).







Comparing with AStar, we are seeing an average of 50% decrease in the number of iterations that were taken for finding a path. The video below shows the performance difference between AStar and FStar. The test is implemented in JavaScript using the code from <a href="https://github.com/CodingTrain/AStar"> CodingTrain</a>.

https://www.youtube.com/watch?v=rS_aC1BwaOY




