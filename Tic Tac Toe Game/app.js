
// Accessing all the boxes by class name because there are multiple boxes:
let boxes = document.querySelectorAll(".box");

//Accessing the reset button:
let resetBtn = document.querySelector("#reset-button");

let newGameBtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX or playerO , whose turn will it be? This line is to track that.


//Storing all the winning patterns in an array 
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


//We need to make reset game function, so the moment thats done everything goes to default:
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide"); //So the message container that was displayed after we got the winner is hidden again
};

//Now, to play the game we want the box to have O or X in it alternatively whenever we click on it
//Below we make the function for that through event listener
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //basically, if turnO is true, then when you click on box, O will appear there
      box.innerText = "O";
      turnO = false;
    } else {
      //If above condition of if turnO is false, then X will appaer when you click on the box
      box.innerText = "X";
      turnO = true;
    }
    //Now when you click on the same box twice, values might overalp. like X first, then same box changes to O if you click on it again. 
    //You dont want that. So disable the box the moment you click it once so the value doesnt changes until you reset the game that is.
    box.disabled = true; 
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

//If the game is drawn, we need a function to deal with that:
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


//The moment we do ShowWinner we want ALL boxes to be disable right away so we dont get another winner before game is reset
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


//When new game starts, we want a function to enable boxes:
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; //Removing all the O and X of the boxes
  }
};


//Showing the winner and displaying congrats message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide"); //So 'hide' class is removed and message container is displayed
  disableBoxes(); //So the game stops working after you get the winner
};


//We need to check who is the winner. Below function is for that
//To see who is the winner, we need to check all winning patterns after every turn
//We do that through index method using the arrays we made
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;


    //Checking if all the 3 values we are giving point for in a line are same values. And there is no empty box in any of those 3 values
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val)  {  //Making sure all the 3 values are same
        showWinner(pos1Val); //Printing the winner
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);