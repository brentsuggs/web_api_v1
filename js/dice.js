var $diceContainer = $('#diceContainer');
var $rollBtn = $('<button id="rollBtn">Roll the Dice!</button>'); 
var numOfCards = 2; 
var diceURL = 'http://www.setgetgo.com/rollthedice/get.php?sides=6'

//append roll button to dice container 
$diceContainer.append($rollBtn); 

//bind click event for roll button 
$rollBtn.click(rollDice);

function getDie(num) { 
    var $dieHTML = ''; 
    switch (num) {
        case 1:
            $dieHTML = '<div class="die one">  <span class="dot"></span></div>';
            break;
        case 2:
            $dieHTML = '<div class="die two">  <span class="dot"></span></div>';
            break;   
        case 3:
            $dieHTML = '<div class="die three">  <span class="dot"></span></div>';
            break;            
         case 4:
            $dieHTML = '<div class="die four">  <span class="dot"></span></div>';
            break;     
         case 5:
            $dieHTML = '<div class="die five">  <span class="dot"></span></div>';
            break;
         case 6:
            $dieHTML = '<div class="die six">  <span class="dot"></span></div>';
            break;  
    }
    if ($diceContainer.children('.die').length >= 2) {
        $diceContainer.children('.die').remove(); 
    }
    $diceContainer.append($dieHTML);
}

function rollDice() {
    for (var i=0; i<2; i++) {
        $.getJSON(diceURL, getDie); 
    }    
}

