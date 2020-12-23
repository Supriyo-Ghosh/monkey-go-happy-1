 var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, groundImg;
var ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(50,500,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  ground=createSprite(300,500,1500,10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  
  
  invisibleGround = createSprite (300,500,600,20);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group()
  bananaGroup = new Group()
  
  
 score = 0; 
}

function draw() {
background(255);
 text("SURVIVAL TIME:" + score , 250, 50); 
  
  
    
  
  if (gameState === PLAY) {
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  if (keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12 ;
  } 
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
    
  score = score + Math.round(getFrameRate()/60.5);
    
    spawnbanana()
    spawnobstacle()
    if (obstacleGroup.isTouching(monkey)){
      gameState=END
    }
  }
  
  if (gameState === END){
    obstacleGroup.destroyEach()
    bananaGroup.destroyEach()
    monkey.velocityY = 0
    ground.velocityX=0;
  }
  
  drawSprites();
}

function spawnbanana() {
  if (frameCount%80===0){
    var banana = createSprite (600,200,20,20);
    pos = Math.round(random(1,2));
    banana.velocityX = -6
    banana.scale=0.1;
  
   banana.addImage("banana", bananaImage);
    
     banana.lifetime = 100;
    
     bananaGroup.add(banana) ;
  
  }
}

function spawnobstacle() {
  if(frameCount%80===0) {
    var obstacle = createSprite (600,470,20,20);
    obstacle.velocityX = -4;
    obstacle.scale = 0.2;
    
    obstacle.addImage("obstacle", obstacleImage);
    
    obstacle.lifetime = 150;    
    obstacleGroup.add(obstacle);
  }
}