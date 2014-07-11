(function ( $ ) {


  $.fn.percentext = function( options ) {

    // Let's set our default settings
    var settings = $.extend({}, $.fn.percentext.defaults, options );

    return this.each(function() {
      var
      elem = this,
      $elem = $(this),
      starting_size = 9;
      

      do_your_thang( $elem, starting_size, settings );
      
      $(window).resize(function() {
        do_your_thang( $elem, starting_size, settings );
      })


    });
  }

  // FIRST LEVEL - Main function //
  // Performs setup, calculation, application and cleanup.
  function do_your_thang($elem, starting_size, settings) {
    // Preparation is key.
    setup( $elem, starting_size, settings );      

    var final_font_size = calculate_font_size( $elem, starting_size )

    // Apply this final font size, and add the window resize 
    set_font( $elem, final_font_size );

    // Gotta brush your teeth before bed.
    cleanup( $elem );
    
    // Uncomment to spam the console with debug info
    // debug( this );
  }


  // SECOND LEVEL //
  // Primary high-level functions, called by our main function
  function setup( $elem, starting_size, settings ) {
    $elem.css({
      display:    "inline",
      fontSize:   starting_size,
      textAlign:  settings.alignment
    });
  }

  function calculate_font_size($elem, starting_size) {
    var
    container         = $elem.parent(),
    container_width   = container.width(),
    text_width        = $elem.width(),
    text_width_ratio  = text_width / container_width;

    // Part I: Broad Strokes.
    // We do some math to get what ought to be the perfect font size. This will work most times.
    var broad_font_size = first_pass( $elem, starting_size, text_width_ratio );
    set_font($elem, broad_font_size);  

    // Part II: Incremental Increases.
    // There are times where it might choose a font size that is a little too small.
    // We'll increment it until we KNOW we've gone too far, and then reduce it by 1.
    var too_big_font_size = one_too_many( $elem, broad_font_size );

    // We've gone one step too far. Let's undo that last iteration and call it a day!
    var final_font_size = too_big_font_size - 1;

    return final_font_size;

  }

  function set_font($elem, font_size) {
    $elem.css("font-size", font_size);
  }

  // Undoes our un-needed setup stuff.
  function cleanup( $elem ) {
    $elem.css("display", "");
  }

  // Our debug function. For internal testing purposes only.
  function debug( obj ) {
    console.log( "The object is " + $(obj).width() + "px wide. Its parent is " + $(obj).parent().width() + "px wide." );
    console.log( "The object is:" );
    console.log( obj );
    console.log( "-------------" );
    console.log("There are " + obj.length + " item(s) selected with textPerc.")
  }


  // THIRD LEVEL - Assorted helper functions
  function first_pass( $elem, starting_size, text_width_ratio ) {
    return Math.floor(starting_size / text_width_ratio);
  }

  function one_too_many( $elem, broad_font_size ) {
    var 
    starting_height      = $elem.height(),
    increasing_font_size = broad_font_size;

    while ( $elem.height() < starting_height * 2 ) {
      increasing_font_size++;
      set_font($elem, increasing_font_size);
    }

    return increasing_font_size;
  } 

  

  $.fn.percentext.defaults = {
    percentage: 100,
    alignment: "left"
  }


}( jQuery ));
