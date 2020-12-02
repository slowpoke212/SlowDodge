var enemy;
var myObstacles = [];
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 150;
var y = 150;
var xspeed = 0;
var yspeed = 0;
var score = 0;
var timer = 300;
var hi = 0;
var w = 10;
var loop;
var xmove = 0;
var rc;
var sped;
function entity (width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.fall = 0;
    this.speedY = getRandomInt2(1, 5);    
    this.x = x;
    this.y = y;   
  this.newPos = function() {
        this.y += this.speedY;   
    }; 
    this.update = function() {

        ctx.rect(this.x, this.y, this.width, this.height);
    }
    this.crashWith = function(x, y, w, h) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = x;
    var otherright = x + (w);
    var othertop = y;
    var otherbottom = y + (h);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
      
}
function updatetext() {
  document.getElementById("health").innerHTML = score
}
document.addEventListener('keypress', function (e) {
  
  if (e.code === "KeyW") {
    yspeed -= 1
  

  }
});
document.addEventListener('keypress', function (e) {
  if (e.code === "KeyS") {
      yspeed += 1
  }
});
document.addEventListener('keypress', function (e) {
  if (e.code === "KeyD") {
      xspeed += 1


  }
});
document.addEventListener('keypress', function (e) {
  if (e.code === "KeyA") {
      xspeed -= 1


  }
});
document.addEventListener('keyup', function (e) {
  if (e.code === "KeyD" || e.code === "KeyA") {
  xspeed = 0
  }
  if (e.code === "KeyW" || e.code === "KeyS") {
  yspeed = 0
  }
});






function draw() {
    score += 1
    updatetext()
    timer += 1
    if (timer > 300){
    hi = 0
    myObstacles.push(new entity(15, 10, "green", getRandomInt(300), 100))
    rc = getRandomInt(1)
    if (rc = 1){
     myObstacles.shift 

    }
    timer = 0
 
    }


    x += xspeed
    if (y <= 0){
      y = 0
    }
    if (y >= c.height - 10){
      y = c.height - 10
    }
    if (x >= c.width - 10){
      x = c.width - 10
    }
    if (x <= 0){
      x = 0
    }
    


    y += yspeed
  


  if (yspeed > 1) {
    yspeed = 0
  }
  if (xspeed > 1) {
    xspeed = 0
  }
  if (yspeed < -1) {
    yspeed = 0
  }
  if (xspeed < -1) {
    xspeed = 0
  }
  hi += 1
  
  for (i = 0; i < myObstacles.length; i += 1) {
  if (myObstacles[i].crashWith(x, y, 10, 10)) {
    
    clearInterval(loop)
  }
  }
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  
   for (i = 0; i < myObstacles.length; i += 1) {
     xmove = getRandomInt2(-5, 5)
    myObstacles[i].x += xmove;
    
    sped = getRandomInt2(1, 30)
    hi += sped
    myObstacles[i].fall += myObstacles[i].Yspeed
    myObstacles[i].y = hi;
    hi -= sped
    myObstacles[i].update();
    xmove = 0
  }

  ctx.rect(x, y, 10, 10);
  ctx.stroke();




}

loop = setInterval(draw, 10);
function getRandomInt(max) {  
  return Math.floor(Math.random() * Math.floor(max));
}
function getRandomInt2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}







