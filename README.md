# FStar

FStar example

https://fstarpath.github.io/FStar-test-1/


This is a demonstration of a new pathfinding algorithm on a 2D grid. 

It is implemented in JavaScript using the code from <a href="https://github.com/CodingTrain/AStar"> CodingTrain on github</a>.
  
The video below shows the performance difference between AStar and FStar. FStar runs much faster in the video is due to the fact that it was hosted on a local machine. Here we are a doing a http call for each move, so it is much slower.

https://www.youtube.com/watch?v=rS_aC1BwaOY

We expose the new algorithm via a web api. The code change is minimum.

https://github.com/fstarpath/FStar-test-1/commit/46640d6cfce1a03faf4b5a20fcff2206d0476cb7?diff=split


