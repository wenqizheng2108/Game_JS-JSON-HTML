// Resources
let resources = {images:[
                          {id: "bk", src: "images/Zbk.jpg"},
                          {id: "bk1", src: "images/bk1.jpg"},
                          {id: "bk2", src: "images/bk2.png"},
                          {id: "turkey", src: "images/turkey.gif"},
                          {id: "zombie", src: "images/zombie.png"},
                          {id: "crosshair", src: "images/crosshair.png"},
                          {id: "logo", src: "images/logo.png"},
                          {id: "c_button", src: "images/continue_button.png"},
                          {id: "t_button", src: "images/tryAgain_button.png"},
                          {id: "ammo", src: "images/ammo.png"},
                          {id: "p_button", src: "images/playAgain_button.png"},     
                  ],
                 audios:[
                          {id: "gun", src: "audios/Gun.wav"},
                          {id: "gobble", src: "audios/TurkeyGobble.wav"},
                          {id: "chomp", src: "audios/ZombieChomp.wav"},
                          {id: "die", src: "audios/ZombieDie.wav"},
                          {id: "load", src: "audios/load_ammo.wav"}, 
           
                  ]
                };

// starts the game loop
function preload(){
    game = new Game("game");
    game.preload(resources);
    game.state = init;
    gameloop();
}
document.onload = preload();

//the state of the game
function gameloop(){
  game.processInput()
  if(game.ready){
    game.state();
  }
  game.update()
  setTimeout(gameloop,10);
}

// game objects and game initialization
function init(){
  bk = new Sprite(game.images.bk, game),
  bk.scale = 0.50,
  bk1 = new Sprite(game.images.bk1, game),
  bk2 = new Sprite(game.images.bk2, game),
  turkey = new Sprite(game.images.turkey, game),
  turkey.scale = 0.45,
  turkey.setVector(2,45),
  zombie = new Sprite(game.images.zombie, game),
  zombie.scale = 0.15,
  zombie.setVector(2,-45),
  crosshair = new Sprite(game.images.crosshair, game),
  crosshair.scale = 0.15,
  logo = new Sprite(game.images.logo, game),
  f = new Font("30pt", "serif", "white", "black"),
  gun = new Sound(game.audios.gun),
  gobble = new Sound(game.audios.gobble),
  chomp = new Sound(game.audios.chomp),
  die = new Sound(game.audios.die),
  c_button = new Sprite(game.images.c_button, game),
  c_button.scale = 0.30,
  t_button = new Sprite(game.images.t_button, game),
  t_button.scale = 0.8,
  ammo = new Sprite(game.images.ammo, game),
  ammo.scale = 0.3,
  ammo.setVector(2.5,40),
  p_button = new Sprite(game.images.p_button, game);
  p_button.scale = 0.6,
  load = new Sound(game.audios.load)
  game.state = startScreen;
}

function startScreen(){
  bk1.draw();
  logo.moveTo(game.width/2, game.height/2 - 150)
  game.drawText("Click to Start", game.width / 2 - 100, game.height / 2 - 30, f)
  if(mouse.leftClick){
    game.state = stage1;
  }
}

function stage1(){
  bk2.draw()
  game.drawText("STAGE 1", game.width / 2 - 200, game.height / 2 - 40, new Font("80pt", "serif", "white", "blue"))
  game.drawText("Click to Start Stage 1", game.width / 2 - 160, game.height / 2 +50, f)
  if(mouse.leftClick){
    game.state = main;
  }
}

function main(){
  bk2.draw();
  turkey.move(true);
  zombie.move(true);
  crosshair.moveTo(mouse.x,mouse.y);

  if(zombie.collidedWith(turkey)){
    chomp.play();
    gobble.play();
    turkey.health -= 5;
    turkey.moveTo(randint(200,860), randint(100,500));

  }
  game.drawText(turkey.health,turkey.x - 20,turkey.y + 100, f)

  if(zombie.collidedWith(mouse) && mouse.leftClick){
    die.play();
    zombie.health -=10;
    zombie.speed += 1;
    zombie.moveTo(randint(200,860), randint(100,500));
    
  }
  if(mouse.leftClick){
    gun.play();
    
  }
  game.drawText(zombie.health,zombie.x ,zombie.y + 120, f)

  if(turkey.health <= 0 || zombie.health <= 0){
    game.state = gameOver;
  }
}

