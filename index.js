/**
 * Created by bcuser on 4/4/19.
 */

// globals:
let G_Balance = 5;
let G_Turn = 0;
let G_BalStatus = document.getElementById("balance");
let G_TurnStatus = document.getElementById("turnCount");



/***********************************************
 * buttonClicked()
 * 
 * Called by: button click event for id = ButtonBet button on page
 *            labeled: "Bet Now"
 * 
 * Description:  This is the main function to handle all operations
 * on the page.  It calls helper functions as needed.  
 * Status is displayed using the id = status element on the page.
 * The full operations are as follows:
 * 
 * 1. calc 2 random numbers between 1 and 6
 * 2. changes dice images on page to match the numbers generated
 * 3. decides if user won or lost: 
 *      Winning is: a) pairs, b)sum = 7, c) sum = 11
 *      Loss is all other results.
 * 4. If user wins, they gain $1. and are told they won.  If a loss
 *       the user loses $1 and are told they lost (via the "status" message on the page)
 *       In both cases increment the turn counter (number of times they hit the button)
 * 5. If the last turn was a loss and the users balance is 0  then tell them
 *     the game is over and hide the button so it can't be pushed again.
 *********************************************************************************************** */

function buttonClicked(){

    let statusString = "";

    // increment turn counter (see also step 4)
    G_Turn += 1;

 
    // two random numbers
    let numOne = myRand(6);
    let numTwo = myRand(6);

    //change dice images
    changeDice(numOne, numTwo);

    //determine Win or Loss
    let userWin = whoWon(numOne, numTwo);

    if(userWin === true){
        // increment balance by 1
        G_Balance += 1;

        // update status:
        statusString += `You Won! `;
    }
    else{
        // user lost:
        // decrement balance:
        G_Balance -= 1;
        
        // update first part of status string:
        statusString += `Oh No!  You Lost! `;

        // check for 0 or less:
        if(G_Balance <= 0){
            // end game
            // add to status string
            statusString += `<br>
            I'm sorry, but the game is over.`;

            //disable and hide button
            let betBtn = document.getElementById("ButtonBet");
            betBtn.disabled = true;
            betBtn.hidden = true;
            
        }// end if balance <= 0

    }// end else lost


    // display status:
    G_BalStatus.innerHTML = G_Balance;
    G_TurnStatus.innerHTML = G_Turn;
    document.getElementById("status").innerHTML = statusString;

  
}// end buttonClicked function



/* ***************************************************
 * myRand(myNum)
 * 
 * discription: returns a random number from 1 to myNum
 * 
 ********************************************************* */
function myRand(myNum){
    
    let randNum = Math.floor(Math.random() * myNum) + 1;

    return randNum;

}// end myRand


/* ***************************************************
 * changeDice( n1, n2)
 * 
 * Parameters: n1 and n2 are the numbers to change the dice
 *             images to.
 * 
 ********************************************************* */
function changeDice(firstNum, secondNum){

    let diceOne = document.getElementById("image1");
    let diceTwo = document.getElementById("image2");

    let source1 = "";
    let source2 = "";

    // make use of image naming convention
    source1 = "./images/dice-" + firstNum + ".jpg";
    source2 = "./images/dice-" + secondNum + ".jpg";

    diceOne.src = source1;
    diceTwo.src = source2;

}// end function changeDice



/* ***************************************************
 * whoWon(numOne, numTwo);
 * 
 * discription: determines if the number combinations
 *              are a winning combo.  Winning combos are
 *              1. any pairs
 *              2. if the sum is 7
 *              3. if the sum is 11
 * 
 * returns true if a win, otherwise false
 ********************************************************* */
function whoWon(diceOne, diceTwo){
    
    let bReturn = false;
    let dSum = diceOne + diceTwo;

    if (diceOne == diceTwo){
        bReturn = true;
    }
    else if((dSum == 7) || (dSum == 11) ){
        bReturn = true;
    }

    return bReturn;

}// end myRand