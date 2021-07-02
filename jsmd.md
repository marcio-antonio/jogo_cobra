let canvas = document.getElementById("snake"); /*variável let por sofrer variação*/
let context = canvas.getContext("2d"); /*trabalhar como plano 2d*/
let box = 32; /* cada quadradin é 32px*/
let snake = [];
snake[0] = {
  x: 8*box,
  y: 8*box
}
let direction = "right"; /*dar movimento à cobra*/
let food = {
  /*métodos, biblioteca math, para criar número aleatório; floor retira a característica de ponto flutuante*/
  x: Math.floor(Math.random()*15 + 1)*box,
  y: Math.floor(Math.random()*15 + 1)*box
}

function criarBG(){       /*criar background*/
  context.fillStyle ="lightgreen";
  context.fillRect(0, 0, 16*box, 16*box); /*desenha onde ocorrerá o game*/
}

/*for*/
function criarCobrinha(){
  for(i=0; i < snake.length; i++){
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box); /*tamanho da cobra*/
  }
}

/*criar comidinha*/
function drawFood(){
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box); /*quando for desenhar*/
}

/* DOM - teclado seta baixo - chamada do update*/
document.addEventListener('keydown', update);

function update (event){

  if(event.keyCode == 37 && direction != "right") direction = "left"; /* evitar duas cabeças*/
  if(event.keyCode == 38 && direction != "down") direction = "up";
  if(event.keyCode == 39 && direction != "left") direction = "right";
  if(event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo(){

  /*plano cartesiano limitando o andar infinito*/
  if(snake[0].x > 15*box && direction == "right") snake[0].x = 0; /*horizontal*/
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
  if(snake[0].y > 15*box && direction == "down") snake[0].y = 0; /*vertical*/
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;

  /* loop for para chegagem da posição zero - cabeça - e posição um - corpinho*/
  for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      clearInterval(jogo);
      alert('Game Over :(');
    }
  }

  /*chamamento de funções*/
  criarBG();
  criarCobrinha();
  drawFood();

  /*ponto de partida e origem do plano cartesiano*/
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  /*coordenadas da cobrinha, condicionais demonstrativas da direção e do sentido*/
  if(direction == "right") snakeX += box;
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box;

  if(snakeX != food.x || snakeY != food.y){
    snake.pop(); /* retira o último elemento do array */
  }
  else{
    food.x = Math.floor(Math.random()*15 + 1)*box;
    food.y = Math.floor(Math.random()*15 + 1)*box;
  }

  /*cabeça cobra*/
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); /*intervalo de 100ms para renovar o jogo sem travar*/
