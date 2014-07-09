(function ( $ ) {
  $.fn.textPerc = function( options ) {

    // Let's set our default settings
    var 
    settings = $.extend({
        percentage: 100,
        textAlign: "center"
    }, options );

    // Let's figure out what we're up to
    var
    container = this.parent();

    return this.each(function() {


      this.css()
    });
    
  }
}( jQuery ));



function resize_text() {
  var 
  container = $("#container"),
  text_to_size = $("#text_to_size");

  // Shrink text, to make sure it can fit on 1 line
  text_to_size.css("font-size", "12px")

  var
  c_width = container.width(),
  t_width = text_to_size.width(),
  t_ratio = t_width / c_width,
  t_size = parseInt(text_to_size.css("font-size")),
  new_font_size = (t_size / t_ratio) - 1;


  text_to_size.css("font-size", new_font_size);
}


$(window).resize(resize_text);


