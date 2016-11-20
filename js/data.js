/****** VARIABLES *******/
var storage = localStorage; 
var cardsURL = '';
var deckURL = '';
var newDeck = false;
var nowDate = new Date().getDate(); 
var nowMonth = new Date().getMonth(); 

// set deck ID from local storage: if exit and with the apis two week period then use deck ID 
var myDeckID = storage.deckID; 
if (myDeckID && (nowDate - storage.deckDate) < 14 && (nowMonth - storage.deckMonth) < 2) {
    deckURL = 'https://deckofcardsapi.com/api/deck/' + myDeckID + '/shuffle/'; 

} else { //else get a new deck ID 
    deckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/'; 
    newDeck = true;
}

var deck = {
    "remaining" : 0,
    "shuffled" : false,
    "id" : "",
    "cards" : []
};  

var $gallery = $('#gallery');


/****** DECK FUNCTIONS *******/

function createDeck(data) {
    if(data.success === true){
        deck.remaining = data.remaining; 
        deck.shuffled = data.shuffled; 
        deck.id = data.deck_id; 
        
        //set deckDate if this is a new deck
        if(newDeck) {
            storage.deckDate = new Date().getDate();
            storage.deckMonth = new Date().getMonth(); 
        }
        
        //set cardsURL for ajax call
        cardsURL = 'https://deckofcardsapi.com/api/deck/' + data.deck_id + '/draw/?count=52';
        
        //get all cards from deck 
        $.getJSON(cardsURL, getCards); 
        
    } else {
        $gallery.html('<p>Unable to get deck</p>');
    }
}

function getCards(data) {
    cardsHTML = ' ';
    if(data.success === true) {
        $.each(data.cards, function(i, card){
            //add card to deck
            deck.cards.push(card);
            
            //build li elements for cards
            cardsHTML += '<li id=" ' + card.code + ' " class="gallery-item">'; 
            cardsHTML += '<a href=" ' + card.image + ' ">';
            cardsHTML += '<img alt=" ' + card.value + ' OF ' + card.suit + ' " '; 
            cardsHTML += 'src=" ' + card.image + ' " ';
            cardsHTML += 'data-suit=" ' + card.suit + ' " ';
            cardsHTML += 'data-value=" ' + card.value + ' " ';
            cardsHTML += '>';
            cardsHTML += '</a>';
            cardsHTML += '</li>'
        });
        $gallery.html(cardsHTML);
        
        // bind click event for #gallery links 
        if ($('.gallery-item').length > 0) {
            $('.gallery-item').click(function(e) {
            e.preventDefault();
            $(this).addClass('lightbox');
            openLightbox( $('.lightbox')); 

            });
        }
        
        storage.deckID = deck.id; 
    }
}


//request a deck 
$.getJSON(deckURL, createDeck); 