(function ( $ ) {
  $.fn.textPerc = function( options ) {

    // Let's set our default settings
    var 
    settings = $.extend({
        percentage: 100,
        textAlign: "center"
    }, options );


    return this.each(function() {
      // Our first job is to shrink the text down to mini-size. 
      // This is done because when we retrieve the header's width, we want to make sure it fits on 1 line.
      var 
      starting_size = 9;
      $(this).css("font-size", starting_size);

      // It's variable time! Let's figure out who the major players are.
      var
      container         = $(this).parent(),
      container_width   = container.width(),
      text_width        = $(this).width(),
      text_width_ratio  = text_width / container_width;

      // Data gathered, we now compute our new font size. 
      // We're subtracting 1 to make sure it always stays below the requested percentage.
      var
      new_font_size     = (starting_size / text_width_ratio) - 1;

      return $(this).css("font-size", new_font_size);
    });
    
  }
}( jQuery ));
