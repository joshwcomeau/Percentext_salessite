(function ( $ ) {


  $.fn.textPerc = function( options ) {

    // Let's set our default settings
    var settings = $.extend({}, this.defaults, options );

    return this.each(function() {
      $element = $(this);

      // Testing function.
      debug( this );

      // First, we set the text element (whether it's an h2 or a p or a div) to display: inline;.
      // This is done so that we can find out how much width the letters themselves take up.
      $element.css("display", "inline");

      // Next, we shrink the text down to mini-size. 
      // This is done because when we retrieve the header's width, we want to make sure it fits on 1 line.
      var starting_size = 9;
      $element.css("font-size", starting_size);

      // It's variable time! Let's figure out who the major players are.
      var
      container         = $element.parent(),
      container_width   = container.width(),
      text_width        = $element.width(),
      text_width_ratio  = text_width / container_width;

      // Data gathered, we now compute our new font size. 
      // We're subtracting 1 to make sure it always stays below the requested percentage.
      var
      new_font_size     = (starting_size / text_width_ratio) - 1;

      $element.css("font-size", new_font_size);
    });
  }

  // Our debug function. For internal testing purposes only.
  function debug( obj ) {
    console.log( "The object is:" );
    console.log( obj );
    console.log( "-------------" );
    console.log("There are " + obj.length + " item(s) selected with textPerc.")
  }

  $.fn.textPerc.defaults = {
    percentage: 100,
    textAlign: "center"
  }


}( jQuery ));
