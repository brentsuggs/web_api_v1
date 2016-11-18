/****** VARIABLES *******/

var deckURL = 'https://deckofcardsapi.com/api/deck/w11qmjea1ktq/shuffle/'; 
var cardsURL = '';
var deck = { };  
var cards = [];
var $gallery = $('#gallery');


/****** DECK FUNCTIONS *******/

function createDeck(data) {
    if(data.success === true){
        deck.remaining = data.remaining; 
        deck.shuffled = data.shuffled; 
        deck.id = data.deck_id; 
    } else {
        
    }
}


function getCards(data) {
    if(data.success === true) {
        $.each(data.cards, function(i, card){
            cardsHTML = '<li id=" ' + card.code + ' " class="gallery-item">'; 
            cardsHTMl += '<a href=" ' + card.image  + ' ">'
            cardsHTML += '<img title'
        });
    }
}




//request a deck 
$.getJSON(deckURL, createDeck); 

$.getJSON(cardsURL, getCards); 