let playerCard = document.querySelector(".player.card .choice");
let playerText = document.querySelector(".player.card .text")
let computerCard = document.querySelector(".computer.card .choice");
let computerText = document.querySelector(".computer.card .text");

//playGame
function playRound(humanChoice, computerChoice, gameState){
    //Determine winner loser, update Win count
    //Output Winner/Loser statements
    //Start with Base case, draw
    
    let humanWins = false;
    if (!gameState){
        var gameState = {
            human:{
                value: 0
            },
            computer:{
                value: 0
            }
        }
    }

    if (humanChoice == computerChoice){
        console.log(`Tie! ${humanChoice} neutralizes itrself.` );
        return gameState;

    } else if (humanChoice == 'rock'){
        if (computerChoice == 'scissors'){
            humanWins = true;
        } //else computerChoice == 'paper', humanWins = false;

    } else if (humanChoice == 'paper'){
        if (computerChoice == 'rock') humanWins = true;

    } else if (humanChoice == 'scissors'){
        if (computerChoice == 'paper') humanWins = true;
    
    } 

    setTimeout(function wrapper(){
        if (humanWins) {
            playerText.innerHTML = `${humanChoice} beats ${computerChoice}.`;
        } else {
            computerText.innerHTML = `${computerChoice} beats ${humanChoice}.`;
        }
        //UI Update
        playerCard.innerHTML = `${humanChoice}`;
        computerCard.innerHTML = `${computerChoice}`;
    }, 100);


    if (humanWins) {
        console.log(`Human wins! ${humanChoice} beats ${computerChoice}.`);
        gameState.human.value += 1;

    } else {
        console.log(`Computer wins! ${computerChoice} beats ${humanChoice}.`);
        gameState.computer.value += 1;
    }

    //UI Update
    // playerCard.innerHTML = `${humanChoice}`;
    // computerCard.innerHTML = `${computerChoice}`;
    return gameState;
}


function getHumanChoice(e){
    let choice;
    const buttonClicked = e.target.id;
    // console.log(e.target.id);

    switch(buttonClicked){
        case 'rock':
            choice = 'rock';
            break;
        case 'paper':
            choice = 'paper';
            break;
        case 'scissors':
            choice = 'scissors';
            break;
        default:
            choice = null;
            break;
    }
    return choice;
}
    
    // let inputValid = false;
    // let choice = '';

    // while(!inputValid){
    //     choice = prompt("Choose Rock Paper or Scissors: ", "Paper");

    //     if (choice || false){                
    //         choice = choice.toLowerCase();
    //         switch(choice.trim()){
    //             case 'rock': choice = 'rock';
    //                 inputValid = true;
    //                 break;
    //             case 'paper': choice = 'paper';
    //                 inputValid = true;
    //                 break;
    //             case 'scissors': choice = 'scissors';
    //                 inputValid = true;
    //                 break;
    //             default:
    //                 console.log(`${choice} was given, INPUT INVALID!`);
    //         }
    //     }
    //     else {
    //         console.log("Please enter a choice, try again.");
    //     }
    // }

    // return choice;
// }

function getComputerChoice(){
    //Math.random 0-3.33 is Rock, 0.34 - 0.66 is Paper, 0.67 - 0.99 is Scissors
    rng = Math.random();
    choice = rng <= 0.33 ? 'rock' : rng <= 0.66 ? 'paper' : 'scissors';
    return choice;
}

function checkGameOver(gameState, {winnerFound, humanScore, computerScore}){
    humanScore = gameState.human.value;
    computerScore = gameState.computer.value;
    console.log(`Human: ${humanScore}, Computer: ${computerScore}\n`);

    //End Game condition:
    if (humanScore >= 5 || computerScore >= 5) winnerFound = true;
    if (winnerFound){        
        const winner = humanScore>computerScore ? 'human' : 'computer';
        const gameOver = new CustomEvent('gameOver', {detail: winner});
        if (humanScore>computerScore){
            console.log(`END GAME
                Human is winner!`);
        } else {
            console.log(`END GAME
                Computer is winner!`);
        } 
        
        buttons.dispatchEvent(gameOver);
        
        // buttons.removeEventListener('click', humanClickButton);
    }

    
}

const buttons = document.querySelector(".buttons");

const humanClickButton = function a(gameState, {winnerFound, humanScore, computerScore}){
    const initRound = function b(e){
        const humanChoice = getHumanChoice(e);
        if (humanChoice){
            const computerChoice = getComputerChoice();
            gameState = playRound(humanChoice, computerChoice, gameState);
            checkGameOver(gameState, {winnerFound, humanScore, computerScore});
        }

    };
    return initRound;

}


function playGame(){
    ///Does playRound, until one player wins 5 rounds.
    
    const lazyState = {
        winnerFound : false,
        humanScore :0,
        computerScore: 0
    }
    let gameState = {
        human:{
            value: 0
        },
        computer:{
            value: 0
        }
    };

    let tests = humanClickButton(gameState, {...lazyState});
    buttons.addEventListener('click', tests );
    

    buttons.addEventListener('gameOver', () => {
        console.log('trying to rmoev');
        buttons.removeEventListener('click', tests);
    });
    
}


//TODO: Popup modal when win, restart game when modal closed.

playGame();