# FStar Pathfinding

FStar is a high-speed pathfinding engine for very large grid map. We have created a web API for anyone who are interested to try it for free.  The following videos show the performance differences between the traditional AStar algorithm and the new FStar algorithm: 

- [Video 1](https://www.youtube.com/watch?v=dzGzDVf3mw0)
- [Video 2](https://www.youtube.com/watch?v=rS_aC1BwaOY)



The web API can be used in two different ways. For dynamic maps, it can be used as shown in the sample code here. The original project is done by <a href="https://github.com/CodingTrain/AStar">CodingTrain</a>. It is a wonderful project that generates interesting maps at runtime. 

If, however, your map is static or very large, you can upload it to the web, and use the “mapURL” parameter to tell the API where it is. We will download the map using the mapURL. For better performance, we will also cache the map in our database. If your map is changed, please call the API with a new mapURL.

## Sample usage for static or large map (2000x2000):

Map: https://raw.githubusercontent.com/fstarpath/FStar-Pathfinding-demo/master/2000x2000w30s955b.txt

The following API call will return the path in a json array.

https://fsfunapp.azurewebsites.net/api/GetFStar2?code=Lci47mGXvnUD/BluvjYMVWLDcMCuRCfYctW4LEvCa33FJAwLG9dGBg==&mapurl=https://raw.githubusercontent.com/fstarpath/FStar-Pathfinding-demo/master/2000x2000w30s955b.txt&startnode=23,23&endnode=98,98


## Sample usage for dynamic map:

Example: https://fstarpath.github.io/FStar-Pathfinding-demo/

Code: https://github.com/fstarpath/FStar-Pathfinding-demo/blob/master/astarpathfinder.js

```js
var tmpMap = [];
for (var i = 0; i < this.map.cols; i++) {
    tmpMap[i] = [];
    for (var j = 0; j < this.map.rows; j++) {
        tmpMap[i][j] = this.map.grid[i][j].wall ? 'X' : '.';
    }
}
var reqStr = "startNode=" + this.start.i + "," + this.start.j + "&endNode=" + this.end.i + "," + this.end.j;
if (allowDiagonals) {
    reqStr += "&Diagonal=1"
}
this.httpRequest.open("post",
    "https://fsfunapp.azurewebsites.net/api/GetFStar2?code=Lci47mGXvnUD/BluvjYMVWLDcMCuRCfYctW4LEvCa33FJAwLG9dGBg==&"
    + reqStr, 
    false);
this.httpRequest.setRequestHeader("Content-type", "application/json");

var tmpData = JSON.stringify({ "map": tmpMap });
this.httpRequest.send(tmpData);

if (this.httpRequest.status != 200) {
    console.log("FStar error: " + this.httpRequest.responseText);
    return -1;
}

var myArrResult = JSON.parse(this.httpRequest.responseText);
if (myArrResult.length < 1) {
    console.log("FStar cannot find a path");
    return -1;
}

var lastTmpNode = null;
for (var i = 0; i < myArrResult.length; i++) {

    var tmpI = myArrResult[i].x;
    var tmpJ = myArrResult[i].y;

    var current = this.map.grid[tmpI][tmpJ];
    current.previous = lastTmpNode;
    lastTmpNode = current;
}
this.lastCheckedNode = current;
console.log("FStar DONE!");
return 1;
```

Please note the API key will be changed from time to time. If you want to use the API for long term, please send us a message for your own test key.



