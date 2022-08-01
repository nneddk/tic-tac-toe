//this is not a perfect minimax ai, the way its designed is that it makes random moves until someone is going to win
//at which point it tries to prevent you from winning or it tries to win
//it DOES NOT force a tie every game and you can win since it doesnt do perfect moves


const gameBoard = document.getElementById('game-board');
const showOrder = document.getElementById('one-player');
const twoPlayer = document.getElementById('two-player');
const selX = document.getElementById('select-x');
const selO = document.getElementById('select-o');
const btnBar = document.getElementById('order');
const result = document.getElementById('result');
const wrapper = document.getElementById('wrapper');
let enabled = false;
let aiOn = false;
let pOrder = true;
twoPlayer.onclick = function(){
    aiOn = false;
    gameBoardTiles.make();
    wrapper.style.display = 'none';
}

showOrder.onclick = function(){
    if (!enabled){
        twoPlayer.setAttribute('Disabled', true);
        twoPlayer.style.color = 'rgb(255, 255, 255, 0.5)';
        btnBar.style.height = '50%';
        enabled = true;
    }else{
        twoPlayer.removeAttribute('Disabled');
        twoPlayer.style.color = 'rgb(255, 255, 255)';
        btnBar.style.height = '0';
        enabled = false;
    }
}
selX.onclick = function(){ 
    aiOn = true;
    pOrder = true;
    gameBoardTiles.make();
    wrapper.style.display = 'none';
}
selO.onclick = function(){
    aiOn = true;
    pOrder = false;
    gameBoardTiles.make();
    wrapper.style.display = 'none';

}
/*Create new board, for use later
while (gameBoard.hasChildNodes()) {
            gameBoard.removeChild(gameBoard.lastChild);
          } */

//creates the game board
const gameBoardTiles = (()=>{
    
    let gBoard = [['_', '_', '_'],
                  ['_', '_', '_'],
                  ['_', '_', '_']];
    let aiBoard = [[0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8]];
    let turns = 0;
    let player = 'X', opponent = 'O';
    function getRandomInt() {
        return Math.floor(Math.random() * 3);
      }
    //checks if the game is over
    let gameOver = false;
    //checks whose turn it is to move;
    let whoseTurn = 0;
    //this creates the divs
    const makeTiles = () =>{     
        //rows creation
        for (let i = 0; i<3; i++){
            for (let j = 0; j<3; j++ ){
            let tileHolder = document.createElement('div');
            gameBoard.appendChild(tileHolder);
            let tiles = document.createElement('div');
            tiles.classList.add('tile');
            let clicked = false;
            let rCoord = i;
            let cCoord = j;
            tileHolder.appendChild(tiles);

            tileHolder.onclick = function(){ 
                
                //can only set it once
                if(!clicked&&!gameOver){    
                    tiles.style.transform = 'scale(0.7)';
                    whoseTurn = ++whoseTurn % 2;
                    tiles.textContent = setTile(rCoord, cCoord);
                    //check tie;
                    if (turns == 8){
                        if (checkBoard(gBoard) != 10 || checkBoard(gBoard) != -10){
                            gameOver = true;
                            showResult();
                        }
                    }//check if someone has already won 
                    if (checkBoard(gBoard) == 10){
                        showResult('X');
                        gameOver = true;
                    }else if(checkBoard(gBoard) == -10){
                        showResult('O');
                        gameOver = true;
                    }//checks if auto move is on 
                    if (aiOn){
                        
                        setInterval(() => {
                            if(pOrder){
                                if (whoseTurn){
                                    robotRandTurn();
                                }
                            }
                            else{
                                if(!whoseTurn){
                                    robotRandTurn();
                                }
                            }
                            
                        }, 500);
                    }
                    turns++                                       
                }
                clicked = true;
            }
            }
        } 
        if (!pOrder&&aiOn){
            robotRandTurn();
        }
    } 
    
    const robotRandTurn = () =>{
        if (turns <9&&aiOn){
        let ranTile = document.querySelectorAll('.tile');
        let randR = getRandomInt();
        let randC = getRandomInt(); 
        let aiTile = aiBoard[randR][randC];
        let moveLook = bestMove();
        if (moveLook != -1){
            ranTile[moveLook].click();
        }else if(aiTile!= '_'){
            ranTile[aiTile].click();
        }else{
            robotRandTurn();
        }
        }
        
    }
    
    //setting x/o on tiles on click
    const setTile = (r, c) =>{
        if(whoseTurn){
            gBoard[r][c] = player;
            aiBoard[r][c] = '_';
            return player;
        }else{
            gBoard[r][c] = opponent;
            aiBoard[r][c] = '_';
            return opponent;
        }   
    }
    const bestMove = () => {
        
        aiMove = [-1,-1];
        pMove = [-1, -1];
        let best = -1;
        //see if player is winning
        for (let i = 0; i<3; i++){
            for (let j = 0; j<3; j++){
                if (gBoard[i][j] == '_'){
                    gBoard[i][j] = opponent;
                    if (checkBoard(gBoard) == -10){
                        winActive = true;
                        best = aiBoard[i][j];
                    }
                    gBoard[i][j] = '_'
                    gBoard[i][j] = player;
                    
                    if (checkBoard(gBoard) == 10){
                        best = aiBoard[i][j];   
                     }
                    gBoard[i][j] = '_'
                }
                
            }
        }
        return best; 
    }
    const checkBoard = (board) => {
        for (let counter = 0; counter < 3; counter++){
            //check rows
            if (board[counter][0] == board[counter][1] && board[counter][1] == board[counter][2]){
                if (board[counter][0] == opponent)
                return -10;
                if (board[counter][0] == player)
                return +10;
                
            }
            //check columns
            if (board[0][counter] == board[1][counter] && board[1][counter] == board[2][counter]){
                if (board[0][counter] == opponent)
                return -10;
                if (board[0][counter] == player)
                return +10;
                
            }
        }
        //check diagonal
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            if (board[0][0] == opponent)
            return -10;
            if (board[0][0] == player)
            return +10;
            
            
        }
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            if (board[0][2] == opponent)
            return -10;
            if (board[0][2] == player)
            return +10;    
        }
        return 0;
    }
    const showResult = (res) =>{
        if (!res){
            result.textContent = 'Tie!';
        }else{
            result.textContent = res+' wins!';
        }
        enabled = false;
        twoPlayer.removeAttribute('Disabled');
        twoPlayer.style.color = 'rgb(255, 255, 255)';
        btnBar.style.height = '0';
        wrapper.style.display = 'flex';
    }
    const make = () =>{
        gBoard = [['_', '_', '_'],
                  ['_', '_', '_'],
                  ['_', '_', '_']];
        aiBoard = [[0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8]];
        winActive = false;
        turns = 0;
        gameOver = false;
        whoseTurn = 0;
        while (gameBoard.hasChildNodes()) {
            gameBoard.removeChild(gameBoard.lastChild);
          }
        makeTiles();
    }
    return{make};
})();
gameBoardTiles.make(false, true);

