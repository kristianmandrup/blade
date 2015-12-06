
var MINI = require('minified'); 
var $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;

siteWidth = 1200;
siteHeight = 2163;
proportion = 1; 
maxProportion = 1;

reFrame = function() {
  var browserWidth = document.documentElement.clientWidth;
  
  proportion = (document.documentElement.clientWidth / siteWidth ).toFixed(2);


  if (proportion < 0.5) { proportion = 0.5; } // limit to max proportion
  if (proportion > maxProportion) { proportion = maxProportion; } // limit to max proportion
  
  var newTopPos = ( document.documentElement.clientHeight / 2 ) * (1 - proportion);
  
  var newLeftPos = Math.floor(((siteWidth * proportion) - siteWidth ) / 2);

  $('body').set({'$transform': 'scale(' + proportion + ')'});
  if (proportion < 1 ) {
    $('body').set({'$position': 'relative'}).set({'$margin': '0px ' + newLeftPos + "px"});
    $('body').set({'$top':  '-' + newTopPos + "px"});
    
  } else {
    $('body').set({'$margin': '0', '$top': '0'});
  }
  
  if (proportion == 0.5) {
    $('.mobizoom').set({'$transform': 'scale(' + 1.5 + ')'});  
  }

  
};

$(function() {
  reFrame();
  $('body').set({'$visibility': "visible"});
  setTimeout(function(){ 
    $('#main-hero').set({'$box-shadow': "0 0 25px 25px #333333 inset"});  
  }, 200);
});


$(window).on('resize',function() {
  reFrame();
});
