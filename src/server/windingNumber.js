'use strict';

var polygon, p1, p2;

// The polygon (drawn on the map)
polygon = [
  [0, 0],
  [0, 10],
  [10, 0],
  [10, 10]
]

// A point representing a grams media that is located inside of the polygon
p1 = [5, 5];   // inside
// A point representing a grams media that is located outside of the polygon
p2 = [11, 12]; // outside


function windingNumber (point, polygon) {

  var points = polygon;
  var wn=0;
  var edge = polygon.slice();
  edge.push(polygon[0]);

  for(var i=0, len=polygon.length; i<len; i++) {
    if(edge[i][1] <= point[1]){
      if(edge[i+1][1] > point[1])
        if(isStrictlyLeft(edge[i], edge[i+1], point) > 0)
          wn++;
    } else {
      if(edge[i+1][1] <= point[1])
        if(isStrictlyLeft(edge[i], edge[i+1], point) < 0)
          wn--;
    }
  }

  return wn != 0;
}

function isStrictlyLeft(p0, p1, p2) {
  return ( (p1[0] - p0[0]) * (p2[1] - p0[1]) ) - ((p2[0] - p0[0]) * (p1[1] - p0[1]) );
}

console.log("p1 is inside. It should be true. output   ->"  , windingNumber(p1, polygon));
console.log("p2 is outside. It should be false. output ->", windingNumber(p2, polygon));
