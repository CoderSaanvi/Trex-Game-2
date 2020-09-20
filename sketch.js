var trex,trex_collided,trex_running,backgroundImg,invisibleGround,cloudImg,cloud,CloudsGroup,ObstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,trex_collided

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count;

var gameOver,gameOverImg,restart,restartImg

function preload() {
  trex_running = loadAnimation('trex1.png','trex3.png','trex4.png');
  backgroundImg = loadImage("BackgroudImg.jpg")
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  trex = createSprite(50,displayHeight/2,40,10);
  trex.addAnimation("trex1",trex_running);
  trex.scale = 1;
  trex.addAnimation("trex2",trex_collided);
  
  count = 0;

  edges = createEdgeSprites();
  
  invisibleGround = createSprite(300,190,displayWidth*3,5);
  invisibleGround.visible = false;
  
  CloudsGroup = createGroup();
  ObstaclesGroup = createGroup();
  
  gameOver = createSprite(displayWidth/2,displayHeight/2,100,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  restart = createSprite(displayWidth/2,displayHeight/2+100,10,10);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible = false;
}

function draw() {
  background(255);
  image(backgroundImg,0,displayHeight/2,displayWidth*3,displayHeight);
  drawSprites();

  if(gameState===PLAY){
    
   count = count+Math.round(getFrameRate()/60)
  
   if(keyIsDown(32) && trex.collide(edges[3])){
     trex.velocityY = -20;
   }

    if(keyIsDown(RIGHT_ARROW)){
      trex.x +=4;
      camera.x = trex.x;
    }
    
  trex.velocityY = trex.velocityY+0.8;
  trex.collide(edges[3]);
    
  spawnClouds();
  spawnObstacles();
    
   //   if(ObstaclesGroup.isTouching(trex)){
    //  gameState = END;
   //   }
  }
    
 else if(gameState===END){
    
   // ground.velocityX = 0;
    
    trex.velocityY = 0;
    
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
   
    trex.changeAnimation("trex2",trex_collided);
   
   restart.visible = true;
   
   gameOver.visible = true;
    
    }
  
  trex.collide(invisibleGround);
  
  text("Score    "+count,500,80);
  
  if(mousePressedOver(restart)){
     reset();
     }
  
}

function spawnClouds(){
  
    if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,800,40,10);
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(400,800));   
    cloud.scale = 1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    //cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-100,10,70);
    obstacle.velocityX = -3;
    
    //generate random obstacles
    var rand = Math.round(random (1,6));
     switch(rand){
       case 1: obstacle.addImage(obstacle1);
         break;
       case 2: obstacle.addImage(obstacle2);
         break;
       case 3: obstacle.addImage(obstacle3);
         break;
       case 4: obstacle.addImage(obstacle4);
         break;
       case 5: obstacle.addImage(obstacle5);
         break;
       case 6: obstacle.addImage(obstacle6);
         break;
         
         default:break;
     }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
   // obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  trex.changeAnimation("trex1",trex_running);
  gameOver.visible = false;
  restart.visible = false;
  count = 0;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
}