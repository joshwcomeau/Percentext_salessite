(function ( $ ) {


  $.fn.percentext = function( options ) {

    // Let's set our default settings
    var settings = $.extend({}, $.fn.percentext.defaults, options );

    return this.each(function() {
      var elem = this

      do_your_thang( elem, settings );
      
      $(window).resize(function() {
        do_your_thang( elem, settings );
      })


    });
  }

  // FIRST LEVEL - Main function //
  // Performs setup, calculation, application and cleanup.
  function do_your_thang(elem, settings) {
    var
    $elem = $(elem),
    starting_size = 6;

    // Preparation is key.
    setup( $elem, starting_size, settings );      

    // Get the desired font size (most of the magic happens in this function call).
    var final_font_size = calculate_font_size( $elem, starting_size, settings );

    // Precise Mode (optional)
    // Uses letter-spacing to get as precise a width as possible. Generally not necessary, but can be useful
    // on headers with lots of letters (since the difference between 10px and 11px font size is significant).
    // if ( settings.preciseMode ) {
    //   letter_spacing = get_letter_spacing($elem)
    // }

    // Apply this final font size, and add the window resize.
    set_font( $elem, final_font_size );

    // Gotta brush your teeth before bed.
    cleanup( $elem );
    
    // Uncomment to spam the console with debug info.
    // debug( elem, settings );
  }


  // SECOND LEVEL //
  // Primary high-level functions, called by our main function
  function setup($elem, starting_size, settings) {
    $elem.css({
      display:    "inline",
      visibility: "hidden",
      fontSize:   starting_size,
      textAlign:  settings.alignment,
      whiteSpace: "nowrap"
    });
  }

  function calculate_font_size($elem, starting_size, settings) {
    var
    container         = $elem.parent(),
    container_width   = container.width(),
    text_width        = $elem.width(),
    text_width_ratio  = text_width / container_width,
    desired_ratio     = settings.percentage / 100;

    // Part I: Broad Strokes.
    // We do some math to get what ought to be the perfect font size. This will work most times.
    var broad_font_size = first_pass( $elem, starting_size, text_width_ratio, desired_ratio );
    set_font( $elem, broad_font_size );  

    // Part II: Incremental Increases (only necessary on 100% headers).
    // There are times where it might choose a font size that is a little too small.
    // We'll increment it until we KNOW we've gone too far, and then reduce it by 1.
    if ( desired_ratio == 1 ) {
      var too_big_font_size = one_too_many( $elem, container_width, "font-size", broad_font_size );  
      var final_font_size = too_big_font_size - 1;
    } else {
      var final_font_size = broad_font_size;
    }

    return final_font_size;
  }

  function get_letter_spacing($elem) {
    var
    parent_width     = $elem.parent().width(),
    starting_spacing = $elem.css("letter-spacing");



  }

  function set_font($elem, font_size) {
    $elem.css("font-size", font_size);
  }

  // Undoes our un-needed setup stuff.
  function cleanup( $elem ) {
    $elem.css({
      display:    "",
      whiteSpace: "",
      visibility: ""
    });
  }

  // Our debug function. For internal testing purposes only.
  function debug( elem, settings ) {
    var $elem = $(elem);
    $elem.css("display", "inline");

    console.log( "We want the text to be " + settings.percentage + "% of the width.")
    console.log( "The object is " + $elem.width() + "px wide. Its parent is " + $elem.parent().width() + "px wide. Therefore, it is " + ( $elem.width() / $elem.parent().width() ) * 100 + "% of the width." );
    console.log( "The object is:" );
    console.log( elem );
    console.log( "-------------" );
    console.log("There are " + elem.length + " item(s) selected with textPerc.")
    $elem.css("display", "");
  }


  // THIRD LEVEL - Assorted helper functions
  function first_pass( $elem, starting_size, text_width_ratio, desired_ratio ) {
    console.log( "starting size: " + starting_size );
    console.log( "Text width ratio: " + text_width_ratio );
    console.log( "Desired ratio: " + desired_ratio );
    return Math.floor( (starting_size * desired_ratio) / text_width_ratio );

    // The way math works:

    // current_size   =   desired_size
    // current_ratio      set_ratio

    // current_size * set_ratio = desired_size * current_ratio
    // desired_size = ( current_size * set_ratio ) / current_ratio
  }

  function one_too_many( $elem, container_width, property, iterable ) {
    while ( $elem.width() <= container_width ) {
      console.log("font size:" + iterable);
      console.log("H2 width:" + $elem.width());
      console.log("Container width:" + container_width);
      iterable++;
      $elem.css(property, iterable);
    }

    return iterable;
  } 

  

  $.fn.percentext.defaults = {
    percentage:   100,
    alignment:    "left",
    preciseMode:  false
  }


}( jQuery ));
