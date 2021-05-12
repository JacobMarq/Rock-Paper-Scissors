//variable for computer selection
let computer_selection;
//variable for player selection
let player_selection;
//variables for rock paper and scissors
const rock = ("rock");
const paper = ("paper");
const scissors = ("scissors");
//array for rock, paper, and scissors
selection_array = [rock, paper, scissors];
//variable for current round
let current_round = 0;
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

//function for game start
function StartGame()
{
    let gameStart = confirm("Press 'OK' to begin playing!");
    if(gameStart)
    {
        PlayerTurn();
        gameStart = false;
    }
    else
    {
        return;
    }
}

//function for computer turn aka computer selection phase
function ComputerPlayCycle()
{
    //select a random variable from the array
    computer_selection = selection_array[Math.floor(Math.random() * selection_array.length)];
    console.log("Computer choice: " + computer_selection);
    //initiate the engagement phase of the round
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
            if(d <= 0.45)
                computer_selection = scissors;
            else if(d <= 0.7)
                computer_selection = rock;
            else
                computer_selection = paper;
        }  
        if(player_selection == paper)
        {
            if(d <= 0.45)
                computer_selection = rock;
            else if(d <= 0.7)
                computer_selection = paper;
            else
                computer_selection = scissors;
        }
        if(player_selection == scissors)
        {
            if(d <= 0.45)
                computer_selection = paper;
            else if(d <= 0.7)
                computer_selection = scissors;
            else
                computer_selection = rock;
        }
        console.log("Computer choice: " + computer_selection);
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
        console.log("Computer choice: " + computer_selection);
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

//function for player turn aka player selection phase
function PlayerTurn()
{
    function ImproperSelection()
    {
        console.log("You failed to make a proper selection.")
        PlayerTurn();
    }
    function PressedCancel()
    {
        EndGame();
    }

    //allow player to make a selection
    player_selection = prompt("Make your choice Rock, Paper, or Scissors: ");
    //check wether selection was made and if it is possible
    //otherwise resets player selection phase
    if(player_selection === null)
    {
        PressedCancel();
    }
    
    player_selection = player_selection.toLowerCase();
    
    if(selection_array.indexOf(player_selection) === -1)
    {
        ImproperSelection();
    }

    console.log("Player choice: " + player_selection);
    //initiate computer selection phase
    if (games_played < 2)
        ComputerPlayCycle();
    else
        DComputerPlayCycle();
}

//function for Round Engagement
function PlayRound(player_selection, computer_selection)
{
    //check if either selection phase failed
    //if so return to selection phase
    if(player_selection === null || computer_selection === null) 
    {
        player_selection = null;
        computer_selection = null;
        return PlayRound();
    }
    else 
    {
        //check if both players made same selection for a tie
        //if not compare player selection to computer selection
        //determine who wins/loses the round
        if(player_selection === computer_selection.toLowerCase())
        {
            RoundTie();
        }
        else if(player_selection === "rock")
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
        else if(player_selection === "paper")
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
        else if(player_selection === "scissors")
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
    player_points++;
    console.log("Round Won!");
    console.log("Player: " + player_points);
    console.log("Computer: " + computer_points);
    NextRound();
}
function RoundLoss()
{
    computer_points++;
    console.log("Round lost!");
    console.log("Computer: " + computer_points);
    console.log("Player: " + player_points);
    NextRound();
}
function RoundTie()
{
    console.log("Round is a tie!");
    NextRound();
}
//function for Round Progression
function NextRound()
{
    
    //check if either player has won the game
    if(player_points == 5 || computer_points == 5)
    {
        //once determind progess to game win/loss events

        if(player_points == 5)
        {
            GameWon();
        }
        else(computer_points == 5)
        {
            GameOver();
        }
    } 
    //reset selections and progress to next round
    else 
    {
    player_selection = null;
    computer_selection = null;        
    current_round++;
    console.log("Round: " + current_round);
    PlayerTurn();
    }
}

//function for game won
function GameWon() 
{
    games_played++;
    player_performance++;
    alert("Congrats, you won!");
    PlayAgain();
}
//function for game over
function GameOver()
{
    games_played++;
    player_performance--;
    alert("You lost!");
    PlayAgain();
}
//function for play again
function PlayAgain()
{
    //confirm with the player if they'd like to play again
    //if not thank them for playing
    let input = confirm("Press 'OK' to play again!");
    
    player_points = 0;
    computer_points = 0;
    current_round = 0;
    
    if(input)
    {
        console.log("Games played: " + games_played);
        SetDifficulty();
        PlayerTurn();
    }
    else
    {
        EndGame();
    }
}
//function for end game
function EndGame() 
{
    let input = confirm("Are you sure you want to quit playing? Press 'OK' to Quit")
    
    if(input)
    {
        player_points = 0;
        computer_points = 0;
        current_round = 0;
        player_selection = null;
        computer_selection = null;
        alert("Thank you for playing!")
        StartGame();
    }
    else
    {
        return PlayerTurn();
    }
}

//function for setting difficulty
function SetDifficulty()
{
    performance_modifier = 0.02;

    if(player_performance >= 2)
    {
        current_difficulty = difficultyHard;
        performance_modifier = performance_modifier * player_performance;
        console.log("set hard")
    }
    else if(player_performance <= -2)
    {
        current_difficulty = difficultyEasy;
        console.log("set easy")
    }
    else    
    {
        current_difficulty = difficultyNormal;
        console.log("set normal")
    }
    console.log("current performance: " + player_performance);
    console.log("performance modifier: " + performance_modifier);
}

StartGame()
