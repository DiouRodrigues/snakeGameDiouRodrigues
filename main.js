const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i")

let foodX ,foodY;
let snakeX = 5 , snakeY = 10;
let velocityX = 0,velocityY = 0; 
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score  = 0;

const som_HIT = new Audio();
const som_PULO = new Audio();
const som_PONTO = new Audio();
const som_CAIU = new Audio();
const som_FUNDO = new Audio();
som_HIT.src = './efeitos/som_fundo.mp3';
som_HIT.src = './efeitos/hit.wav';
som_PULO.src = './efeitos/pulo.wav';
som_PONTO.src = './efeitos/ponto.wav';
som_CAIU.src = './efeitos/som_perdeu.mp3';

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `HIGH SCORE: ${highScore}`;


const handleGameOver = () =>{
    clearInterval(setIntervalId)
    alert( "voce perdeu pressione ok para jogar novamente " )
    location.reload()
}

const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30 ) + 1;
    foodY = Math.floor(Math.random() * 30 ) + 1;
}
const changeDirection = (e) =>{
    
    if(e.key === "ArrowUp" && velocityY != -1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != 1){
        velocityX = 0;
        velocityY = 1;   
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;   
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;   
    }
    initGame()
}
controls.forEach(key =>{
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}))
})

const initGame = ()=>{
    som_FUNDO.play()
    if(gameOver){
        return handleGameOver();
        
    }
    let htmlMarkUp = `<div class="food" style="grid-area:${foodY} / ${foodX} "></div>`;
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)
        scoreElement.innerText = `SCORE: ${score}`
        highScoreElement.innerText = `HIGH SCORE: ${highScore}`
        som_PONTO.play()
    }
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] =[snakeX,snakeY]

    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver = true
        som_HIT.play()
    }

    
    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkUp += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver =true
            som_CAIU.play()
        }
    };
    playBoard.innerHTML= htmlMarkUp;
}
changeFoodPosition();
 setIntervalId=setInterval(initGame, 150);
document.addEventListener("keydown",changeDirection);