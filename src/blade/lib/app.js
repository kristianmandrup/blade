
var MINI = require('minified'); 
var $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;

siteWidth = 1200;
siteHeight = 2163;
mobileBreakpoint = 680;

proportion = 1; 
maxProportion = 1;

reFrame = function() {
  var browserWidth = document.documentElement.clientWidth;
  

  $('[data-scale]').each(function(item, index) {
    var scale =  $(item).get('@data-scale');

    if (browserWidth < mobileBreakpoint) {
      $(item).set({'$transform': 'scale(' + scale + ')'});      
      var compensateCenter = (browserWidth - $(item).get('$width').replace(/[a-z]+/,'')) / 2;
      if ($(item).get('@data-leftward')) compensateCenter = parseFloat(compensateCenter) * parseFloat($(item).get('@data-leftward'));      
      $(item).set({'$left': compensateCenter});     
       
    } else {
      $(item).set({'$transform': ''});    
      $(item).set({'$left': ''})        
    }
    
  });
  
  proportion = (document.documentElement.clientWidth / siteWidth ).toFixed(2);


  if (proportion < 0.7) { proportion = 0.7; } // limit to max proportion
  if (proportion > maxProportion) { proportion = maxProportion; } // limit to max proportion
  


  if ( $('#wrapper').is('.scaling') ) {
    
    
    /*
    //responsive in scaling mode -- deprecate?
    $('#wrapper.scaling.responsive .centering').each(function(item, index) {
    
      if (proportion <= 0.5) {
        $(item).set('+mobile');               
      
        var storedWidth = $(item).get('@data-width');
        var actualWidth = $(item).get('$width') ;
        var factor = 1;        
        if ( $(item).get('@zoom') ) factor = $(item).get('@zoom');
        if ($(item).is('.stacking') && $(item).get('@data-stacked-height')) $(item).set({'$padding-top': (  $(item).get('@data-height') / $(item).get('@data-stacked-height') * 100) + "%", '$min-height': $(item).get('@data-stacked-height')});    
        
        if ( factor != 1) $(item).set({'$transform': 'scale(' + factor + ')'});
      
      
          if ( !storedWidth && (actualWidth.replace('px','') > (browserWidth / proportion) ) ) {
            $(item).set({'@data-width': actualWidth});    
            $(item).set({'$width': (90 / factor) + "%"});   
                    
          }      
    
      } else {
        $(item).set('-mobile');               
      
        if ($(item).get('@data-width')) {        
          var width =  $(item).get('@data-width');    
          $(item).set({'$width': width});
                    
          $(item).set({'@data-width': '' });                                    
        }
        if ($(item).is('.stacking') && $(item).get('@data-height')) $(item).set({'$padding-top': 0, '$min-height': $(item).get('@data-height')});    
      
        $(item).set({'$transform': ''});    
      
      }
    });
    */
    // end depricate??
    
    var newTopPos = ( document.documentElement.clientHeight / 2 ) * (1 - proportion);
  
    var newLeftPos = Math.floor(((siteWidth * proportion) - siteWidth ) / 2);
    
    
    $('body').set({'$transform': 'scale(' + proportion + ')'});
    if (proportion < 1 ) {
      $('body').set({'$position': 'relative'}).set({'$margin': '0px ' + newLeftPos + "px"});
      $('body').set({'$top':  '-' + newTopPos + "px"});
    
    } else {
      $('body').set({'$margin': '0', '$top': '0'});
    }      
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
