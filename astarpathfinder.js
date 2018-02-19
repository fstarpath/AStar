
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
    
   	var httpRequest = new XMLHttpRequest();

    // call FStar web api to get the winner
	this.getFStarWinner = function(end, openSet) {
		var tmpWinner = -1;
		var endStr = end.i + "," + end.j;
		var openSetStr = ""; 
		
		for (var i = 0; i < openSet.length; i++) {
			openSetStr += "(" + openSet[i].i + "," + openSet[i].j+ ")";
		}

		httpRequest.open("get", 
			"https://fstar.azurewebsites.net/api/Test50x50F2?code=6/a0SaFa2mlL8D0WIIjOeemdo8pnC0PfS1HbZgfNBYp93G/LooIfkQ==&end="
			+ encodeURI(endStr) + "&openset=" + encodeURI(openSetStr),
			false);
		
		httpRequest.send();

		if (httpRequest.status != 200)
		{
			console.log(httpRequest.responseText);
		}

		tmpWinner = parseInt(httpRequest.responseText);
		return tmpWinner;
    }
    

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

        if (this.openSet.length > 0) {

            // Best next option
            var winner = this.getFStarWinner(this.end, this.openSet);
			if (winner < 0) {
                console.log("FStar error");
                return 1;
			}
            
            var current = this.openSet[winner];
            this.lastCheckedNode = current;

            // Did I finish?
            if (current === this.end) {
                console.log("DONE!");
                return 1;
            }

            // Best option moves from openSet to closedSet
            this.removeFromArray(this.openSet, current);
            this.closedSet.push(current);

            // Check all the neighbors
            var neighbors = current.getNeighbors();

            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                // Valid next spot?
                if (!this.closedSet.includes(neighbor)) {
                    // Is this a better path than before?
                    var tempG = current.g + this.heuristic(neighbor, current);

                    // Is this a better path than before?
                    if (!this.openSet.includes(neighbor)) {
                        this.openSet.push(neighbor);
                    } else if (tempG >= neighbor.g) {
                        // No, it's not a better path
                        continue;
                    }

                    neighbor.g = tempG;
                    neighbor.h = this.heuristic(neighbor, end);
                    if (!allowDiagonals) {
                        neighbor.vh = this.visualDist(neighbor, end);
                    }
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }

            }
            return 0;
            // Uh oh, no solution
        } else {
            console.log('no solution');
            return -1;
        }
    }
}
