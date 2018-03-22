// Get a reference to the <path>
var path = document.querySelector('.route');

// Get length of path... ~577px in this demo
var pathLength = path.getTotalLength();

// Make very long dashes (the length of the path itself)
path.style.strokeDasharray = pathLength + ' ' + pathLength;

// Offset the dashes so the it appears hidden entirely
path.style.strokeDashoffset = pathLength;

// When the page scrolls past the paralax image...
window.addEventListener("scroll", function(e) {
  if(document.documentElement.scrollTop > document.documentElement.clientHeight){        
    // What % down is it? 
    var fullBody = document.documentElement.scrollHeight;
    var clientWindow = document.documentElement.clientHeight;
    var scrollHeight = document.documentElement.scrollTop + document.body.scrollTop
    // var pageHeight = 
    var scrollPercentage = (scrollHeight - clientWindow) / (fullBody - clientWindow - clientWindow);
    console.log(scrollPercentage);
    // Length to offset the dashes
    var drawLength = pathLength * scrollPercentage;    
    // Draw in reverse
    path.style.strokeDashoffset = pathLength - drawLength;
  }  
});