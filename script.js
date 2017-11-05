// declare all of the variables 
var GRAVITY = .25;
var FLAP = -12;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var jerry, ground;
var toms;
var gameOver;
var jerryImg, tomImg, bgImg;
var w = windowWidth;

// make background dimensions 
function setup() {
  createCanvas(1000,600);

// use the images 
  jerryImg = loadImage("Jerry_PNG.png");
  tomImg = loadImage("Tom_10.png");
  bgImg = loadImage("TeeForTwo.jpg"); 
  
// set Jerry's initial position and velocity 
  jerry = createSprite(width/2, 425, 40, 40);
  jerry.velocity.x = 4;
  jerry.setCollider("circle", 0,0,20);
  jerry.addImage(jerryImg);
  w = windowWidth +100


  toms = new Group();
  gameOver = true;
  updateSprites(false);
  
  camera.position.y = height/2;
}

function draw() {
 
  
  if(gameOver && keyWentDown("x"))
    newGame();

  if(!gameOver) {

    if(keyWentDown("x"))
      jerry.velocity.y = 100;
    
    jerry.velocity.y += GRAVITY;
    
    if(jerry.position.y<0)
      jerry.position.y = 0;
    if(jerry.position.y> 425)
      jerry.position.y = 425;
    
    if(jerry.overlap(toms))
      die();
    
      

    // spawn tom
    if(frameCount%225 == 0) {
      var tomH = (50, 300);
      var tom = createSprite(jerry.position.x + width, GROUND_Y-tomH/2+1+100, 80, tomH);
      tom.addImage(tomImg);
      toms.add(tom);
      jerry.velocity.x = (jerry.velocity.x) + .5;
    }

    // get rid of passed tom
    for(var i = 0; i<toms.length; i++)
      if(toms[i].position.x < jerry.position.x-width/2)
        toms[i].remove();
  }

  camera.position.x = jerry.position.x + width/4;

  clear(); 
  
  camera.off();
  background(bgImg); 
  camera.on();
  
  fill(200);
  textAlign(CENTER);
  text("LEFT CLICK TO BEGIN & JUMP, HOLD TO STAY IN AIR", windowWidth/2, 20);

  drawSprites(toms);
  drawSprite(ground);
  drawSprite(jerry);
}

function die() {
  updateSprites(false);
  gameOver = true;   
}

function newGame() {
  toms.removeSprites();
  gameOver = false;
  updateSprites(true);
  jerry.position.x = width/2;
  jerry.position.y = GROUND_Y+100;
  jerry.velocity.y = 0;
  ground.position.x = 800/2;
  ground.position.y = GROUND_Y+100;
}

function mousePressed() {
  if(gameOver)
    newGame();
  jerry.velocity.y = FLAP;
}