// variables and const
const fieldCanvas = document.getElementById("field");
const fieldCtx = field.getContext("2d");

// snake
let snake = [ 
    {x: 250, y: 250},  //   snake head
    {x: 240, y: 250}, 
    {x: 230, y: 250},  //   rest of the body parts
    {x: 220, y: 250}, 
    {x: 210, y: 250}
];

// movement
let isDirectionChanging = false;
let dx = 10;
let dy = 0;

// food and score
let foodX;
let foodY;
let score = 0;


// game
function main(){
    if(checkGameEnd()) return; // if true game end
    isDirectionChanging = false;

    setTimeout(function onTick(){
        boardStyle();
        drawFood();
        drawSnake();
        moveSnake();
        main(); // to make it infinite until the game end
    }, 100);
}

main();
generateFood();
                                    // functors
document.addEventListener("keydown", movement); // register the char code of the pressed key and pass it to the movement function through pointer

// functions
function drawSnakeParts(snakePart){
    fieldCtx.fillStyle = 'blue'; // snake color
    fieldCtx.strokeStyle = 'darkblue'; // snake border color

                    // coordinate of snake  // size of snake -> draw the snake
    fieldCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
                    // draw a border
    fieldCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function boardStyle(){
    fieldCtx.fillStyle = 'green'; // field color
    fieldCtx.strokeStyle = 'red'; // field border color
                    // from coordinate 0, 0 to the width and height of the canvas
    fieldCtx.fillRect(0, 0, fieldCanvas.width, fieldCanvas.height);
    fieldCtx.strokeRect(0, 0, fieldCanvas.width, fieldCanvas.height);
}

function drawSnake(){
    snake.forEach(drawSnakeParts);
}

function moveSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};  // create a new head
    snake.unshift(head);  
    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;  // check if the head has collided with food
    if(hasEatenFood){
        score += 10;
        document.getElementById('score').innerHTML = score;
        generateFood(); // generate new food if the food has been eaten
    } 
    else {
        snake.pop();  // delete the last part of the snake
    }  
}

function movement(event){  

    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    if(isDirectionChanging) return; // it check if snake is moving, if not it break out of function and end game

    isDirectionChanging = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;  
    const goingLeft = (dx === -10);
     
    // movement
    if (keyPressed === leftKey && !goingRight){    
        dx = -10;
        dy = 0;  
    }

    if (keyPressed === upKey && !goingDown){    
        dx = 0;
        dy = -10;
    }

    if (keyPressed === rightKey && !goingLeft){    
        dx = 10;
        dy = 0;
    }

    if (keyPressed === downKey && !goingUp){    
        dx = 0;
        dy = 10;
    }
}

function checkGameEnd(){
    for (let i = 4; i < snake.length; i++){    // check if the snake collided with itself
    const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (collided){
            return true
        }
    }

    // check if snake colided with the wall
    const hitLeftWall = snake[0].x < 0;  
    const hitRightWall = snake[0].x > fieldCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > fieldCanvas.height - 10;
 
    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

// generate the coordinate for the food
function randomFood(min, max){  
   return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

// generate the food around the map
function generateFood(){
    foodX = randomFood(0, fieldCanvas.width - 10);   // generate coordinate x for the food
    foodY = randomFood(0, fieldCanvas.height - 10);  // generate coordinate y for the food

    // if any part of snake is on the food then it classifies the food as eaten and generate new food
    snake.forEach(function hasSnakeEaten(part){
        const didSnakeEat = part.x == foodX && part.y == foodY;
        if(didSnakeEat){
            generateFood();
        }
    });
}

// color and border of the food
function drawFood(){
    fieldCtx.fillStyle = 'lightgreen';
    fieldCtx.strokestyle = 'darkgreen';
    fieldCtx.fillRect(foodX, foodY, 10, 10);
    fieldCtx.strokeRect(foodX, foodY, 10, 10);
}

