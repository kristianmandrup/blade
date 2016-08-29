Sketch Webcomponents
==============

This plugin is based on [blade 0.0.1](https://github.com/sskyy/blade) plugin by Zhenyu Hou @sskyy

## Web Components export

The goal of this plugin is to export a page with Webcomponents instead of raw HTML.
Web Components are much nicer to work with as they encapsulate all styling and HTML for each component.
They also allow sharing and reuse of components and much more... 
The future of the web!

## Blade

Blade is a Sketch 3 plugin for automatically generating HTML from a Sketch project. It will generate `<div>` for group, `<p>` for text , etc.

##Notice##
 - This version is more stable now, but may still have problem with mega size sketch file.
 - Please group all you layer in one group and place it at coordinate (0,0) as the demo shows. - It does not work with artboard for now.


##Quick start##
 - Clone or download the repo.
 - Place everything in `dist` folder into your sketch plugin folder.[Where are sketch plugins?](http://bohemiancoding.com/sketch/support/developer/01-introduction/01.html)
 - Group all your layer in one group and run blade.
 - Blade will generate a new folder just in the same folder in which you put your sketch file.

##Amazing features##

I uploaded a demo sketch file and the generated HTML files which shows some magic. Have a quick look here:

<img width= "100%" src = "https://raw.githubusercontent.com/sskyy/blade/master/demo/1.png"/>

You may notice the special layer names such as `[btn]` or `input[text]`. `[***]` is what I called `directive`, similar to Angular directives. The directive will tell blade what kind of dom element should be generated for a given layer. Also some directives may generate scripts to make element interactive.


###2. The Generated HTML:

<img  width= "100%" src = "https://raw.githubusercontent.com/sskyy/blade/master/demo/2.png"/>

As it shows, blade generate a input element for the layer which name is `input[text]` and a button for `[btn]`.

###3. What does `[case]` do?:

<img  width= "100%" src = "https://raw.githubusercontent.com/sskyy/blade/master/demo/3.png"/>

Press `shift` key down on the web page, then you will see the green border and two tabs, each one was generated for the layer which has directive `[case]`. Click the tab(don't release the `shift` before click) then you can change which should show as below:

<img  width= "100%" src = "https://raw.githubusercontent.com/sskyy/blade/master/demo/4.png"/>

##What's next?##

build-in directives:

 - [x] case
 - [x] btn
 - [x] center
 - [x] width
 - [x] height
 - [x] ignore
 - [x] a
 - [ ] checkbox
 - [ ] hover
 - [ ] alert
 - [ ] password
 - [ ] select
 - [ ] textarea
 - [ ] closeable

I will continue write magic tags for blade, and trying to integrate AngularJS to help build better prototype。

##How to contribute?##

- Install nodejs and [gulp](http://gulpjs.com/).
- Enter into the repo folder and run `gulp`, then gulp will watch all the files in `src` and automatically build it into `dist` folder.
- please feel free to contact me at any time if you have problem.

## Development

- Clone or download the repo.
 - Place everything in `dist` folder into your sketch plugin folder.[Where are sketch plugins?](http://bohemiancoding.com/sketch/support/developer/01-introduction/01.html)
 - Group all your layer in one group and run blade.
 - Blade will generate a new folder just in the same folder in which you put your sketch file.

 - run `gulp` which will build and watch `/src` files for changes
 - Make code changes

### How it works

See the `blade.sketchplugin` file:

First we create a `Config` object which:

- defines `css`, `js` and `images` folders
- calculates the `document_name` for the saved sketch file to use.

```js
    var document_path = [[doc fileURL] path].replace( /\/[^\/]+\.sketch$/,'\/'),
        document_name = [doc displayName].replace(".sketch",""),
        target_folder = document_path + document_name,
        home_folder = "/Users/" + NSUserName(),
        images_folder = target_folder + "/images",
        css_folder = target_folder + "/css",
        js_folder = target_folder + "/js",
        plugin_folder = sketch.scriptPath.replace(/\/blade.sketchplugin$/,'')

    return {
        document_path : document_path,
        document_name : document_name,
        target_folder : target_folder,
        images_folder : images_folder,
        home_folder : home_folder,
        js_folder : js_folder,
        css_folder : css_folder,
        plugin_folder : plugin_folder,
        global_scripts : [
/*          {
            comment : 'minified',
            origin : plugin_folder + '/blade/lib/minified.js',
            src : js_folder + '/minified.js'
          },*/
          {
            comment : 'app',
            origin : plugin_folder + '/blade/lib/app.js',
            src : js_folder + '/app.js'
          }
        ],
        global_styles : [
          {
            comment : 'global reset',
            origin : plugin_folder + '/blade/lib/reset.css',
            href : css_folder + '/reset.css'
          },
          {
            comment : 'fonts',
            origin : plugin_folder + '/fonts/stylesheet.css',
            href : '/fonts/stylesheet.css'
          }          
        ],
        export_img_ext : ".png",
        show_error : true

    }
```

### Notes

Other export plugins operate directly from the in-memory context. We should look at these plugins and do this instead!

We also need to use new Plugin format, using a `manifest.json` and simpler cocoascript, possibly using ES6 classes using Babel or TypeScript.

We should not export to Angular 1.x or Vue.js. Instead we should export seperate Webcomponents, encapsulated in `<template>` 
tags per the W3C specs. This would work directly with Aurelia and other web frameworks Webcomponent based frameworks 
(such as Polymer?). Angular 2 are going their own way with custom template syntax but conceptually we could export to their specific format as well down the road...

## Setup

A `logWindow` is setup:


```js
    my.logWindow = function() {
        var window = my.persistentPanel("Console", "LogWindow", function(window) {
``` 

```js
// log something to our console window
// we set the window up first if necessary, then
// append the log message to the bottom of it and scroll the new line into view
my.log = function(message) {
  ...
  if (console == null)
      console = "";

  var now = new Date();
  var time = now.toLocaleTimeString().split(" ")[0];
  console = console + time + " " + text + "\n";
  [view setString:console];
  log(text);    
  [view scrollRangeToVisible: NSMakeRange(view.string.length, 0)];
}

```

Note: On my Sketch 39.1 the `log` window displays the log text only in a single character column.

`Util.log` can be used to log/debug things...

### main execution

`function main() {` in `blade.sketchplugin` start it off, calling `Util.execute(function() { ... })`

We first get the list of `layers` of the `currentPage`

```js
    var layers = [[doc currentPage] layers],
        processResult
```

This function then processes each layer to generate a `processResult` by making appropriate bindings 
via `Binding.apply_bindings`. This is a very primitive way, requiring that we have one top level layer, which
is why the plugin states you must group all your layers into one. It should instead use a `map` or `reduce` 
`Array` function and then join the results. 

```js
  Util.each( layers, function( subLayer ){
      processResult = Binding.apply_bindings( subLayer );
  })
```

Applying bindings:

```
    /**
     * Call all bindings in this layer to do their job.
     *
     * @param {sketch layer} layer
     * @param {object} parentOutputRef - This is a reference to hold process result.
     * @param {object} [bindings] - If bindings was specified, then we will not get from layer name.
     *
     * @return {object|undefined} parentOutputRef - notice that we will always return parentOutputRef.
     */
    function apply_bindings( layer, parentOutputRef, bindings ){
      ...
        if( !parentOutputRef ){
            parentOutputRef = {
                dom : Dom.create('body'),
                scripts : [],
                styles : [],
                exportFiles : []
            }

        }

        var outputRef = {
                dom : Dom.create(),
                scripts : [],
                styles : [],
                exportFiles : []
            },

        // Dom generator may attach scripts for special dom,
        // so we need to pass the output reference as parameter
        generate_dom_by_kind( layer, outputRef )                                
```

We define a parent outputRef with a `body` element if not yet defined, then create an empty `outputRef` with:
- `scripts` list
- `styles` list
- `exportFiles` list 

We really should export styles but rather generate CSS classes!

Then we call `generate_dom_by_kind` to fill in the `outputRef` accordingly!

Now we prepend the parent DOM (body) if it's the first layer, otherwise we append to current parent.

```js
//we must append the dom here so compose function can access parent node.
//notice you can only use dom functions to modify dom, or you will loss reference.

// ae adds exception here to prepend for first layer so order is actual doc order
if (layer.parentGroup().name() && layer.parentGroup().name().match(/wrapper|section|stacking/)  ) {
    parentOutputRef.dom.prepend( outputRef.dom )
} else {
    parentOutputRef.dom.append( outputRef.dom )            
}
```

Then we get the bindings for the layer which we now process for special cases, such as:

```    
bindings = bindings || get_bindings(layer.name())
...
```

scripts...

```
if( bindingImp[bindingName]['scripts'] ){
    Util.log("find script for "+bindingName)
    outputRef.scripts = outputRef.scripts.concat( bindingImp[bindingName]['scripts'] )
}
```

and styles... (Ugh!) We should instead create a class per layer name or similar and detect styles that are reused across
multiple layers. Also use shared thigns, such as Symbols and Text styles etc correctly.

```
//load styles
if( bindingImp[bindingName]['styles'] ){
    outputRef.styles = outputRef.styles.concat( bindingImp[bindingName]['styles'] )
}
```

Finally we build up the global `index.css`

```js
// ae -- export inline styles from dom.styles into index.css
if (outputRef && outputRef.dom ) {
  if( outputRef.dom.attr('id') ){
      var id = outputRef.dom.attr('id')
  }else{
      var id = Binding.generate_id()
      outputRef.dom.attr('id', id)
  }

  var style = {
      comment : '',
      style : {}
  }
  style.style['#'+id] = {}

  if (outputRef.styles) outputRef.styles.push( style );
  
  if (outputRef.dom.style) Util.extend(style.style['#'+id] , outputRef.dom.style)
    outputRef.dom.style = {};                  
}
```

`generate_dom_by_kind` first determines the `kind` from the layer, and then the generator name from that kind by 
lookup in registry of generators.

```js
// registry of generators
var domGenerators = {}

// register handler (dom generator)
function register_dom_generator(name, handler){
    domGenerators[name] = (typeof handler =='object') ? handler : {dom:handler,css:noop}
}
```
generate dom and css:

```js
function generate_dom_by_kind( layer, outputRef ){
    
    var kind = get_kind( layer),
        generatorName = domGenerators[kind]? kind : 'default'

    Util.log("generate dom for " + kind)

    domGenerators[generatorName].dom( layer, outputRef )
    domGenerators[generatorName].css( outputRef.dom, layer)

    //outputRef.dom.data('sketch-kind', kind )
    //outputRef.dom.data('title', layer.name())
}
```

Kind of layer:

```js
function get_kind( layer) {
    var _class = layer.className(),
        _kind = "Other",
        _path;
    if ( _class == "MSTextLayer" ) { // text layer
        _kind = "Text";
    } else if ( _class == "MSArtboardGroup") { // text layer
        _kind = "Artboard"
    } else if ( _class == "MSSliceLayer") { // text layer
        _kind = "Slice";
    } else if (_class == "MSBitmapLayer" ) { // text layer
        _kind = "Bitmap";
    } else if (_class == "MSShapeGroup" ) { // group layer or shape layer
        if( layer.children().count() == 2 ){
            var _lay = layer.children()[0],
                _class1 = _lay.className().toString(),
                _isSpecificShape1 = /^MS\w*Shape$/.test(_class1)


            if (_class1 == "MSShapePathLayer") { // shape path
                _path = _lay.path(); // get the path on the layer
                if (_path.isLine()) { // check with the path method
                    _kind = "Line";
                }else{
                    _kind = "Vector"
                }
            } else if (_isSpecificShape1) {
                _kind = _class1.replace("MS", "").replace("Shape", "");
            }
        }else{
            _kind = "ShapeGroup"
        }

    }else if( _class== "MSLayerGroup" ){
        _kind  = "LayerGroup"
    }

    return _kind;
}
```     

The kinds of layers which have registered generators:

- `Other`
- `Text`
- `Artboard`
- `Slice`
- `Bitmap`
- `Line`
- `Vector`
- `ShapeGroup`
- `LayerGroup`

Generator for each kind can be found in `dom_generators.js`

```js
Binding.register_dom_generator('Text',{
    dom :function(layer, outputRef){
        ...
    },
    css :function(dom, layer){
        ...
    }
})        
```

### Output

Note: Just before `output` we can debug the html to output via `Util.log( processResult.dom.outerHTML )`

The output function takes a single processResult and determines how to save it as folders and files. 

```js
function output( processResult ){

    //1. Create folders
    if( Util.folder_exist( Config.target_folder) ){
        Util.remove_folder( Config.target_folder)
    }
    // use Config object to determine which empty folders to create
    Util.create_folders(
        [NSArray arrayWithObjects:
            Config.target_folder,Config.images_folder,Config.js_folder,Config.css_folder,nil])


    //2. Save inline script as single file
    ...
    var scriptSrc = Config.target_folder + "/index.js"
    ...

    //3. Save css as single file
    ...
    var styleSrc = Config.target_folder + "/index.css"
    ...

    // //4. Export images


    // preprend DOM with metadata and other global stuff
    // add Google fonts    
    processResult.dom.prepend(
        Dom.create('link').attr('href','https://fonts.googleapis.com/css?family=PT+Serif').attr('type','text/css').attr('rel','stylesheet'))

    // viewport 1.0 scale
    processResult.dom.prepend(
      //initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,
      Dom.create('meta').attr('name','viewport').attr('content','width=device-width, initial-scale=1,  maximum-scale=1')
    );


    //5. Save html
    Util.save_file_from_string(Config.target_folder + "/index.html",  html);
```