function gameOver(){
  bk2.draw()
  game.drawText("Game Over", game.width / 2 - 250, game.height / 2 - 70, new Font("80pt", "serif", "white", "black"))
  if(turkey.health <= 0){
    game.drawText("You Lose", game.width / 2 - 145, game.height / 2, new Font("50pt", "serif", "red", "white"));
    t_button.moveTo(game.width / 2, game.height / 2 + 70);
    c_button.draw()
    c_button.visible = false
  }else if(zombie.health <= 0){
    game.drawText("You Win", game.width / 2 - 120, game.height / 2 + 10, new Font("50pt", "serif", "blue", "white"));
    c_button.moveTo(game.width / 2, game.height / 2 + 70);
    c_button.visible=true;
    t_button.moveTo(game.width / 2, game.height / 2 + 130);
  }

  if(t_button.collidedWith(mouse) && mouse.leftClick){
    turkey.health = 100;
    zombie.health = 100;
    zombie.speed = 2;
    game.state = stage1;
  }
  if(c_button.collidedWith(mouse) && mouse.leftClick) {
    turkey.health = 100;
    zombie.health = 100;
    zombie.speed = 2;
    game.state = stage2;
  }

}
function stage2(){
  bk2.draw()
  game.drawText("STAGE 2", game.width / 2 - 200, game.height / 2 - 40, new Font("80pt", "serif", "white", "blue"))
  game.drawText("Click to Start Stage 2", game.width / 2 - 160, game.height / 2 +50, f)
  if(mouse.leftClick){
    game.state = level2;
  }
} 

function level2(){
  bk2.draw()
  zombie.move(true)
  turkey.move(true)
  crosshair.moveTo(mouse.x,mouse.y)
  

   if(zombie.collidedWith(turkey)){
    chomp.play();
    gobble.play();
    turkey.health -= 5;
    turkey.moveTo(randint(200,860), randint(100,500));
   }
  
  game.drawText(turkey.health,turkey.x - 20,turkey.y + 100, f)

  if(zombie.collidedWith(mouse) && mouse.leftClick){
    die.play();
    zombie.health -=10;
    zombie.speed += 1.25;
    zombie.moveTo(randint(200,860), randint(100,500));
  }
  game.drawText("Bullets: "+ crosshair.health, crosshair.x-90, crosshair.y-100,f)
  
  if(mouse.leftClick){
    gun.play();
    crosshair.health -= 10;
  }
  game.drawText(zombie.health,zombie.x ,zombie.y + 120, f)

  if(crosshair.health <= 70){
    ammo.move(true)
    ammo.visible = true;
  }

  if (ammo.collidedWith(mouse) && mouse.leftClick){
    load.play()
    crosshair.health +=20;
    ammo.moveTo(randint(200,860), randint(100,500))
    ammo.visible = false 
  }

  if(turkey.health <= 0 || zombie.health <= 0 || crosshair.health <=0){
    game.state = gameOver2;
  }
}

function gameOver2(){
   bk2.draw()
   game.drawText("Game Over", game.width / 2 - 250, game.height / 2 - 70, new Font("80pt", "serif", "white", "black"))

  if(zombie.health <= 0){game.drawText("You Win", game.width / 2 - 120, game.height / 2 + 10, new Font("50pt", "serif", "blue", "white"));
  p_button.moveTo(game.width / 2, game.height / 2 + 70);
  }else if(turkey.health <=0){
    game.drawText("You Lose", game.width / 2 - 130, game.height / 2, new Font("50pt", "serif", "red", "white"));
    t_button.moveTo(game.width / 2, game.height / 2 + 70); 
  }else if(crosshair.health <=0){
    game.drawText("You Lose", game.width / 2 - 130, game.height / 2, new Font("50pt", "serif", "red", "white"));
    game.drawText("No More Bullets", game.width / 2 - 90, game.height / 2 + 50, new Font("25pt", "serif", "red", "white"));
    t_button.moveTo(game.width / 2 + 10, game.height / 2 + 90);  
  }

  if(t_button.collidedWith(mouse) && mouse.leftClick){
    turkey.health = 100;
    zombie.health = 100;
    zombie.speed = 2;
    crosshair.health=100;
    game.state = stage2;
  }else if(p_button.collidedWith(mouse) && mouse.leftClick){
    turkey.health = 100;
    zombie.health = 100;
    zombie.speed = 2;
    crosshair.health=100;
    game.state = stage1;
  }else{
    crosshair.health=0
    game.state = gameOver2
  }
};
