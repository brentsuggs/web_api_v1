"use strict";

//CREATE VARIABLES 
var $overlay = $('<div id="overlay"></div>'); 
var $img = $('<img>'); 
var $caption = $('<p></p>'); 
var $lightboxContainer = $('<div id="lightboxContainer"></div>');
var $close = $('<span id="navClose" class="icon-close"></span>');
//var $leftArrow = $('<span id="navLeft" class="icon-reply"></span>');
//var $rightArrow = $('<span id="navRight" class="icon-forward"></span>');

var $removed = []; 

//append img to the overlay
$lightboxContainer.append($img);  

//append caption to the overlay
$lightboxContainer.append($caption); 

//append close to overlay 
$lightboxContainer.append($close); 

//append nav container to overlay 
$overlay.append($lightboxContainer);

//append overlay to body
$('body').append($overlay); 

// Open Lightbox with selected image
function openLightbox(item) {
    var href = item.children('a').attr('href');
    var cap = item.children('a').children('img').attr('alt'); 
    $img.attr('src', href); 
    $caption.text(cap); 
    $overlay.show('slow'); 
}

// Get click event for #gallery links  
$('.gallery-item').click(function(e) {
    e.preventDefault();
    $(this).addClass('lightbox');
    openLightbox( $('.lightbox')); 

});

// Get click event for #overlay
$close.click(function() {
    $('.lightbox').removeClass('lightbox');
    $overlay.hide('slow'); 
});

//Navigation of Lightbox 


function scrollRight() {
    var $lightbox = $('.lightbox');
    if($lightbox.is(':last-child')){
        $lightbox.removeClass('lightbox'); 
        $('.gallery-item').first().addClass('lightbox'); 
    } else {
        $lightbox.removeClass('lightbox').next().addClass('lightbox');
    }
    openLightbox($('.lightbox')); 
}

function scrollLeft() {
    var $lightbox = $('.lightbox');
    if($lightbox.is(':first-child')){
        $lightbox.removeClass('lightbox'); 
        $('.gallery-item').last().addClass('lightbox'); 
    } else{
        $lightbox.removeClass('lightbox').prev().addClass('lightbox');
    }
    openLightbox($('.lightbox')); 
}


//$rightArrow.click(function(e) {
//    scrollRight();
//});
//
//$leftArrow.click(function(e) {
//    scrollLeft();
//});
//
////keyboard navigation
//
//function keyScroll(e) {
//    if(e.which == 39) {
//        scrollRight(); 
//    }
//    if(e.which == 37) {
//        scrollLeft();
//    }
//}
//
//$overlay.keyup(function(e) {
//    keyScroll(e); 
//});

 


