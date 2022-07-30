const gameBoard = document.getElementById('game-board');

const gameBoardTiles = (()=>{
    let placements = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let whoseTurn = 0;
    let turns = 0;
    let x = [];
    let o = [];
    let winstate = 0;
    let gameOver = false;
    //this creates the divs
    const makeTiles = () =>{
        placements.forEach(element => {
            let tileHolder = document.createElement('div');
            gameBoard.appendChild(tileHolder);

            let tiles = document.createElement('div');
            tiles.classList.add('tile');
            //this is a listener to set the text content to x/o depending on whose turn it is.
            let clicked = false;
            tileHolder.onclick = function(){
                tiles.classList.remove('tile');
                //can only set it once
                if(!clicked&&!gameOver){
                    whoseTurn = ++whoseTurn % 2;
                    tiles.style.transform = 'scale(0.7)';
                    tiles.textContent = setTile(element);
                    turns++;
                    if (turns == 9&& !winstate){
                        announceWinner();
                    }
                    if(whoseTurn){
                        setTimeout(() => {
                            robotTurn();
                        }, 500);   
                    }
                    console.log(turns);
                }
                clicked = true;
            }
            tileHolder.appendChild(tiles);
        });
    }
    const robotTurn = () =>{
        if(turns!=9){
        ranTile = document.querySelectorAll('.tile');
        function getRandomInt() {
            return Math.floor(Math.random() * ranTile.length);
          }
        ranTile[getRandomInt()].click();
        }
    }
    //setting x/o on tiles on click
    const setTile = (element) =>{
        if (whoseTurn){
            x.push(element);
            whoWins(x);
            return 'x';
        }else{
            o.push(element);
            whoWins(o);
            return 'o';
        }   
    }

    const whoWins = (checker) => {
        //horizontal checks, could be done better but we
        if (checker.includes(0) && checker.includes(1) && checker.includes(2)){
            winstate++;
            announceWinner(whoseTurn);
        }else if(checker.includes(3) && checker.includes(4) && checker.includes(5)){
            winstate++;
            announceWinner(whoseTurn);
        }else if(checker.includes(6) && checker.includes(7) && checker.includes(8)){
            winstate++;
            announceWinner(whoseTurn);
            //vertical checks, could be done better but we
        }else if(checker.includes(0) && checker.includes(3) && checker.includes(6)){
            winstate++;
            announceWinner(whoseTurn);
        }else if(checker.includes(1) && checker.includes(4) && checker.includes(7)){
            winstate++;
            announceWinner(whoseTurn);
        }else if(checker.includes(2) && checker.includes(5) && checker.includes(8)){
            winstate++;
            announceWinner(whoseTurn);
            //corner checks, could be done better but we
        }else if(checker.includes(0) && checker.includes(4) && checker.includes(8)){
            winstate++;
            announceWinner(whoseTurn);
        }else if(checker.includes(2) && checker.includes(4) && checker.includes(6)){
            winstate++;
            announceWinner(whoseTurn);
        }
    }
    const announceWinner = () =>{
        if(winstate == 0){
            console.log('Tie');
        }else{
            console.log((whoseTurn?'x':'o')+' wins'); 
        }
        console.log(winstate);
        gameOver = true;
    }

    return{makeTiles};
})();
gameBoardTiles.makeTiles();

/*Create new board, for use later
while (gameBoard.hasChildNodes()) {
            gameBoard.removeChild(gameBoard.lastChild);
          } */