//variable for computer selection
let computer_selection;
//variable for player selection
let player_selection;
//variables for rock paper and scissors
const rock = ("rock");
const paper = ("paper");
const scissors = ("scissors");
const quitGame = ('quit');
//array for rock, paper, and scissors
selection_array = [rock, paper, scissors];
//player attack/defend phrase
rockAttack_array = ["*throws rock*", "*skips stone at ankles*", "*bashes with boulder*"];
paperAttack_array = ["*papercuts*", "*calls in paper airstrike*", "*sends spitwad*"];
scissorsAttack_array = ["*wildly swings scissors*", "*drops scissors at opponets feet*", "*cuts hair atrociously*"];
rockDefend_array = ["*stone helmet*", "*moves mountain*", "*big boulder defense*"];
paperDefend_array = ["*has a paper defense*", "*builds a paper wall*", "*uses paper mache shield*"];
scissorsDefend_array = ["*opens scissor blade*", "*activates scissor trapcard*", "*stabby stabby*"];
//round result array
roundTie_array = ["Your attack was completely ineffective", "You did zero damage", 
"This round accomplished nothing", "Nice try but, not really..."];
roundWin_array = [`${playertwousername.textContent} was left with crippling depression`, 
`${playertwousername.textContent} fell victim to your abuse`, `${playertwousername.textContent}'s foresight wasn't strong enough` ];
roundLoss_array = [`${playeroneusername.textContent} can no longer function properly`, 
`${playeroneusername.textContent} got caught slipping`, `${playeroneusername.textContent} fell victim to extreme bullying`];
//variable for current round
let current_round = 1;
//variables for player and computer points
let player_points = 0;
let computer_points = 0;
//variable for player name
let player_name;
//variable for games played
let games_played = 0;
//variable for win/loss streak
let player_performance = 0;
let performance_modifier = 0.02;
//bools for difficulty
let difficultyNormal = 0;
let difficultyEasy = 1;
let difficultyHard = 2;
let current_difficulty = difficultyNormal;
//analytic variables
let playerPickedRock = 0;
let playerPickedPaper = 0;
let playerPickedScissors = 0;
let compPickedRock = 0;
let compPickedPaper = 0;
let compPickedScissors = 0;
let gamesWon = 0;
let gamesLost = 0;
let longestGameWinStreak = 0;
let currentGameWinStreak = 0;
let longestRoundWinStreak = 0;
let currentRoundWinStreak = 0;
let longestWinningSelectionStreak = 0;
let currentWinningSelectionStreak = 0;
let lastSelection = null;
let streakItem = null;
let wonCurrentGame = false;
let wonCurrentRound = false;
let isGameEnded = false;
//DOM variables
const container = document.querySelector('#begin-game');
const gameDescription = document.createElement('div');
const gameHeader = document.createElement('p');

//function for game start
function StartGame()
{
    homepagebtns.style.display = "none";
    quitGameContainer.style.display = "flex";
    selectionContainer.style.display = "flex";
    roundResult.style.display = "flex";
    playerscontainer.style.display = "flex";
    _quitGame.style.display = "flex";
    current_round= 1;
    roundNumber.textContent = "Round: " + current_round;
    SetDifficulty();
}


