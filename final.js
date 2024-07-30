var cities = [];
var totalCities = 6;
var recordDistance;
var best;
var order = [];

var totalPerm;
var count;

function setup() {
  createCanvas(window.innerWidth - 20, window.innerHeight - 20);
  for(var i = 0; i < totalCities; i++) {
    var v = createVector(random(window.innerWidth - 40), random(window.innerHeight - 40));
    cities[i] = v;
    order[i] = i;
  }
  var d = calcDistance(cities, order);
  recordDistance = d;
  best = order.slice();
  totalPerm = factorial(totalCities);
  count = 0;
}

function draw() {
  //frameRate(10);
  background(0);
  fill(255);
  for(var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 20, 20);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < order.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  stroke(255, 0, 0);
  strokeWeight(5);
  noFill();
  beginShape();
  for(var i = 0; i < order.length; i++) {
    var n = best[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  var d = calcDistance(cities, order);
  if(d < recordDistance) {
    recordDistance = d;
    best = order.slice();
  }

  textSize(30);
  stroke(255);
  strokeWeight(1);
  var percent = Math.ceil(100 * (count / totalPerm));
  text(nf(percent, 0) + "% completed", 0, 30);

  nextOrder();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for(var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function nextOrder() {
  count++;

  var largestI = -1;
  for(var i = 0; i < order.length - 1; i++) {
    if(order[i] < order[i+1]) largestI = i;
  }
  if(largestI == -1) {
    noLoop();
    window.alert('Optimal found!');
  }

  var largestJ = -1;
  for(var j = 0; j < order.length; j++) {
    if(order[largestI] < order[j]) largestJ = j;
  }

  swap(order, largestI, largestJ);
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n) {
  if(n == 1) return 1;
  else return n * factorial(n - 1);
}
