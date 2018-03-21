const reel1 = [
    'img/newzealand/image-reel/1.jpg',
    'img/newzealand/image-reel/2.jpg',
    'img/newzealand/image-reel/3.jpg',
    'img/newzealand/image-reel/4.jpg',
    'img/newzealand/image-reel/5.jpg',
    'img/newzealand/image-reel/6.jpg',
    'img/newzealand/image-reel/7.JPG',
    'img/newzealand/image-reel/8.JPG',
    'img/newzealand/image-reel/9.JPG',
    'img/newzealand/image-reel/10.JPG',
    'img/newzealand/image-reel/11.JPG',
    'img/newzealand/image-reel/12.JPG',
    'img/newzealand/image-reel/13.JPG'
]

reel1.forEach(function(src){
    $('<img class="thumbnail" src='+src+'></img>').appendTo("#reel1 .image-reel")
});


// Check the left Xpos of the first reel. All other reels should have the same Xpos.
var posLeft = $('#reel1').position().left;
var image_width = 160;

// Disable the buttons if the reel has reached its limit
function checkPosition(par) {
    // Controll the slide left button
    if(posLeft >= $('#reel1').position().left){
        $(par).children('.scroll-left').attr("disabled", "disabled");
    } else {
        $(par).children('.scroll-left').removeAttr("disabled");
    }

     // Controll the slide right button
     var reel_length = $(par).children('.image-reel').children().length * 160;
    
     if(posLeft + reel_length <= $('#reel1').position().left + $('#reel1').width()) {
        $(par).children('.scroll-right').attr("disabled", "disabled");
    } else {
        $(par).children('.scroll-right').removeAttr("disabled");
    }
};

// Reel button logic
$(".scroll-left").click(function(event){    
    $(this).siblings('.image-reel').animate({'marginLeft' : "+=160px"}, 100);
    posLeft += image_width;
    checkPosition($(this).parent());
})

$(".scroll-right").click(function(event){
    $(this).siblings('.image-reel').animate({'marginLeft' : "-=160px"}, 100);
    posLeft -= image_width;
    console.log(posLeft)
    checkPosition($(this).parent());
})