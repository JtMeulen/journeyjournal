// Define Global variables
const PINK = "#ff798d";
const GREY = "#b9a7a7";
const LGREY = "#d3c8c8";
const blogArr = ["LK", "NZ", "TH", "MY", "US", "ZA", "CN", "JP", "KR", "GB", "RO"];

// open the modal
function showModal(countryCode){
    $("#outer-modal").show();
    $(".modal-active").removeClass("modal-active animate"); 
    $('#' + countryCode).addClass("modal-active animate");
};

// Close the modal when clicking outside of the modal
$("#outer-modal").click(function(){
    $(".modal-active").removeClass("modal-active animate");            
    $(this).hide();
});

// toggle the menu
$(".menu-btn").click(function(){
    $(".menu").toggle("slide", function(){
        $("#menu-items").fadeToggle("slow");
    });
});        

// general Jvectormap.com rendering of the world map
$(function(){             
    $('#world-map').vectorMap({
        map: 'world_mill',
        backgroundColor: ['none'],
        // zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: LGREY
            }
        },
        series: {
            regions: [{
                values: {                            
                    // LINKS TO BLOGS
                    GB: PINK, //england
                    RO: PINK, //romania
                    LK: PINK, //sri lanka
                    NZ: PINK, //new zealand
                    TH: PINK, //thailand 
                    CN: PINK, //china
                    MY: PINK, //malaysia
                    KR: PINK, //korea
                    JP: PINK, //japan
                    US: PINK, //usa
                    ZA: PINK, //south africa

                    // BEEN THERE BUT NO LINK
                    BE: GREY, //belgium
                    FR: GREY, //france
                    DE: GREY, //germany
                    ES: GREY, //spain
                    PT: GREY, //portugal
                    NL: GREY, //netherlands
                    SE: GREY, //sweden
                    DK: GREY, //denmark
                    TR: GREY, //turkey
                    LU: GREY, //luxenbourgh
                    FI: GREY, //finland
                    PL: GREY, //poland
                    GR: GREY, //greece                            
                    HK: GREY, //hong kong                            
                    CA: GREY //canada                            
                }
            }]
        },
        onRegionClick: function(event, code){
            if(blogArr.includes(code)){
                showModal(code);
            }                   
        }            
    });
});