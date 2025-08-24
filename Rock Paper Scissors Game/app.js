let userScore = 0;
let compScore = 0;

const choice = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg"); /*This is so we can change the msg*/

// Accessing userscore and comp score to make sure points are counted
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// to generate computer choice
const genCompChoice = () => {
    // We store options first before generating
    const options = ["rock", "paper", "scissors"];
    const randindex = Math.floor(Math.random()*3);
    return options [randindex];
}

// draw game condition
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31" /* if game is draw then no change in color*/
};

// showing winner
const Winner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        console.log("You win!");
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green"; /*color changes to green when we win*/
    } else {
        console.log("You lost! Try Again.");
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats ${userChoice}! Try Again.`;
        msg.style.backgroundColor = "red";
    }
}

// playgame code
const playGame = (userChoice) => {
    console.log ("user choice=", userChoice);
    // Generating computer choice:
    const compChoice = genCompChoice();
    console.log("computer choice =", compChoice);

    if (userChoice === compChoice) {
        // Draw game
        drawGame();
    } else {
        // if user wins
        let userWin = true;
        if (userChoice === "rock") {
            /* below line means if comp choice was paper then userwin is false
            means user would loose since it chose rock. But if not, then user wins
            because only other possible condition is scissor as I already finished draw
            game condition previously*/
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        Winner(userWin, userChoice, compChoice);
    }
}

// Generating user choice:
choice.forEach((choice)=> {
    console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log("choice clicked", userChoice);
        playGame(userChoice);
    });
});
