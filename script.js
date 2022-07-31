const gameBoard = document.getElementById('game-board');

const gameBoardTiles = (()=>{
    let gBoard = [['_', '_', '_'],
                  ['_', '_', '_'],
                  ['_', '_', '_']];
    let player = 'x', opponent = 'o';
    //checks if the game is over
    let gameOver = false;
    //checks whose turn it is to move;
    let whoseTurn = 0;
    //this creates the divs
    const makeTiles = () =>{
        //rows creation
        gBoard.forEach(rows => {
            //column creation
            rows.forEach(columns => {

            let tileHolder = document.createElement('div');
            gameBoard.appendChild(tileHolder);
            let tiles = document.createElement('div');
            tiles.classList.add('tile');
            let clicked = false;
            tileHolder.appendChild(tiles);
            tileHolder.onclick = function(){
                let rCoord = gBoard.indexOf(rows);
                let cCoord = rows.indexOf(columns);
                tiles.classList.remove('tile');
                //can only set it once
                if(!clicked){
                    tiles.style.transform = 'scale(0.7)';
                    tiles.classList.remove('tile');
                    whoseTurn = ++whoseTurn % 2;
                    tiles.textContent = setTile(rCoord,cCoord);
                    console.log();
                    let availableTiles = document.querySelectorAll('.tile');
                    /*if (whoseTurn){
                        robotTurn();
                    }*/
                    
                }
                clicked = true;
            }
            });
            
        });
    }

    const robotTurn = () =>{
        let availableTiles = document.querySelectorAll('.tile');
    }
    //setting x/o on tiles on click
    const setTile = (r, c) =>{
        if(whoseTurn){
            gBoard[r][c] = player;
            return player;
        }else{
            gBoard[r][c] = opponent;
            return opponent;
        }   
    }
    //
    const checkBoard = () => {
        for (let counter = 0; counter < 3; counter++){
            //check rows
            if (gBoard[counter][0] == gBoard[counter][1] && gBoard[counter][1] == gBoard[counter][2]){
                if (gBoard[counter][0] == player)
                return +10;
                else if (gBoard[counter][0] == opponent)
                return -10;
            }
            //check columns
            if (gBoard[0][counter] == gBoard[1][counter] && gBoard[1][counter] == gBoard[2][counter]){
                if (gBoard[0][counter] == player)
                return +10;
                else if (gBoard[0][counter] == opponent)
                return -10;
            }
        }
        //check cross
        if (gBoard[0][0] == gBoard[1][1] && gBoard[1][1] == gBoard[2][2]){
            if (gBoard[0][0] == player)
            return +10;
            else if (gBoard[0][0] == opponent)
            return -10;
            
        }
        if (gBoard[0][2] == gBoard[1][1] && gBoard[1][1] == gBoard[2][0]){
            if (gBoard[0][2] == player)
            return +10;
            else if (gBoard[0][2] == opponent)
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