//function for computer turn aka computer selection phase
function ComputerPlayCycle()
{
    //select a random variable from the array
    computer_selection = selection_array[Math.floor(Math.random() * selection_array.length)];
    //initiate the engagement phase of the round
    DefendPhrase(computer_selection);
    PlayRound(player_selection, computer_selection);
}
//difficulty based ComputerPlayCycle
function DComputerPlayCycle()
{
    let d = Math.random();
    
    //adjust computer selection percentages to match difficulty 
    function EasyPlayCycle(d)
    {
        if(player_selection == rock)
        {
            if(d <= 0.45 - performance_modifier)
                computer_selection = scissors;
            else if(d <= 0.7)
                computer_selection = rock;
            else
                computer_selection = paper;
        }  
        if(player_selection == paper)
        {
            if(d <= 0.45 - performance_modifier)
                computer_selection = rock;
            else if(d <= 0.7)
                computer_selection = paper;
            else
                computer_selection = scissors;
        }
        if(player_selection == scissors)
        {
            if(d <= 0.45 - performance_modifier)
                computer_selection = paper;
            else if(d <= 0.7)
                computer_selection = scissors;
            else
                computer_selection = rock;
        }
        DefendPhrase(computer_selection);
        PlayRound(player_selection, computer_selection); 
    }
    function HardPlayCycle(d)
    {
        if(player_selection == rock)
        {
            if(d <= 0.45 + performance_modifier)
                computer_selection = paper;
            else if(d <= 0.73)
                computer_selection = rock;
            else
                computer_selection = scissors;
        }  
        if(player_selection == paper)
        {
            if(d <= 0.45 + performance_modifier)
                computer_selection = scissors;
            else if(d <= 0.73)
                computer_selection = paper;
            else
                computer_selection = rock;
        }
        if(player_selection == scissors)
        {
            if(d <= 0.40 + performance_modifier)
                computer_selection = rock;
            else if(d <= 0.73)
                computer_selection = scissors;
            else
                computer_selection = paper;
        }
        DefendPhrase(computer_selection);
        PlayRound(player_selection, computer_selection);
    }
    
    //check the current difficulty modifier
    if(current_difficulty == difficultyEasy)
    {
        EasyPlayCycle(d);
    }
    if(current_difficulty == difficultyNormal)
    {
        ComputerPlayCycle();
    }
    if(current_difficulty == difficultyHard)
    {
        HardPlayCycle(d);
    }
}
function DefendPhrase(defendSelection)
{
    switch(defendSelection)
    {
        case (rock):
            playertwoattackphrase.textContent = rockDefend_array[Math.floor(Math.random() * rockDefend_array.length)];
            compPickedRock++;
            break;
        case (paper):
            playertwoattackphrase.textContent = paperDefend_array[Math.floor(Math.random() * paperDefend_array.length)];
            compPickedPaper++;
            break;
        case (scissors):
            playertwoattackphrase.textContent = scissorsDefend_array[Math.floor(Math.random() * scissorsDefend_array.length)];
            compPickedScissors++;
            break;                    
    }
}

//function for player turn aka player selection phase
function PlayerTurn(selection)
{
    //allow player to make a selection
    player_selection = selection;
    AttackPhrase(player_selection);
    //check wether selection was made and if it is possible
    //otherwise resets player selection phase
    if(player_selection === null || player_selection === undefined)
    {
        return;
    }
    else if(player_selection === quitGame)
    {
        EndGame();
    }
    else
    {
        //initiate computer selection phase
        if (games_played < 2)
            ComputerPlayCycle();
        else
            DComputerPlayCycle();
    }
}
function AttackPhrase(attackSelection)
{
    switch(attackSelection)
    {
        case (rock):
            playeroneattackphrase.textContent = rockAttack_array[Math.floor(Math.random() * rockAttack_array.length)];
            playerPickedRock++;
            break;
        case (paper):
            playeroneattackphrase.textContent = paperAttack_array[Math.floor(Math.random() * paperAttack_array.length)];
            playerPickedPaper++;
            break;
        case (scissors):
            playeroneattackphrase.textContent = scissorsAttack_array[Math.floor(Math.random() * scissorsAttack_array.length)];
            playerPickedScissors++;
            break;                    
    }
}


//function for Round Engagement
function PlayRound(player_selection, computer_selection)
{
    //check if either selection phase failed
    //if so return to selection phase
    if(computer_selection === null) 
    {
        return PlayerTurn(player_selection);
    }
    else 
    {
        //check if both players made same selection for a tie
        //if not compare player selection to computer selection
        //determine who wins/loses the round
        if(player_selection === computer_selection)
        {
            RoundTie();
        }
        else if(player_selection === rock)
        {
            switch(computer_selection)
            {
                case (paper):
                    RoundLoss();
                    break;
                case (scissors):
                    RoundWin();
                    break;     
            }
        }
        else if(player_selection === paper)
        {
            switch(computer_selection)
            {
                case (scissors):
                    RoundLoss();
                    break;
                case (rock):
                    RoundWin();
                    break;     
            }
        }
        else if(player_selection === scissors)
        {
            switch(computer_selection)
            {
                case (rock):
                    RoundLoss();
                    break;
                case (paper):
                    RoundWin();
                    break;     
            }
        }
    }
}

