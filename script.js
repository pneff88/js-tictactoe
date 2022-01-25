const rowA = document.querySelector("#a")
const rowB = document.querySelector("#b")
const rowC = document.querySelector("#c")

rowA.firstChild.nextSibling.textContent = "X"

const Player = (name, symbol) => {
    let winCount = 0;
    let playerMoves = [];
    return {
        name,
        symbol,
        winCount,
    }
}

const Gambeboard = () => {
    let squares = document.querySelectorAll(".grid-item");

    squares.forEach((div) => {
        div.addEventListener("click", function() {
            if (this.innerHTML === "O" || this.innerHTML === "X") {
                //do nothing
            } else if (this.innerHTML === "" && gameFlow.moveCount %2 !== 0) {
                gameFlow.players[1].playerMoves.push(div.id);
                gameFlow.moveCount++;
            } else if (this.innerHTML === "") {
                gameFlow.players[0].playerMoves.push(div.id);
                gameFlow.moveCount++
            }

            gameFlow.checkmoves(gameFlow.players[0].playerMoves);
            gameFlow.checkMoves(gameFlow.players[1].playerMoves);

            if (
                gameFlow.players[0].playerMoves.length +
                    gameFlow.players[1].playerMoves.length ===
                    9
            ) {
                gameFlow.tie();
            }
        });
    });
}

let eventListeners = (() => {
    let squares = document.querySelectorAll(".grid-item");

    squares.forEach((div) => {
        div.addEventListener("click", function () {
            if (
                gameFlow.hasWon === false && this.innerHTML === "" && gameFlow.moveCount % 2 === 0
            ) {this.innerHTML = "O"
            } else if (this.innerHTML === '' && gameFlow.hasWon === false) {
                this.innerHTML = "X";
            } else if (gameFlow.hasWon === true) {
                this.innerHTML = "";
                gameFlow.hasWon = false;
            }

        })
    })
})

const gameFlow = (() => {
    let players = [];
    let moveCount = 0;
    let hasWon = false;

    let convertArray = (x) => {
        for (i=0; i <x.length; i++) {
            x[i] = parseInt(x[i], 10);
        }
    };

    let checkMoves = (x) => {
        convertArray(x);
        for (i=1; i<10; i++) {
            if (
                (i===1 || i === 4 || i=== 7) &&
                x.includes(i) &&
                x.includes(i+1) &&
                x.includes(i+2) 
            ) {
                win();
                break;
            } else if (
                i === 3 && 
                x.includes(i) && 
                x.includes(i+2 && 
                x.inclues(i+4)
            ) {
                win();
                break;
            } else if (x.includes(i) && x.includes(i+3) && x.includes(i+6)) {
                win();
                break;
            } else if (x.includes(i) && x.includes(i+4) && x.includes(i+8)) {
                win();
                break;
            }
        }
    };

    let win=() => {
        sendMessage();
        addPoint();
        formHandler.updateScore();
        gameFlow.hasWon = true;
        clearGrid();
    }

    let clearGrid = () => {
        let squres = document.querySelectorAll(".grid-item");
        squares.forEach((div) => {
            div.innerHTML = '';
        });
        gameFlow.players[0].playerMoves = [];
        gameFlow.players[1].playerMoves = [];
    };

    let addPoint = () => {
        if (gameFlow.moveCount % 2 === 0) {
            players[1].winCount++;
            gameFlow.moveCount = 2;
        } else {
            players[0].winCount++;
            gameFlow.moveCount = 1;
        }
    };

    let tie = () => {
        let message = document.getElementById("message");

        let clearMessage = () => {
            message.innerHTML = '';
        };
        message.innerHTML = "Tie.";
        setTimeout(clearMessage, 2000);

        gameFlow.hasWon = true;
        gameFlow.moveCount = 0;
        clearGrid();
    };

    //random vic messages

    let sendMessage = () => {
        let message = document.getElementById("message");
        let number = Math.round(Math.random() * 10);

        let clearMessage = () => {
            message.innerHTML = '';
        };

        let randomMessage = (() => {
            if (gameFlow.moveCount % 2 === 0) {
                if (number < 2) {
                    message.innerHTML = `${gameFlow.player[1].name}'s point!`;
                } else if (number >= 2 && number < 4) {
                    message.innerHTML = `${gameFlow.player[1].name} got that one!`;
                } else if (number >=5 && number < 10) {
                    message.innerHTML = `${gameFlow.player[1].name}! ${gameFlow.player[1].name}!`;
                }
            } else {
                message.innerHTML = `${gameFlow.players[0].name}'s point!`
            }
        }; 
        setTimeout(clearMessage, 2000); 
    }
    return {
        moveCount;
        players;
        checkMoves;
        win,
        tie,
        clearGrid,
        hadWon
    };
})

//form modal

let formHandler = (() => {
    let form = document.getElementById('form');
    let modal = document.getElementById('myModal');
    let p2Human = document.getElementById('human');

    p2Human.checked=true;

    function handleForm(event) {
        modal.style.display='none';
        event.preventDefault();
    }

    function getPlayers() {
        let p1 = document.getElementsByName("p1");
        let p2 = document.getElementsByName('p2');

        let player1 = Player(p1);
        let player2 = Player(p2);

        if (p2Human.checked === false) {
            player2.isBot = true; 
        }

        gameFlow.players.push(player1);
        gameFlow.players.push(player2);
    }

    function showScore() {
        let player1Scoreboard = document.getElementById('p1-score');
        let player1Score = document.createTextNode(
            `${gameFlow.players[0].name}: ${gameFlow.players[0].winCount}`
        );
        player1Scoreboard.appendChild(player1Score);
        
        let player2Scoreboard = document.getElementById('p2-score');
        let playerScore = document.createTextNode(
            `${gameFlow.players[1].name}: ${gameFlow.players[1].winCount}`
        );
        player2Scoreboard.appendChild(playerScore);
    }

    function updateScore() {
        let player1Scoreboard = document.getElementById('p1-score');
        player1Scoreboard.innerHTML = `${gameFlow.players[0].name}: ${gameFlow.players[0].winCount}`;

        let player2Scoreboard = document.getElementById('p2-score');
        player2Scoreboard.innerHTML = `${gameFlow.players[1].name}: ${gameFlow.players[1].winCount}`
    }

    return {
        showScore,
        updateScore,
    }


});