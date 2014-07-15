(function ( $ ) {


  $.fn.percentext = function( options ) {

    // Let's set our default settings
    var settings = $.extend({}, $.fn.percentext.defaults, options );

    return this.each(function() {
      var 
      $elem = $(this),
      user_css = {};


      // This next bit deals with PRECEDENCE.
      // - Users can specify custom CSS properties in TWO ways.
      // - Adding CSS rules or inline styles is the low-precedence way.
      // - Passing key-value pairs into the settings object is the high-precedence way.
      // - For example, if the header has an inline style of letter-spacing: 5px, but
      //   the user passes in letter-spacing: -10px when percentext() is called, the header
      //   will have -10px letter spacing.
      
      // This is done OUTSIDE the resize event handler because we want to avoid setting 
      // the user_css object after the initial call.
      user_css = get_desired_spacing( $elem, user_css, settings );

      // When we add negative letter spacing, for some reason FF/Chrome push the letters
      // outside the header. By adding a negative left margin of the same amount, we 
      // correct this strange bug.
      user_css.marginLeft = parseInt($elem.css("margin-left"));

      // Immediately hide the text. 
      // This is to avoid the text being shown incorrectly before any relevant webfonts have loaded.
      $elem.css("visibility", "hidden");

      // Run our main function on load (after custom webfonts have been downloaded) and on resize.
      $(window).bind("load resize", function() {
        do_your_thang( $elem, settings, user_css );  
      });



    });
  };

  // FIRST LEVEL - Main function //
  // Performs setup, calculation, application and cleanup.
  function do_your_thang($elem, settings, user_css) {
    var starting_size = 6;


    // Preparation is key.
    setup( $elem, starting_size, settings );      

    // Get the desired font size (most of the magic happens in this function call).
    var final_font_obj = calculate_font_size( $elem, starting_size, settings, user_css );

    // Apply this final font size and letter spacing
    $elem.css( final_font_obj );

    // Gotta brush your teeth before bed.
    cleanup( $elem );
  }

  function get_desired_spacing($elem, user_css, settings) {
    if ( typeof settings.letterSpacing == 'object' ) {  // null is an object in JS
      user_css.letterSpacing = parseFloat($elem.css("letter-spacing"));
    } else {
      user_css.letterSpacing = parseFloat(settings.letterSpacing);
    }

    return user_css;
  }


  // SECOND LEVEL //
  // Primary high-level functions, called by our main function
  function setup($elem, starting_size, settings) {
    $elem.css({
      display:        "inline",
      fontSize:       starting_size,
      letterSpacing:  "0px",
      textAlign:      settings.alignment,
      whiteSpace:     "nowrap"
    });


  }

  function calculate_font_size($elem, starting_size, settings, user_css) {
    var
    container                 = $elem.parent(),
    container_width           = container.width(),
    text_width                = $elem.width(),
    text_width_ratio          = text_width / container_width,
    desired_ratio             = settings.percentage / 100,
    max_width                 = container_width * desired_ratio,
    font_size_increment       = 1,
    letter_spacing_increment  = 0.1,
    assumed_container_width   = 1000,
    starting_letter_spacing,
    final_letter_spacing,
    final_left_margin,
    final_font_size;
    

    // Part I: Broad Strokes.
    // We do some math to get what ought to be the perfect font size. This will work most times.
    var broad_font_size = first_pass( starting_size, text_width_ratio, desired_ratio );
    $elem.css("font-size", broad_font_size);


    //// Take user-specified letter-spacing into account!
    // We're doing this AFTER Broad Strokes because initially we shrink the text to 6px.
    // At 6px, 10px of letter spacing makes a MASSIVE difference in the size of the header.
    // It's better to reset letter-spacing to 0px at the start, and apply our custom value here.

    starting_letter_spacing = settings.relativeSpacing ? get_relative_spacing( user_css.letterSpacing, container_width, assumed_container_width ) : user_css.letterSpacing;
    
    $elem.css("letter-spacing", starting_letter_spacing);  


    // Now, we either need to decrease the font size if we have positive letter-spacing,
    // or we need to increase it if it's negative or zero.

    if ( $elem.width() <= max_width ) {
      var too_big_font_size = increase_to_excess( $elem, max_width, "font-size", broad_font_size, font_size_increment );  
      final_font_size = too_big_font_size - font_size_increment;
    } else {
      final_font_size = decrease_until_just_right( $elem, max_width, broad_font_size, font_size_increment );
    }

    $elem.css("font-size", final_font_size);




    // Part III: Precise Mode (optional)
    // Uses letter-spacing to get as precise a width as possible. Generally not necessary, but can be useful
    // on headers with lots of letters (since the difference between 10px and 11px font size is significant).
    if ( settings.preciseMode ) {
      var too_big_letter_spacing = increase_to_excess( $elem, max_width, "letter-spacing", starting_letter_spacing, letter_spacing_increment );
      final_letter_spacing = too_big_letter_spacing - letter_spacing_increment;
    } else {
      final_letter_spacing = starting_letter_spacing;
    }

    // Figure out our left margin, if our letter-spacing is negative
    if ( final_letter_spacing < 0 ) {
      final_left_margin = user_css.marginLeft + final_letter_spacing;
    } else {
      final_left_margin - user_css.marginLeft;
    }


    return {
      fontSize:       final_font_size,
      letterSpacing:  precise_round(final_letter_spacing, 2) + "px",
      marginLeft:     Math.round(final_left_margin) + "px",
    };
  }

  // Undoes our un-needed setup stuff.
  function cleanup( $elem ) {
    $elem.css({
      display:    "",
      whiteSpace: "",
      visibility: ""
    });
  }


  // THIRD LEVEL - Assorted helper functions
  function first_pass( starting_size, text_width_ratio, desired_ratio ) {
    // console.log( "starting size: " + starting_size );
    // console.log( "Text width ratio: " + text_width_ratio );
    // console.log( "Desired ratio: " + desired_ratio );
    return Math.floor( (starting_size * desired_ratio) / text_width_ratio );

    // The way math works:

    // current_size   =   desired_size
    // current_ratio      set_ratio

    // current_size * set_ratio = desired_size * current_ratio
    // desired_size = ( current_size * set_ratio ) / current_ratio
  }

  function increase_to_excess( $elem, max_width, property, iterable, increment ) {

    while ( $elem.width() < max_width ) {
      // console.log(property + ": " + iterable);
      // console.log("H2 width:" + $elem.width());
      // console.log("Container width:" + max_width);
      iterable += increment;
      $elem.css(property, iterable);
    }

    return iterable;
  } 

  function decrease_until_just_right($elem, max_width, iterable, increment) {
    while ( $elem.width() > max_width ) {
      iterable -= increment;
      $elem.css("font-size", iterable);
    }

    return iterable;
  }

  function get_relative_spacing(letter_spacing, container_width, assumed_container_width ) {
    // The math: relative_letter_spacing / container_width = letter_spacing / assumed_container_width
    return ( letter_spacing / assumed_container_width ) * container_width;
  }

  function precise_round(num,decimals){
    var sign = num >= 0 ? 1 : -1;
    return (Math.round((num*Math.pow(10,decimals))+(sign*0.001))/Math.pow(10,decimals)).toFixed(decimals);
  }

  

  $.fn.percentext.defaults = {
    percentage:       100,
    alignment:        null,
    preciseMode:      true,
    letterSpacing:    null,
    relativeSpacing:  true
  };


}( jQuery ));