//functions for round win/loss/tie
function RoundWin()
{
    wonCurrentRound = true;
    container.classList.add("no_click");
    RoundResultAfterDelay(1);
}
function RoundLoss()
{
    wonCurrentRound = false;
    container.classList.add("no_click");
    RoundResultAfterDelay(-1);
}
function RoundTie()
{
    container.classList.add("no_click");
    RoundResultAfterDelay(0);
}
function RoundResultAfterDelay(result)
{
    function RoundResult()
    {
        lastSelection = player_selection;
        if(result > 0)
        {
            playeronescore.classList.add("pointreward");
            player_points++;
            playeronescore.textContent = player_points;
            roundResult.textContent = 'ROUND WON!';
            roundResult.style.color = "green";
            roundResultMessage.textContent = roundWin_array[Math.floor(Math.random() * roundWin_array.length)];
            NextRoundAfterDelay();
        }
        else if(result < 0)
        {
            playertwoscore.classList.add("pointreward");
            computer_points++;
            playertwoscore.textContent = computer_points;
            roundResult.textContent = 'ROUND LOST!';
            roundResult.style.color = "red";
            roundResultMessage.textContent = roundLoss_array[Math.floor(Math.random() * roundLoss_array.length)];
            NextRoundAfterDelay();
        }
        else
        {
            roundResult.textContent = 'ROUND TIE!';
            roundResult.style.color = "black";
            roundResultMessage.textContent = roundTie_array[Math.floor(Math.random() * roundTie_array.length)];
            NextRoundAfterDelay();
        }
    }
    StreakManager();
    window.setTimeout(RoundResult, 500);
}

//function for Round Progression
function NextRoundAfterDelay()
{
    window.setTimeout(NextRound,1000);
}
function NextRound()
{
    UpdateAnalytics();
    playeronescore.classList.remove("pointreward");
    playertwoscore.classList.remove("pointreward");
    wonCurrentRound = false;
    player_selection = null;
    computer_selection = null;
    container.classList.remove("no_click");
    roundResultMessage.textContent = null;
    roundResult.textContent = null;
    playeroneattackphrase.textContent = null;
    playertwoattackphrase.textContent = null;
    //check if either player has won the game
    if(player_points == 5 || computer_points == 5)
    {
        //once determind progess to game win/loss events
        selectionContainer.style.display = "none";
        roundResult.style.display = "none";
        playerscontainer.style.display = "none";
        games_played++;
        isGameEnded = true;

        if(player_points == 5)
        {
            wonCurrentGame = true;
            GameWon();
        }
        else if(computer_points == 5)
        {
            wonCurrentGame = false;
            GameOver();
        }
    } 
    //reset selections and progress to next round
    else 
    {        
        current_round++;
        roundNumber.textContent = "Round: " + current_round;
        console.log("Round: " + current_round); 
    }
}

//function for game won
function GameWon() 
{
    StreakManager();
    player_performance++;
    gamesWon++;
    gameResultContainer.style.display = "block";
    _playAgain.style.display = "flex";
    _gameResult.textContent = "YOU WIN!";
    _gameResult.classList.add("you");
    _gameEndMessage.textContent = "Nice work! You really taught that bully a lesson."
    SwitchWinnerPhoto();
}
//function for game over
function GameOver()
{
    StreakManager();
    player_performance--;
    gamesLost++;
    gameResultContainer.style.display = "block";
    _playAgain.style.display = "flex";
    _gameResult.textContent = "YOU LOSE!";
    _gameResult.classList.add("opponent");
    _gameEndMessage.textContent = "Mission failed! We'll get him next time."
    SwitchWinnerPhoto();
}
function SwitchWinnerPhoto()
{
    if(!wonCurrentGame)
        document.getElementById("endPicture").src = "Images/SchoolBully.jpeg";
    else
        document.getElementById("endPicture").src = "Images/PlayerOne.jpeg";
}

//function for play again
function PlayAgain()
{    
    gameResultContainer.style.display = "none";
    _playAgain.style.display = "none";
    _gameResult.classList.remove("you");
    _gameResult.classList.remove("opponent");
    player_points = 0;
    computer_points = 0;
    current_round = 1;
    playertwoscore.textContent = computer_points;
    playeronescore.textContent = player_points;
    isGameEnded = false;
    UpdateAnalytics();
    StartGame();
}
//function for end game
function EndGame() 
{
    UpdateAnalytics();
    player_selection = null;
    computer_selection = null;
    lastSelection = null;
    let input = confirm("Are you sure you want to quit playing? Press 'OK' to Quit")
    
    if(input)
    {
        currentRoundWinStreak = 0;
        currentWinningSelectionStreak = 0;
        quitGameContainer.style.display = "none";
        _playAgain.style.display = "none";
        selectionContainer.style.display = "none";
        roundResult.style.display = "none";
        playerscontainer.style.display = "none";
        gameResultContainer.style.display = "none";
        _gameResult.classList.remove("you");
        _gameResult.classList.remove("opponent");
        player_points = 0;
        computer_points = 0;
        current_round = 1;
        playertwoscore.textContent = computer_points;
        playeronescore.textContent = player_points;
        alert("Thank you for playing!")
        homepagebtns.style.display = "flex";
    }
    else
    {
        return;
    }
}


