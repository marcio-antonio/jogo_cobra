let canvas = document.getElementById("snake"); /*variável let por sofrer variação*/
let context = canvas.getContext("2d"); /*trabalhar como plano 2d*/
let box = 32; /* cada quadradin é 32px*/

function criarBG(){       /*criar background*/
  context.fillStyle ="lightgreen";
  context.fillRect(0, 0, 16*box, 16*box); /*desenha onde ocorrerá o game*/
}

criarBG();
