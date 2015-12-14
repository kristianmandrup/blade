
var MINI = require('minified'); 
var $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;

siteWidth = 1200;
siteHeight = 3964;
mobileBreakpoint = 480;

proportion = 1; 
maxProportion = 1;

reFrame = function() {
  
  var browserWidth = document.documentElement.clientWidth;

  $('[data-mobile-scale]').each(function(item, index) {
    var scale =  $(item).get('@data-mobile-scale');
    var newWidth = $(item).get('$width').replace(/[a-z]+/,'');
    if (newWidth > browserWidth) newWidth = browserWidth;
    var compensateLeft = ( (browserWidth - newWidth) / 2 )+ 4;
    
    if (isMobile.phone)  $(item).set({'$left': compensateLeft, '$max-width': newWidth, '$transform': 'scale(' + scale + ')'});
    else $(item).set({'$transform': '', '$max-width': $(item).get('@data-width')});        
  });
  
  $('[data-mobile-collapse], [data-mobile-collapse] > *').each(function(item, index) {
    if (isMobile.phone)  { 
      //var newWidth = $(item).get('$width').replace(/[a-z]+/,'');
      newWidth = browserWidth;
      
      if ($(item).get('$left')) $(item).set('@data-left',$(item).get('$left'))
      $(item).set({'$left': ((browserWidth - newWidth) / 2), '$maxWidth': newWidth});            
    }
    else if ( $(item).get('$maxWidth') ) {
      if ($(item).get('@data-left')) $(item).set({'$left': $(item).get('@data-left')});
      $(item).set({'$maxWidth': null});          
    }

  });
  

  
  $('[data-mobile-float]').each(function(item, index) {
    var flt = $(item).get('@data-mobile-float');    
    if (isMobile.phone) { $(item).set('+' + flt); }
    else $(item).set('-' + flt);
  });
  
  
  $('.mobile-hide').each(function(item, index) {
    if (isMobile.phone) { $(item).set('+' + 'hide'); }
    else $(item).set('-hide');
  });
  
  $('.mobile-only').each(function(item, index) {
    if (isMobile.phone) { $(item).set('-hide'); }
    else $(item).set('+hide');
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

// Minified version of isMobile included in the HTML since it's small
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/BB10/i,k=/Opera Mini/i,l=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,m=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),n=function(a,b){return a.test(b)},o=function(a){var o=a||navigator.userAgent,p=o.split("[FBAN");return"undefined"!=typeof p[1]&&(o=p[0]),this.apple={phone:n(b,o),ipod:n(c,o),tablet:!n(b,o)&&n(d,o),device:n(b,o)||n(c,o)||n(d,o)},this.android={phone:n(e,o),tablet:!n(e,o)&&n(f,o),device:n(e,o)||n(f,o)},this.windows={phone:n(g,o),tablet:n(h,o),device:n(g,o)||n(h,o)},this.other={blackberry:n(i,o),blackberry10:n(j,o),opera:n(k,o),firefox:n(l,o),device:n(i,o)||n(j,o)||n(k,o)||n(l,o)},this.seven_inch=n(m,o),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},p=function(){var a=new o;return a.Class=o,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=o:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=p():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=p()):a.isMobile=p()}(this);
