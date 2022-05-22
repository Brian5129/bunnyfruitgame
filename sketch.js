const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var blink
var eat
var sad
var air
var eatingSound
var ropeCut
var crying
var backGroundsound

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
air=loadSound("air.wav")
eatingSound=loadSound("eating_sound.mp3")
ropeCut=loadSound("rope_cut.mp3")
crying=loadSound("sad.wav")
backGroundsound=loadSound("sound1.mp3")
eat.looping=false
sad.looping=false
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  backGroundsound.play()
  backGroundsound.setVolume(0.1)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  blink.frameDelay=15
  sad.frameDelay=20
  bunny=createSprite(450,590,80,80)
  bunny.scale=0.25
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eat",eat)
  bunny.addAnimation("sad",sad)
  bunny.changeAnimation("blink")

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  cutButton=createImg("cut_btn.png")
  cutButton.position(225,40)
  cutButton.size(50,50)
  cutButton.mouseClicked(drop)

  balloonButton=createImg("balloon.png")
  balloonButton.position(30,250)
  balloonButton.size(120,90)
  balloonButton.mouseClicked(rightforce)

  muteButton=createImg("mute.png")
  muteButton.position(340,90)
  muteButton.size(80,80)
  muteButton.mouseClicked(mute)
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);
if (fruit!==null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}
if (collide(fruit,bunny)==true){
  bunny.changeAnimation("eat")
  eatingSound.play()
}
if (collide(fruit,ground.body)==true){
  bunny.changeAnimation("sad")
  backGroundsound.stop()
  crying.play()
}
  rope.show();
  Engine.update(engine);
  ground.show();

 drawSprites();
   
}

function drop(){
  ropeCut.play()
  rope.break()
  fruit_con.unlink()
  fruit_con=null

}
function collide(body,sprite){
  if(body!==null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<100){
      World.remove(world,fruit)
      fruit=null
      return true
    }
    else{return false}



  }
  
}
function rightforce(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.02,y:0})
  air.play()
}
function mute(){
  if(backGroundsound.isPlaying()){
    backGroundsound.stop()
  }
  else{
    backGroundsound.play()
  }
}