const reel1 = [
    {src: 'img/newzealand/image-reel/1.jpg', txt: 'Seals on in the harbour'},
    {src: 'img/newzealand/image-reel/2.jpg', txt: 'SEALS CLOSE UP'},
    {src: 'img/newzealand/image-reel/14.JPG',  txt: 'BOOM'}, 
    {src: 'img/newzealand/image-reel/3.jpg', txt: 'ELEPHAUNTS'}, 
    {src: 'img/newzealand/image-reel/4.jpg', txt: 'JIRAF'}, 
    {src: 'img/newzealand/image-reel/5.jpg', txt: 'olifantje'}, 
    {src: 'img/newzealand/image-reel/6.jpg', txt: 'vis?'}, 
    {src: 'img/newzealand/image-reel/7.JPG', txt: 'ponies!'}, 
    {src: 'img/newzealand/image-reel/8.JPG', txt: 'hornhippo'}, 
    {src: 'img/newzealand/image-reel/9.JPG', txt: 'rhino'}, 
    {src: 'img/newzealand/image-reel/10.JPG', txt: 'wij op berg'}, 
    {src: 'img/newzealand/image-reel/11.JPG', txt: 'mordor?'}, 
    {src: 'img/newzealand/image-reel/12.JPG', txt: 'haai!'}, 
    {src: 'img/newzealand/image-reel/13.JPG',  txt: 'strnad'}    
];

reel1.forEach(function(img){
    $('<img data-text='+img.txt+' class="thumbnail" src='+img.src+'></img>').appendTo("#reel1 .image-reel")
});

// Check the left Xpos of the first reel. All other reels should have the same Xpos.
var posLeft = $('#reel1').position().left;
var image_width = 195;

// Disable the buttons if the reel has reached its limit
function checkPosition(par) {
    // Controll the slide left button
    if(posLeft >= $('#reel1').position().left){
        $(par).children('.scroll-left').attr("disabled", "disabled");
    } else {
        $(par).children('.scroll-left').removeAttr("disabled");
    }

     // Controll the slide right button
     var reel_length = $(par).children('.image-reel').children().length * image_width;
    
     if(posLeft + reel_length <= $('#reel1').position().left + $('#reel1').width()) {
        $(par).children('.scroll-right').attr("disabled", "disabled");
    } else {
        $(par).children('.scroll-right').removeAttr("disabled");
    }
};

// Reel button logic
$(".scroll-left").click(function(event){    
    $(this).siblings('.image-reel').animate({'marginLeft' : "+="+image_width+"px"}, 100);
    posLeft += image_width;
    checkPosition($(this).parent());
})

$(".scroll-right").click(function(event){
    $(this).siblings('.image-reel').animate({'marginLeft' : "-="+image_width+"px"}, 100);
    posLeft -= image_width;
    checkPosition($(this).parent());
})


$('.thumbnail').click(function(event){
    event.stopPropagation();

    var src = $(this).attr('src');
    $('#big-image').attr('src', src);

    var text = $(this).attr('data-text');    
    $('#description').html(text);

    $("#modal").show();
});

$("body").click(function(event){    
    if(event.target.id !== "big-image" && event.target.id !== "description") {
        $("#modal").hide();
    }
});
