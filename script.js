const gameBoard = document.getElementById('game-board');

const gameBoardTiles = (()=>{
    let gBoard = [['_', '_', '_'],
                  ['_', '_', '_'],
                  ['_', '_', '_']];
    let aiBoard = [[0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8]];
    let player = 'x', opponent = 'o';
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

                    if (checkBoard(gBoard) == 10){
                        gameOver = true;
                    }else if(checkBoard(gBoard) == -10){
                        gameOver = true;
                    }

                                   
                    setTimeout(() => {
                        if (whoseTurn){
                            
                            robotRandTurn();
                        } 
                    }, 500);

                    
                    
                }
                
                clicked = true;
            }

            }
        }
        
    }
    
    const robotRandTurn = () =>{
        
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
    //only did 1 depth level for minimax
    const bestMove = () => {
        let winActive = false;
        aiMove = [-1,-1];
        pMove = [-1, -1];
        let best = -1000;
        //see if player is winning
        for (let i = 0; i<3; i++){
            for (let j = 0; j<3; j++){
                if (gBoard[i][j] == '_'){
                    gBoard[i][j] = opponent;
                    if (checkBoard(gBoard) == -10){
                        winActive = true;
                        aiMove[0] = i;
                        aiMove[1] = j;
                    }
                    gBoard[i][j] = '_'
                }
                if (gBoard[i][j] == '_'){
                gBoard[i][j] = player;
                if (checkBoard(gBoard) == 10){
                        winActive = true;
                        aiMove[0] = i;
                        aiMove[1] = j;    
                }
                gBoard[i][j] = '_'
                }
                
            }
        }
        if (winActive){
            return aiBoard[aiMove[0]][aiMove[1]];
        }
        return -1;
        
        

        
    }
    //
    const checkBoard = (board) => {
        for (let counter = 0; counter < 3; counter++){
            //check rows
            if (board[counter][0] == board[counter][1] && board[counter][1] == board[counter][2]){
                if (board[counter][0] == player)
                return +10;
                else if (board[counter][0] == opponent)
                return -10;
            }
            //check columns
            if (board[0][counter] == board[1][counter] && board[1][counter] == board[2][counter]){
                if (board[0][counter] == player)
                return +10;
                else if (board[0][counter] == opponent)
                return -10;
            }
        }
        //check diagonal
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            if (board[0][0] == player)
            return +10;
            else if (board[0][0] == opponent)
            return -10;
            
        }
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            if (board[0][2] == player)
            return +10;
            else if (board[0][2] == opponent)
            return -10;
        }
        return 0;
    }
    const announceWinner = () =>{
    }
    return{makeTiles};
})();
gameBoardTiles.makeTiles();

/*Create new board, for use later
while (gameBoard.hasChildNodes()) {
            gameBoard.removeChild(gameBoard.lastChild);
          } */