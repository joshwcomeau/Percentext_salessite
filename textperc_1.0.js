(function ( $ ) {


  $.fn.textPerc = function( options ) {

    // Let's set our default settings
    var settings = $.extend({}, this.defaults, options );

    return this.each(function() {
      var
      elem = this,
      $elem = $(this),
      starting_size = 9;
      

      // Preparation is key.
      setup( $elem, starting_size );      

      // It's variable time! Let's figure out who the major players are.
      var
      container         = $elem.parent(),
      container_width   = container.width(),
      text_width        = $elem.width(),
      text_width_ratio  = text_width / container_width;



      // Time to do our thing. This happens in two main parts. 

      // Part I: Broad Strokes.
      // We do some math to get what ought to be the perfect font size. This will work most times.
      var broad_font_size = broad_strokes( $elem, starting_size, text_width_ratio);
      $elem.css("font-size", broad_font_size);

      // Part II: Incremental Increases.
      // There are times where it might choose a font size that is a little too small.
      // We'll increment it until we KNOW we've gone too far, and then reduce it by 1.
      var 
      starting_height      = $elem.height(),
      increasing_font_size = broad_font_size;

      console.log("Our initial font size is " + increasing_font_size);
      console.log("Our 'while' condition is that " + $elem.height() + " must be less than " + starting_height*2 + " (which is " + starting_height + " times 2)");

      while ( $elem.height() < starting_height * 2 ) {
        increasing_font_size++;
        $elem.css("font-size", increasing_font_size);
        console.log(increasing_font_size);
        console.log("height is " + $elem.height() );
      }

      // We've gone one step too far. Let's undo that last iteration and call it a day!
      increasing_font_size--;
      $elem.css("font-size", increasing_font_size);

      // Gotta wash some dishes
      cleanup( $elem );



      // Testing function.
      debug( this );

    });
  }

  // Our setup function. Does a few quick things to get our text ready.
  function setup( $elem, starting_size ) {
    // First, we set the text element (whether it's an h2 or a p or a div) to display: inline;.
    // This is done so that we can find out how much width the letters themselves take up.
    $elem.css("display", "inline");

    // Next, we shrink the text down to mini-size. 
    // This is done because when we retrieve the header's width, we want to make sure it fits on 1 line.
    $elem.css("font-size", starting_size);
  }

  // Does some quick and dirty cross multiplication to get a good starting-point font size.
  function broad_strokes( $elem, starting_size, text_width_ratio ) {
    var new_font_size = Math.floor(starting_size / text_width_ratio);

    return new_font_size
  }

  // Checks to see if the next increment level breaks it
  function one_more_time( $elem, font_increment ) {
    var 
    current_font_size = parseFloat( $elem.css("font-size") ),
    new_font_size     = current_font_size + font_increment;

    console.log(current_font_size);

    $elem.css("font-size", new_font_size);

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

  $.fn.textPerc.defaults = {
    percentage: 100,
    textAlign: "center"
  }


}( jQuery ));
