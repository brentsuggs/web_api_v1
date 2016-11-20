"use strict";

//CREATE VARIABLES 
var $search = $('#search'); 
var $overlay = $('<div id="overlay"></div>'); 
var $img = $('<img>'); 
var $info = $('<div id="info"></div>'); 
var $lightboxContainer = $('<div id="lightboxContainer"></div>');
var $close = $('<span id="navClose">Back</span>');
var $leftArrow = $('<span id="navLeft" class="icon-reply"></span>');
var $rightArrow = $('<span id="navRight" class="icon-forward"></span>');

var $removed = []; 

//append close to overlay 
$lightboxContainer.append($close);

//append img to the overlay
$lightboxContainer.append($img);  

//append info to the overlay
$lightboxContainer.append($info); 

//append info to the overlay
$lightboxContainer.append($leftArrow, $rightArrow); 

//append nav container to overlay 
$overlay.append($lightboxContainer);

//append overlay to body
$('body').append($overlay); 

// Open Lightbox with selected image
function openLightbox(item) {
    var href = item.children('a').attr('href');
    var infoHTML = '<h2>' + item.children('a').children('img').attr('alt') + '</h2>'; //title
    infoHTML += '<ul>'; 
    infoHTML += '<li> Card Value:  ' + item.children('a').children('img').attr('data-value') + '</li>';  
    infoHTML += '<li> Card Suit:   ' + item.children('a').children('img').attr('data-suit') + '</li>'; 
    infoHTML += '<li> Card Code:   ' + item.attr('id') + '</li>'; 
    infoHTML += '</ul>'; 
    $img.attr('src', href); 
    $info.html(infoHTML); 
    $overlay.show('slow'); 
    $('body').css('overflow', 'hidden');
}

function closeLightbox() {
    $('.lightbox').removeClass('lightbox');
    $overlay.hide('slow'); 
    $('body').css('overflow', 'auto');
}


// Get click event for #overlay
$close.click(closeLightbox);

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

//keyboard navigation
$rightArrow.click(function(e) {
    scrollRight();
});

$leftArrow.click(function(e) {
    scrollLeft();
});

    
function keyScroll(e) {
    if(e.which == 39) {
        scrollRight(); 
    }
    if(e.which == 37) {
        scrollLeft();
    }
}

$overlay.keyup(function(e) {
    keyScroll(e); 
});

// Gallery Filtration 

function filterImgs(item, search) {
    var imgTitle = item.find('img').attr('alt').toLowerCase(); 
    return imgTitle.indexOf(search); 
}

$search.keyup(function() {
    var searchValue = $search.val().toLowerCase();
    var result; 
    $('.gallery-item').each(function () {
        result =  filterImgs($(this), searchValue); 
        if(result === -1) {
            $removed.push($(this)); 
            $(this).hide(700, function () {$(this).detach();}); 
        }
    });
    
    for (var i = 0; i < $removed.length; i++) {
        result = filterImgs($removed[i], searchValue);
        if(result !== -1) {
            $gallery.append($removed[i]); 
            $removed[i].show(700);
            $removed.splice(i, 1);
            i--; 
        }
    }
    
}); 


 


