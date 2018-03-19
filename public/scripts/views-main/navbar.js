const windowHeight = ($('.navbar').offset().top);

$(window).bind('scroll', function(){
    if ($(window).scrollTop() > windowHeight){
        $(".navbar").addClass('nav-fixed');
        $("#nav-ph").addClass("nav-ph");
    } else {
        $(".navbar").removeClass('nav-fixed');
        $("#nav-ph").removeClass("nav-ph");
    }
})

$(".scroll-btn").click(function() {
    $('html, body').animate({
        scrollTop: $(".navbar").offset().top
    }, 1700);
});