//independent functions
function SetDifficulty()
{
    performance_modifier = 0.2;
    
    if(!player_performance == 0)
    {
        performance_modifier = performance_modifier * player_performance;        
    }
    if(player_performance < 0)
    {
        if(performance_modifier > 0)
        {
            performance_modifier = performance_modifier * -1;
        }
    }

    if(player_performance >= 2)
    {
        current_difficulty = difficultyHard;
        performance_modifier = performance_modifier * player_performance;
    }
    else if(player_performance <= -2)
    {
        current_difficulty = difficultyEasy;
    }
    else    
    {
        current_difficulty = difficultyNormal;
    }
}
function StreakManager()
{
    if(isGameEnded)
    {
        if(wonCurrentGame)
        {
            currentGameWinStreak++;
            if(longestGameWinStreak < currentGameWinStreak)
            {
                longestGameWinStreak = currentGameWinStreak;
            }
        }
        else
        {
            currentGameWinStreak = 0;
        }
    }
    else
    {
        if(wonCurrentRound)
        {
            currentRoundWinStreak++;
            if(longestRoundWinStreak < currentRoundWinStreak)
            {
                longestRoundWinStreak = currentRoundWinStreak;
            }
            if(lastSelection == player_selection)
            {
                currentWinningSelectionStreak++;
                if(currentWinningSelectionStreak > longestWinningSelectionStreak)
                {
                    longestWinningSelectionStreak = currentWinningSelectionStreak;
                    streakItem = player_selection.toUpperCase();
                }
            }
            else if(lastSelection === null)
            {
                currentWinningSelectionStreak++;
                if(currentWinningSelectionStreak > longestWinningSelectionStreak)
                {
                    longestWinningSelectionStreak = currentWinningSelectionStreak;
                    streakItem = player_selection.toUpperCase();
                }
            }
            else
            {
                currentWinningSelectionStreak = 1;
            }
        }
        else
        {
            currentWinningSelectionStreak = 0;
            currentRoundWinStreak = 0;
        }
    }
}
function OpenAnalytics()
{
    homepagebtns.style.display = "none";
    analyticsContainer.style.display = "block";
}
function CloseAnalytics()
{
    analyticsContainer.style.display = "none";
    homepagebtns.style.display = "flex";
}
function UpdateAnalytics()
{
    roundStreak.textContent = longestRoundWinStreak;
    currentGameStreak.textContent = currentGameWinStreak;
    gameStreak.textContent = longestGameWinStreak;
    streakItemID.textContent = streakItem;
    selectionStreak.textContent = longestWinningSelectionStreak;
    rockHistoryCount.textContent = playerPickedRock;
    paperHistoryCount.textContent = playerPickedPaper;
    scissorsHistoryCount.textContent = playerPickedScissors;
    rockHistoryCountComp.textContent = compPickedRock;
    paperHistoryCountComp.textContent = compPickedPaper;
    scissorsHistoryCountComp.textContent = compPickedScissors;
    gameWinCount.textContent = gamesWon;
    gameLossCount.textContent = gamesLost;
}

UpdateAnalytics();

_playAgain.addEventListener('click', () => {PlayAgain();});
_start.addEventListener('click', () => {StartGame();});
_rock.addEventListener('click', ()=> PlayerTurn(rock));
_paper.addEventListener('click', ()=> PlayerTurn(paper));
_scissors.addEventListener('click', ()=> PlayerTurn(scissors));
_quitGame.style.display = "none";
_quitGame.addEventListener('click', ()=> PlayerTurn(quitGame));
_analytics.addEventListener('click', ()=> OpenAnalytics());
_closeAnalytics.addEventListener('click', ()=> CloseAnalytics());
selectionContainer.style.display = "none";
roundResult.style.display = "none";
playerscontainer.style.display = "none";
analyticsContainer.style.display = "none";
gameResultContainer.style.display = "none";
_playAgain.style.display = "none";
playerOneIDName.textContent = playeroneusername.textContent;
playerTwoIDName.textContent = playertwousername.textContent;
roundNumber.textContent = "Round: " + current_round;