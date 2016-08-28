
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


(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;
        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);