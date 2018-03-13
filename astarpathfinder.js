
function AStarPathFinder(map, start, end, allowDiagonals) {
    this.map = map;
    this.lastCheckedNode = start;
    this.openSet = [];
    // openSet starts with beginning node only
    this.openSet.push(start);
    this.closedSet = [];
    this.start = start;
    this.end = end;
    this.allowDiagonals = allowDiagonals;
    
    //This function returns a measure of aesthetic preference for
    //use when ordering the openSet. It is used to prioritise
    //between equal standard heuristic scores. It can therefore
    //be anything you like without affecting the ability to find
    //a minimum cost path.

    this.visualDist = function(a, b) {
        return dist(a.i, a.j, b.i, b.j);
    }

    // An educated guess of how far it is between two points

    this.heuristic = function(a, b) {
        var d;
        if (allowDiagonals) {
            d = dist(a.i, a.j, b.i, b.j);
        } else {
            d = abs(a.i - b.i) + abs(a.j - b.j);
        }
        return d;
    }

    // Function to delete element from the array
    this.removeFromArray = function(arr, elt) {
        // Could use indexOf here instead to be more efficient
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == elt) {
                arr.splice(i, 1);
            }
        }
    }

    //Run one finding step.
    //returns 0 if search ongoing
    //returns 1 if goal reached
    //returns -1 if no solution
    this.step = function() {
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
    }
}
